import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThanksPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl rounded-[2.5rem] border border-mocha/10 bg-white/80 p-10 text-center shadow-float">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-3xl bg-sand text-mocha">
          <HeartHandshake className="size-7" />
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-mocha/50">Obrigado</p>
        <h1 className="mt-3 font-display text-5xl text-foreground">Seu carinho chegou até nós</h1>
        <p className="mt-5 text-base leading-8 text-mocha/75">
          Recebemos sua contribuição e estamos muito felizes por ter você participando deste capítulo tão importante da nossa vida. Obrigado por transformar este sonho em memória.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/dashboard"><Button size="lg">Voltar ao dashboard</Button></Link>
          <Link href="/gifts"><Button variant="secondary" size="lg">Ver outros presentes</Button></Link>
        </div>
      </div>
    </main>
  );
}
