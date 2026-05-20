import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentGuest } from '@/lib/auth';
import { createPixPayment } from '@/lib/server/payments';
import { createAdminClient } from '@/lib/supabase/server';

const schema = z.object({
  kind: z.enum(['gift', 'honeymoon']),
  title: z.string().min(2),
  amountCents: z.number().int().positive(),
  giftId: z.string().optional(),
  quotas: z.number().int().min(1).max(10).optional(),
});

export async function POST(request: Request) {
  const guest = await getCurrentGuest();
  if (!guest) {
    return NextResponse.json({ message: 'Faça login para continuar.' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dados inválidos.' }, { status: 400 });
  }

  const payload = parsed.data;

  const supabase = await createAdminClient();

  if (payload.kind === 'gift' && payload.giftId && supabase) {
    const { data: gift } = await supabase.from('gifts').select('price_cents, collected_amount_cents, allow_shared').eq('id', payload.giftId).single();
    if (gift) {
      const remaining = gift.price_cents - (gift.collected_amount_cents ?? 0);
      if (!gift.allow_shared && payload.amountCents !== gift.price_cents) {
        return NextResponse.json({ message: 'Este presente aceita apenas compra integral.' }, { status: 400 });
      }
      if (gift.allow_shared && payload.amountCents > remaining) {
        return NextResponse.json({ message: 'O valor excede o restante necessário para este presente.' }, { status: 400 });
      }
    }
  }

  if (payload.kind === 'honeymoon' && payload.quotas && supabase) {
    const { data: available } = await supabase
      .from('honeymoon_quotas')
      .select('id')
      .eq('status', 'available')
      .limit(payload.quotas);

    if ((available ?? []).length < payload.quotas) {
      return NextResponse.json({ message: 'Não há cotas suficientes disponíveis.' }, { status: 400 });
    }
  }

  const payment = await createPixPayment({
    amountCents: payload.amountCents,
    guestId: guest.id,
    guestName: guest.name,
    guestPhone: guest.phone,
    title: payload.title,
    context: payload.kind,
    giftId: payload.giftId,
    quotas: payload.quotas,
  });

  if (supabase) {
    if (payload.kind === 'gift' && payload.giftId) {
      await supabase.from('gift_contributions').insert({
        gift_id: payload.giftId,
        guest_id: guest.id,
        payment_id: payment.id,
        amount_cents: payload.amountCents,
        status: 'pending',
      });
    }

    if (payload.kind === 'honeymoon' && payload.quotas) {
      const { data: available } = await supabase
        .from('honeymoon_quotas')
        .select('id')
        .eq('status', 'available')
        .limit(payload.quotas);

      await supabase.from('honeymoon_quotas').update({
        status: 'reserved',
        guest_id: guest.id,
        payment_id: payment.id,
      }).in('id', (available ?? []).map((item) => item.id));
    }
  }

  return NextResponse.json(payment);
}
