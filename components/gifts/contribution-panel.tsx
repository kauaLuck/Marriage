'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, QrCode, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

type Props = {
  kind: 'gift' | 'honeymoon';
  title: string;
  amountCents: number;
  giftId?: string;
  maxQuotas?: number;
  editableAmount?: boolean;
};

export function ContributionPanel({ kind, title, amountCents, giftId, maxQuotas = 10, editableAmount = true }: Props) {
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<{ qrCode: string | null; qrCodeBase64: string | null; amountLabel: string } | null>(null);
  const [quotas, setQuotas] = useState(1);
  const [customAmount, setCustomAmount] = useState(String(amountCents / 100));

  const totalAmountCents = useMemo(() => {
    if (kind === 'honeymoon') return quotas * amountCents;
    return Math.round(Number(customAmount.replace(',', '.')) * 100);
  }, [amountCents, customAmount, kind, quotas]);

  async function handleCreatePix() {
    try {
      setLoading(true);
      const response = await fetch('/api/payments/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          title,
          amountCents: totalAmountCents,
          giftId,
          quotas,
        }),
      });

      if (!response.ok) throw new Error('Não foi possível gerar o PIX.');

      const data = await response.json();
      setPix(data);
      toast.success('PIX gerado com sucesso.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao gerar PIX.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!pix?.qrCode) return;
    await navigator.clipboard.writeText(pix.qrCode);
    toast.success('Código PIX copiado.');
  }

  return (
    <div className="rounded-[2rem] border border-mocha/10 bg-white/80 p-6 shadow-soft">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-sand text-mocha">
          <Wallet className="size-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-mocha/50">Pagamento via PIX</p>
          <h3 className="font-display text-2xl text-foreground">Contribuir agora</h3>
        </div>
      </div>

      <div className="space-y-4">
        {kind === 'honeymoon' ? (
          <div>
            <label className="mb-2 block text-sm text-mocha/65">Quantidade de cotas</label>
            <Input type="number" min={1} max={maxQuotas} value={quotas} onChange={(e) => setQuotas(Number(e.target.value))} />
          </div>
        ) : (
          <div>
            <label className="mb-2 block text-sm text-mocha/65">Valor da contribuição (R$)</label>
            <Input value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} disabled={!editableAmount} />
          </div>
        )}

        <div className="rounded-2xl bg-[#f7efe8] p-4 text-sm text-mocha/80">
          <p className="text-mocha/60">Resumo</p>
          <p className="mt-1 text-lg font-medium text-foreground">{formatCurrency(totalAmountCents)}</p>
        </div>

        <Button onClick={handleCreatePix} className="w-full" disabled={loading || totalAmountCents <= 0}>
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <QrCode className="mr-2 size-4" />}
          Gerar QR Code PIX
        </Button>

        {pix && (
          <div className="space-y-4 rounded-[1.5rem] border border-mocha/10 bg-[#fcfaf7] p-4">
            {pix.qrCodeBase64 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`data:image/png;base64,${pix.qrCodeBase64}`} alt="QR Code PIX" className="mx-auto h-52 w-52 rounded-2xl border border-mocha/10 bg-white p-3" />
            ) : (
              <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-mocha/15 bg-white text-center text-sm text-mocha/60">
                QR Code mock para ambiente de desenvolvimento
              </div>
            )}
            <p className="text-center text-sm text-mocha/70">Assim que o pagamento for aprovado, o progresso será atualizado automaticamente.</p>
            <Button variant="secondary" className="w-full" onClick={handleCopy}>
              Copiar código PIX
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
