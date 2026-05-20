'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    const channel = supabase
      .channel('wedding-live-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gifts' }, () => router.refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gift_contributions' }, () => router.refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'honeymoon_quotas' }, () => router.refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, () => router.refresh())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return <>{children}</>;
}
