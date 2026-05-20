import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/sections/countdown';
import { siteConfig } from '@/lib/site-config';

export function Hero({ gallery }: { gallery: string[] }) {
  return (
    <section className="noise relative overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-mocha/10 bg-white/75 px-4 py-2 text-xs uppercase tracking-[0.3em] text-mocha/70 shadow-soft">
            <Sparkles className="size-4" /> wedding experience premium
          </span>

          <h1 className="max-w-3xl text-balance font-display text-5xl leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            Ana <span className="text-mocha/60">&</span> Bruno
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-mocha/80 sm:text-lg">
            Um convite elegante para celebrar nossa história, participar da lista de presentes, contribuir com a lua de mel e viver cada detalhe do nosso grande dia com leveza, beleza e emoção.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Entrar como convidado <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/story">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Nossa história
              </Button>
            </Link>
          </div>

          <div className="mt-10 max-w-2xl">
            <Countdown />
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-mocha/70">
            <Heart className="size-4 fill-current text-caramel" />
            {new Date(siteConfig.weddingDate).toLocaleDateString('pt-BR', { dateStyle: 'full' })}
            <span className="hidden h-1 w-1 rounded-full bg-mocha/30 sm:inline-flex" />
            <span>{siteConfig.location}</span>
          </div>
        </div>

        <div className="relative h-[540px]">
          <div className="absolute inset-0 rounded-[2.5rem] bg-hero-glow" />
          <div className="absolute left-0 top-8 h-[420px] w-[72%] overflow-hidden rounded-[2rem] border border-white/50 shadow-float sm:w-[68%]">
            <Image src={gallery[0]} alt="Ana e Bruno" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 h-[320px] w-[62%] animate-float overflow-hidden rounded-[2rem] border border-white/60 shadow-float">
            <Image src={gallery[1]} alt="Casal sorrindo" fill className="object-cover" />
          </div>
          <div className="glass-panel absolute bottom-16 left-6 max-w-xs rounded-[1.75rem] p-5 shadow-soft">
            <p className="font-display text-2xl text-foreground">“O amor está nos detalhes.”</p>
            <p className="mt-2 text-sm leading-6 text-mocha/70">
              Cada presente, presença e mensagem fará parte da memória mais bonita da nossa vida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
