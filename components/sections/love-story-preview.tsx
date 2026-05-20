import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';

export function LoveStoryPreview({ story }: { story: { title: string; text: string }[] }) {
  return (
    <section className="section-spacing">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Nossa história"
          title="Um amor construído em encontros gentis, viagens bonitas e promessas sinceras"
          description="Criamos um espaço para compartilhar o caminho que nos trouxe até aqui, com texto emocional, imagens delicadas e narrativa cinematográfica."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {story.map((item, index) => (
            <div key={item.title} className="rounded-[2rem] border border-mocha/10 bg-white/75 p-8 shadow-soft">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-sand text-mocha">
                <HeartHandshake className="size-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-mocha/50">capítulo {String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-2xl text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-mocha/70">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/story">
            <Button variant="secondary" size="lg">
              Ler a história completa
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
