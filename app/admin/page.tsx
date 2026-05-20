import { AdminMetrics } from '@/components/admin/admin-metrics';
import { getAdminMetrics, getGifts, getHoneymoonStatus } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default async function AdminPage() {
  const [metrics, gifts, honeymoon] = await Promise.all([getAdminMetrics(), getGifts(), getHoneymoonStatus()]);

  return (
    <main className="section-spacing">
      <div className="section-shell space-y-8">
        <div className="rounded-[2.5rem] border border-mocha/10 bg-gradient-to-br from-[#f7efe8] via-white to-[#ece8df] p-8 shadow-float">
          <p className="text-xs uppercase tracking-[0.35em] text-mocha/50">Painel admin</p>
          <h1 className="mt-3 font-display text-5xl text-foreground">Controle premium do casamento</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-mocha/75">Estrutura pensada para administração elegante no estilo Stripe: visão de pagamentos, convidados, presentes, cotas e métricas em tempo real. Conecte este painel ao Supabase Auth para liberar acesso apenas ao casal.</p>
        </div>

        <AdminMetrics data={metrics} />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
            <h2 className="font-display text-3xl text-foreground">Presentes</h2>
            <div className="mt-6 space-y-4">
              {gifts.map((gift) => (
                <div key={gift.id} className="flex flex-col justify-between gap-3 rounded-2xl border border-mocha/10 bg-[#fcfaf7] p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium text-foreground">{gift.title}</p>
                    <p className="text-sm text-mocha/60">{gift.progress}% arrecadado · {gift.participants.length} participantes</p>
                  </div>
                  <div className="text-right text-sm text-mocha/65">
                    <p>Total: {formatCurrency(gift.priceCents)}</p>
                    <p>Restante: {formatCurrency(gift.remainingCents)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
            <h2 className="font-display text-3xl text-foreground">Lua de mel</h2>
            <div className="mt-6 space-y-4 rounded-2xl border border-mocha/10 bg-[#fcfaf7] p-5">
              <div><p className="text-sm text-mocha/55">Meta</p><p className="mt-1 font-medium text-foreground">{formatCurrency(honeymoon.targetCents)}</p></div>
              <div><p className="text-sm text-mocha/55">Arrecadado</p><p className="mt-1 font-medium text-foreground">{formatCurrency(honeymoon.collectedCents)}</p></div>
              <div><p className="text-sm text-mocha/55">Cotas</p><p className="mt-1 font-medium text-foreground">{honeymoon.soldQuotas} vendidas · {honeymoon.remainingQuotas} restantes</p></div>
              <div><p className="text-sm text-mocha/55">Participantes recentes</p><p className="mt-1 text-sm leading-6 text-mocha/70">{honeymoon.contributors.join(', ') || 'Sem participantes ainda'}</p></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
