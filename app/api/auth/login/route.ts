import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createGuestSession } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPhone } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Dados inválidos.' }, { status: 400 });
  }

  const supabase = await createAdminClient();
  const cleanPhone = formatPhone(parsed.data.phone);
  let guestId = 'guest-local';

  if (supabase) {
    const { data } = await supabase
      .from('guests')
      .upsert({
        name: parsed.data.name,
        phone: cleanPhone,
      }, { onConflict: 'phone' })
      .select('id')
      .single();

    guestId = data?.id ?? guestId;
  }

  await createGuestSession(guestId);

  return NextResponse.json({ ok: true });
}
