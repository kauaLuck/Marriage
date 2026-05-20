import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentGuest } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/server';

const schema = z.object({
  attendanceStatus: z.enum(['confirmed', 'declined']),
  guestsCount: z.number().min(1).max(5),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const guest = await getCurrentGuest();
  if (!guest) return NextResponse.json({ message: 'Faça login para confirmar presença.' }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: 'Dados inválidos.' }, { status: 400 });

  const supabase = await createAdminClient();
  if (supabase) {
    await supabase.from('rsvps').upsert({
      guest_id: guest.id,
      attendance_status: parsed.data.attendanceStatus,
      guests_count: parsed.data.guestsCount,
      dietary_restrictions: parsed.data.dietaryRestrictions ?? null,
      message: parsed.data.message ?? null,
    }, { onConflict: 'guest_id' });
  }

  return NextResponse.json({ ok: true });
}
