'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });

      if (!response.ok) throw new Error('Não foi possível entrar.');
      toast.success('Seja bem-vindo.');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao autenticar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2.5rem] border border-mocha/10 bg-white/80 p-8 shadow-float backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-3xl bg-sand text-mocha">
            <Heart className="size-6" />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-mocha/50">Acesso do convidado</p>
          <h1 className="mt-3 font-display text-4xl text-foreground">Ana & Bruno</h1>
          <p className="mt-3 text-sm leading-6 text-mocha/70">
            Entre com seu nome e telefone para acessar presentes, cotas da lua de mel e a confirmação de presença.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-mocha/65">Nome</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-mocha/65">Telefone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" required />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />} Entrar
          </Button>
        </form>
      </div>
    </main>
  );
}
