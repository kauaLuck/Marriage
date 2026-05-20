import Link from 'next/link';
import { Heart, ImageIcon } from 'lucide-react';
import { Hero } from '@/components/sections/hero';
import { GiftsPreview } from '@/components/sections/gifts-preview';
import { HoneymoonHighlight } from '@/components/sections/honeymoon-highlight';
import { LoveStoryPreview } from '@/components/sections/love-story-preview';
import { Button } from '@/components/ui/button';
import { getLandingData } from '@/lib/data';

export default async function HomePage() {
  const data = await getLandingData();

  return (
    <main>
      <header className="section-shell flex items-center justify-between py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-mocha/50">Wedding platform</p>
          <p className="font-display text-3xl text-foreground">Ana & Bruno</p>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/login"><Button variant="ghost">Entrar</Button></Link>
          <Link href="/rsvp"><Button>Confirmar presença</Button></Link>
        </div>
      </header>

      <Hero gallery={data.gallery} />
      <GiftsPreview gifts={data.gifts as any} />
      <HoneymoonHighlight honeymoon={data.honeymoon as any} />
      <LoveStoryPreview story={data.story} />

      <section className="section-spacing pt-0">
        <div className="section-shell">
          <div className="rounded-[2.5rem] border border-mocha/10 bg-gradient-to-r from-[#efe4d9] via-[#f7f2ec] to-[#ece9df] p-8 shadow-float sm:p-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-mocha/65">
                  <Heart className="size-4" /> presença, afeto e celebração
                </div>
                <h2 className="font-display text-4xl text-foreground sm:text-5xl">Tudo em um só lugar, com estética refinada e emoção real</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-mocha/75">
                  Login por nome e telefone, presentes compartilhados, cotas da lua de mel, RSVP, pagamentos via PIX, mensagem automática de agradecimento e painel administrativo com visual premium.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/dashboard"><Button size="lg">Abrir dashboard</Button></Link>
                <Link href="/story"><Button variant="secondary" size="lg"><ImageIcon className="mr-2 size-4" /> Ver galeria</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
