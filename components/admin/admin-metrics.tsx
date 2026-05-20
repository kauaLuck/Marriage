import { BanknoteArrowDown, CheckCircle2, Gift, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function AdminMetrics({ data }: { data: { revenueCents: number; guests: number; pendingPayments: number; confirmedRsvps: number; giftsCompleted: number } }) {
  const cards = [
    { label: 'Arrecadação total', value: formatCurrency(data.revenueCents), icon: BanknoteArrowDown },
    { label: 'Convidados cadastrados', value: String(data.guests), icon: Users },
    { label: 'Pagamentos pendentes', value: String(data.pendingPayments), icon: CheckCircle2 },
    { label: 'Presentes concluídos', value: String(data.giftsCompleted), icon: Gift },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-sand text-mocha">
              <Icon className="size-5" />
            </div>
            <p className="text-sm text-mocha/55">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
