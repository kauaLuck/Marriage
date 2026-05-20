import { GiftCard } from '@/components/gifts/gift-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { getGifts } from '@/lib/data';

export default async function GiftsPage() {
  const gifts = await getGifts();

  return (
    <main className="section-spacing">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Presentes"
          title="Lista de presentes com lógica de compra individual e compartilhada"
          description="Itens até R$ 3.000 são reservados por uma única pessoa. Itens acima desse valor aceitam contribuições compartilhadas e mostram progresso em tempo real."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift as any} />
          ))}
        </div>
      </div>
    </main>
  );
}
