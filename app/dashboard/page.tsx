import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Plane, Sparkles } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/sections/countdown';
import { getCurrentGuest } from '@/lib/auth';
import { getGifts, getHoneymoonStatus } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default async function DashboardPage() {
  const guest = await getCurrentGuest();
  if (!guest) redirect('/login');

  const [gifts, honeymoon] = await Promise.all([getGifts(), getHoneymoonStatus()]);

  return (
    <DashboardShell guestName={guest.name}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-mocha/10 bg-gradient-to-br from-[#f8f1ea] via-white to-[#ebe7de] p-8 shadow-float">
          <span className="inline-flex rounded-full border border-white/60 bg-white/75 px-4 py-2 text-xs uppercase tracking-[0.3em] text-mocha/65">
            <Sparkles className="mr-2 size-4" /> experiência principal
          </span>
          <h2 className="mt-5 font-display text-5xl text-foreground">A contagem para o grande dia já começou</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-mocha/75">
            Explore a lista de presentes, escolha cotas para a lua de mel, leia nossa história e confirme sua presença em uma experiência desenhada com carinho.
          </p>
          <div className="mt-8 max-w-2xl"><Countdown /></div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mocha/55">Lista de presentes</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{gifts.filter((gift) => gift.status !== 'completed').length} itens ativos</p>
              </div>
              <Link href="/gifts"><Button variant="secondary">Ver todos <ArrowRight className="ml-2 size-4" /></Button></Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
              <Plane className="size-5 text-mocha" />
              <p className="mt-4 text-sm text-mocha/55">Lua de mel</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{formatCurrency(honeymoon.collectedCents)}</p>
              <p className="mt-2 text-sm text-mocha/70">{honeymoon.soldQuotas} cotas vendidas</p>
            </div>
            <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
              <CalendarDays className="size-5 text-mocha" />
              <p className="mt-4 text-sm text-mocha/55">RSVP</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">Confirme sua presença</p>
              <Link href="/rsvp" className="mt-3 inline-flex text-sm text-mocha">Abrir confirmação</Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
