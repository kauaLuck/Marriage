'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RsvpPage() {
  const [attendanceStatus, setAttendanceStatus] = useState<'confirmed' | 'declined'>('confirmed');
  const [guestsCount, setGuestsCount] = useState('1');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendanceStatus, guestsCount: Number(guestsCount), dietaryRestrictions, message }),
      });

      if (!response.ok) throw new Error('Não foi possível enviar o RSVP.');
      toast.success('RSVP enviado com sucesso.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar RSVP.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section-spacing">
      <div className="section-shell max-w-3xl">
        <div className="rounded-[2.5rem] border border-mocha/10 bg-white/80 p-8 shadow-float sm:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-mocha/50">RSVP</p>
          <h1 className="mt-3 font-display text-5xl text-foreground">Confirmação de presença</h1>
          <p className="mt-4 text-base leading-8 text-mocha/75">Queremos viver este momento com conforto e cuidado em cada detalhe. Sua resposta nos ajuda a preparar tudo com carinho.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-mocha/65">Status</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setAttendanceStatus('confirmed')} className={`rounded-2xl border px-4 py-4 text-sm ${attendanceStatus === 'confirmed' ? 'border-mocha bg-sand text-foreground' : 'border-mocha/10 bg-white text-mocha/70'}`}>
                  Confirmarei presença
                </button>
                <button type="button" onClick={() => setAttendanceStatus('declined')} className={`rounded-2xl border px-4 py-4 text-sm ${attendanceStatus === 'declined' ? 'border-mocha bg-sand text-foreground' : 'border-mocha/10 bg-white text-mocha/70'}`}>
                  Não poderei ir
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-mocha/65">Quantidade de pessoas</label>
              <Input type="number" min={1} max={5} value={guestsCount} onChange={(e) => setGuestsCount(e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm text-mocha/65">Restrições alimentares</label>
              <Input value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} placeholder="Opcional" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-mocha/65">Mensagem para o casal</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-32 w-full rounded-2xl border border-mocha/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-mocha/35" placeholder="Opcional" />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>Enviar confirmação</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
