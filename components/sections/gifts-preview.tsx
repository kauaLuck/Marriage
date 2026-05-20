import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GiftCard } from '@/components/gifts/gift-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import type { Gift } from '@/lib/mock-data';

export function GiftsPreview({ gifts }: { gifts: (Gift & { progress: number; remainingCents: number })[] }) {
  return (
    <section className="section-spacing">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Lista de presentes"
          title="Escolhas com estética premium e progresso em tempo real"
          description="Uma experiência inspirada em e-commerce sofisticado, com compra individual ou colaboração compartilhada para presentes maiores."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/gifts">
            <Button variant="secondary" size="lg">
              Ver lista completa <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
