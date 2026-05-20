import { MountainSnow, PlaneTakeoff, Users } from 'lucide-react';
import { ContributionPanel } from '@/components/gifts/contribution-panel';
import { Progress } from '@/components/ui/progress';
import { getHoneymoonStatus } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default async function HoneymoonPage() {
  const honeymoon = await getHoneymoonStatus();

  return (
    <main className="section-spacing">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-mocha/10 bg-gradient-to-br from-[#f7efe8] via-white to-[#eeebdf] p-8 shadow-float">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.3em] text-mocha/65">
            <PlaneTakeoff className="size-4" /> Lua de mel premium
          </div>
          <h1 className="font-display text-5xl text-foreground">Ajude nossa lua de mel na Argentina</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-mocha/75">
            Criamos um espaço especial para que você participe da nossa viagem de maneira simples e afetiva. Cada cota nos aproxima de experiências inesquecíveis: montanhas, vinhos, jantares e novas memórias.
          </p>

          <div className="mt-10 rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-soft">
            <Progress value={honeymoon.progress} />
            <div className="mt-5 grid gap-4 sm:grid-cols-4">
              <div><p className="text-sm text-mocha/55">Meta</p><p className="mt-1 font-medium text-foreground">{formatCurrency(honeymoon.targetCents)}</p></div>
              <div><p className="text-sm text-mocha/55">Arrecadado</p><p className="mt-1 font-medium text-foreground">{formatCurrency(honeymoon.collectedCents)}</p></div>
              <div><p className="text-sm text-mocha/55">Vendidas</p><p className="mt-1 font-medium text-foreground">{honeymoon.soldQuotas}</p></div>
              <div><p className="text-sm text-mocha/55">Restantes</p><p className="mt-1 font-medium text-foreground">{honeymoon.remainingQuotas}</p></div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-mocha/10 bg-white/75 p-6 shadow-soft">
            <div className="flex items-center gap-3 text-mocha"><MountainSnow className="size-5" /><p className="text-sm uppercase tracking-[0.3em] text-mocha/55">Participantes</p></div>
            <div className="mt-4 flex flex-wrap gap-2">
              {honeymoon.contributors.length ? honeymoon.contributors.map((person) => (
                <span key={person} className="rounded-full bg-[#f6efe8] px-4 py-2 text-sm text-mocha inline-flex items-center gap-2"><Users className="size-4" /> {person}</span>
              )) : <span className="text-sm text-mocha/60">Seja o primeiro nome desta viagem.</span>}
            </div>
          </div>
        </div>

        <ContributionPanel kind="honeymoon" title="Cotas da lua de mel" amountCents={10000} maxQuotas={honeymoon.remainingQuotas || 1} />
      </div>
    </main>
  );
}
