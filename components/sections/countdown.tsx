'use client';

import { siteConfig } from '@/lib/site-config';
import { useCountdown } from '@/lib/hooks/use-countdown';

export function Countdown() {
  const countdown = useCountdown(siteConfig.weddingDate);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: 'dias', value: countdown.days },
        { label: 'horas', value: countdown.hours },
        { label: 'min', value: countdown.minutes },
        { label: 'seg', value: countdown.seconds },
      ].map((item) => (
        <div key={item.label} className="glass-panel rounded-3xl p-4 text-center shadow-soft">
          <div className="font-display text-3xl text-foreground sm:text-4xl">{String(item.value).padStart(2, '0')}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.25em] text-mocha/55">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
