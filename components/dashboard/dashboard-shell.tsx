import Link from 'next/link';
import { CalendarHeart, Gift, Heart, Plane } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function DashboardShell({ guestName, children }: { guestName: string; children: React.ReactNode }) {
  const nav = [
    { href: '/gifts' as const, label: 'Presentes', icon: Gift },
    { href: '/honeymoon' as const, label: 'Lua de mel', icon: Plane },
    { href: '/story' as const, label: 'Nossa história', icon: Heart },
    { href: '/rsvp' as const, label: 'Confirmar presença', icon: CalendarHeart },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-mocha/10 bg-white/70 backdrop-blur-xl">
        <div className="section-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mocha/50">Bem-vindo</p>
            <h1 className="font-display text-3xl text-foreground">{guestName}</h1>
          </div>
          <div className="rounded-full border border-mocha/10 bg-white/80 px-5 py-3 text-sm text-mocha/75">
            {siteConfig.couple} · {new Date(siteConfig.weddingDate).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </header>

      <div className="section-shell py-8">
        <nav className="mb-8 grid gap-3 rounded-[2rem] border border-mocha/10 bg-white/65 p-3 shadow-soft sm:grid-cols-4">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-[1.4rem] px-4 py-4 text-sm text-mocha/75 transition hover:bg-[#f7efe8] hover:text-foreground">
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}
