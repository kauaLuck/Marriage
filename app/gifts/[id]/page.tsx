import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BadgeCheck, Lock, Users } from 'lucide-react';
import { ContributionPanel } from '@/components/gifts/contribution-panel';
import { Progress } from '@/components/ui/progress';
import { getGiftBySlug } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export default async function GiftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const gift = await getGiftBySlug(id);

  if (!gift) notFound();

  const completed = gift.status === 'completed' || gift.progress >= 100;

  return (
    <main className="section-spacing">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="relative h-[520px] overflow-hidden rounded-[2.5rem] border border-mocha/10 shadow-float">
            <Image src={gift.imageUrl} alt={gift.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
          <div className="mt-8 rounded-[2rem] border border-mocha/10 bg-white/80 p-8 shadow-soft">
            <div className="flex flex-wrap items-center gap-3">
              {completed ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-olive px-4 py-2 text-sm text-white"><BadgeCheck className="size-4" /> Presente concluído</span>
              ) : gift.allowShared ? (
                <span className="rounded-full bg-sand px-4 py-2 text-sm text-mocha">Contribuição compartilhada habilitada</span>
              ) : (
                <span className="rounded-full bg-sand px-4 py-2 text-sm text-mocha">Compra individual</span>
              )}
            </div>
            <h1 className="mt-5 font-display text-5xl text-foreground">{gift.title}</h1>
            <p className="mt-4 text-base leading-8 text-mocha/75">{gift.description}</p>

            <div className="mt-8 space-y-3">
              <Progress value={gift.progress} />
              <div className="grid gap-4 sm:grid-cols-4">
                <div><p className="text-sm text-mocha/55">Valor total</p><p className="mt-1 font-medium text-foreground">{formatCurrency(gift.priceCents)}</p></div>
                <div><p className="text-sm text-mocha/55">Arrecadado</p><p className="mt-1 font-medium text-foreground">{formatCurrency(gift.collectedCents)}</p></div>
                <div><p className="text-sm text-mocha/55">Restante</p><p className="mt-1 font-medium text-foreground">{formatCurrency(gift.remainingCents)}</p></div>
                <div><p className="text-sm text-mocha/55">Participantes</p><p className="mt-1 inline-flex items-center gap-2 font-medium text-foreground"><Users className="size-4" /> {gift.participants.length}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {completed ? (
            <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-8 shadow-soft">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-sand text-mocha">
                <Lock className="size-5" />
              </div>
              <h2 className="font-display text-3xl text-foreground">Este presente já foi concluído</h2>
              <p className="mt-3 text-sm leading-7 text-mocha/70">O item atingiu 100% do valor e está bloqueado para novas contribuições.</p>
            </div>
          ) : (
            <ContributionPanel
              kind="gift"
              title={gift.title}
              amountCents={gift.allowShared ? Math.max(10000, Math.ceil(gift.remainingCents / 2)) : gift.priceCents}
              giftId={gift.id}
              editableAmount={gift.allowShared}
            />
          )}

          <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
            <p className="text-sm text-mocha/55">Convidados que já contribuíram</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {gift.participants.length ? gift.participants.map((participant: string) => (
                <span key={participant} className="rounded-full bg-[#f6efe8] px-4 py-2 text-sm text-mocha">{participant}</span>
              )) : <span className="text-sm text-mocha/60">Ainda sem contribuições.</span>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
