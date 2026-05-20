import Image from 'next/image';
import { getCoupleGallery, getStoryMoments } from '@/lib/data';

export default async function StoryPage() {
  const [gallery, story] = await Promise.all([getCoupleGallery(), getStoryMoments()]);

  return (
    <main className="section-spacing">
      <div className="section-shell space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-mocha/50">Nossa história</p>
            <h1 className="mt-4 font-display text-5xl text-foreground sm:text-6xl">Uma narrativa delicada sobre encontro, construção e futuro</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mocha/75">
              Este espaço foi pensado para transmitir o tom emocional do casamento, com imagens grandes, ritmo editorial e sensação de álbum contemporâneo.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-[2rem] border border-mocha/10 shadow-soft sm:h-72">
              <Image src={gallery[0]} alt="Ana e Bruno juntos" fill className="object-cover" />
            </div>
            <div className="relative h-64 overflow-hidden rounded-[2rem] border border-mocha/10 shadow-soft sm:h-72">
              <Image src={gallery[1]} alt="Casal feliz" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {story.map((item, index) => (
            <article key={item.title} className="rounded-[2rem] border border-mocha/10 bg-white/80 p-8 shadow-soft">
              <span className="text-xs uppercase tracking-[0.3em] text-mocha/50">momento {String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-4 font-display text-3xl text-foreground">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-mocha/72">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[2.5rem] border border-mocha/10 shadow-float">
          <Image src={gallery[2]} alt="Galeria do casal" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-xl p-10 text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Ana & Bruno</p>
            <h3 className="mt-3 font-display text-4xl">Uma celebração feita de presença, afeto e detalhes</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
