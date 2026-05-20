import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/server';

const SESSION_COOKIE = 'ab_guest_session';

export async function createGuestSession(guestId: string) {
  const supabase = await createAdminClient();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

  if (supabase) {
    await supabase.from('guest_sessions').insert({
      guest_id: guestId,
      session_token: token,
      expires_at: expiresAt,
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expiresAt),
  });

  return token;
}

export async function getCurrentGuest() {
  const supabase = await createAdminClient();
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;
  if (!supabase) {
    return { id: 'guest-local', name: 'Convidado', phone: '(11) 99999-9999' };
  }

  const { data } = await supabase
    .from('guest_sessions')
    .select('guest:guests(id, name, phone), expires_at')
    .eq('session_token', token)
    .maybeSingle();

  if (!data || new Date(data.expires_at).getTime() < Date.now()) {
    return null;
  }

  return Array.isArray(data.guest) ? data.guest[0] : data.guest;
}
