import Image from 'next/image';
import Link from 'next/link';
import { Gift as GiftIcon, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import type { Gift } from '@/lib/mock-data';

export function GiftCard({ gift }: { gift: Gift & { progress: number; remainingCents: number } }) {
  return (
    <Link
      href={`/gifts/${gift.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-mocha/10 bg-white/75 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-float"
    >
      <div className="relative h-64 overflow-hidden">
        <Image src={gift.imageUrl} alt={gift.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-mocha shadow-sm">
          {gift.status === 'completed' ? 'Presente concluído' : gift.allowShared ? 'Compartilhado' : 'Compra única'}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-mocha/50">
            <GiftIcon className="size-3.5" /> Lista premium
          </div>
          <h3 className="font-display text-2xl text-foreground">{gift.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-mocha/70">{gift.description}</p>
        </div>

        <div className="space-y-2">
          <Progress value={gift.progress} />
          <div className="flex items-center justify-between text-sm text-mocha/65">
            <span>{gift.progress}% arrecadado</span>
            <span>{formatCurrency(gift.priceCents)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-mocha/65">Restante: {formatCurrency(gift.remainingCents)}</span>
          <span className="inline-flex items-center gap-1 text-mocha/75">
            <Users className="size-4" /> {gift.participants.length}
          </span>
        </div>
      </div>
    </Link>
  );
}
