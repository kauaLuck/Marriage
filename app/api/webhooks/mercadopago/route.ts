import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Payment } from 'mercadopago';
import { MercadoPagoConfig } from 'mercadopago';
import { createAdminClient } from '@/lib/supabase/server';
import { sendWhatsAppThankYouMessage } from '@/lib/server/whatsapp';
import { formatCurrency } from '@/lib/utils';

function verifySignature(request: NextRequest) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret) return true;
  const signature = request.headers.get('x-signature');
  if (!signature) return false;
  const bodyHash = crypto.createHmac('sha256', secret).update(request.nextUrl.search).digest('hex');
  return signature.includes(bodyHash);
}

export async function POST(request: NextRequest) {
  if (!verifySignature(request)) {
    return NextResponse.json({ message: 'Assinatura inválida.' }, { status: 401 });
  }

  const supabase = await createAdminClient();
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!supabase || !token) {
    return NextResponse.json({ ok: true });
  }

  const body = await request.json().catch(() => null);
  const paymentId = body?.data?.id ?? request.nextUrl.searchParams.get('data.id');
  if (!paymentId) return NextResponse.json({ ok: true });

  const client = new Payment(new MercadoPagoConfig({ accessToken: token }));
  const payment = await client.get({ id: String(paymentId) });
  const externalId = payment.external_reference;

  const { data: localPayment } = await supabase
    .from('payments')
    .select('id, amount_cents, guest_id, gift_id')
    .eq('provider_payment_id', String(payment.id))
    .maybeSingle();

  await supabase
    .from('payments')
    .update({ status: payment.status, payload: payment })
    .eq('provider_payment_id', String(payment.id));

  if (payment.status === 'approved' && localPayment) {
    await supabase.from('gift_contributions').update({ status: 'paid' }).eq('payment_id', localPayment.id);
    await supabase.from('honeymoon_quotas').update({ status: 'paid' }).eq('payment_id', localPayment.id);

    if (localPayment.gift_id) {
      const { data: contributions } = await supabase
        .from('gift_contributions')
        .select('amount_cents')
        .eq('gift_id', localPayment.gift_id)
        .eq('status', 'paid');

      const total = (contributions ?? []).reduce((sum, item) => sum + item.amount_cents, 0);
      const { data: gift } = await supabase.from('gifts').select('price_cents').eq('id', localPayment.gift_id).single();

      await supabase.from('gifts').update({
        collected_amount_cents: total,
        status: total >= (gift?.price_cents ?? 0) ? 'completed' : 'available',
      }).eq('id', localPayment.gift_id);
    }

    const { data: guest } = await supabase.from('guests').select('name, phone').eq('id', localPayment.guest_id).single();
    if (guest) {
      await sendWhatsAppThankYouMessage({
        phone: guest.phone,
        guestName: guest.name,
        context: localPayment.gift_id ? 'gift' : 'honeymoon',
        amountLabel: formatCurrency(localPayment.amount_cents),
      });
    }
  }

  return NextResponse.json({ ok: true, externalId });
}
