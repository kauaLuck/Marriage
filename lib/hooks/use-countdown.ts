'use client';

import { useEffect, useMemo, useState } from 'react';

export function useCountdown(targetDate: string) {
  const calculate = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    const safe = Math.max(diff, 0);

    return {
      days: Math.floor(safe / (1000 * 60 * 60 * 24)),
      hours: Math.floor((safe / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((safe / (1000 * 60)) % 60),
      seconds: Math.floor((safe / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return useMemo(() => countdown, [countdown]);
}
