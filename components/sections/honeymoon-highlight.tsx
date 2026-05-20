import Link from 'next/link';
import { PlaneTakeoff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export function HoneymoonHighlight({ honeymoon }: { honeymoon: { title: string; targetCents: number; collectedCents: number; totalQuotas: number; soldQuotas: number; progress: number; contributors: string[] } }) {
  return (
    <section className="section-spacing">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-mocha/10 bg-gradient-to-br from-[#f8f2ec] via-white to-[#f0ece5] p-8 shadow-soft">
          <div className="mb-6 inline-flex rounded-full bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-mocha/70">
            Lua de mel
          </div>
          <h3 className="font-display text-4xl text-foreground">Argentina</h3>
          <p className="mt-4 text-base leading-7 text-mocha/75">
            Ajude a transformar nossa viagem em uma lembrança inesquecível: paisagens, vinhos, neve, boa comida e dias desenhados com calma.
          </p>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-5 py-4">
            <PlaneTakeoff className="size-5 text-mocha" />
            <div>
              <p className="text-sm text-mocha/55">Meta total</p>
              <p className="text-lg font-medium text-foreground">{formatCurrency(honeymoon.targetCents)}</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Cotas afetivas"
            title={honeymoon.title}
            description="100 cotas de R$ 100, com atualização ao vivo, visual elegante e nomes dos participantes que já estão viajando com a gente em pensamento."
          />

          <div className="rounded-[2rem] border border-mocha/10 bg-white/75 p-8 shadow-soft">
            <Progress value={honeymoon.progress} />
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-mocha/55">Arrecadado</p>
                <p className="mt-1 text-xl font-medium text-foreground">{formatCurrency(honeymoon.collectedCents)}</p>
              </div>
              <div>
                <p className="text-sm text-mocha/55">Cotas vendidas</p>
                <p className="mt-1 text-xl font-medium text-foreground">{honeymoon.soldQuotas}/{honeymoon.totalQuotas}</p>
              </div>
              <div>
                <p className="text-sm text-mocha/55">Últimos nomes</p>
                <p className="mt-1 text-sm leading-6 text-mocha/70">{honeymoon.contributors.slice(0, 4).join(', ') || 'Seja o primeiro a contribuir'}</p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/honeymoon">
                <Button size="lg">Contribuir com a lua de mel</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
