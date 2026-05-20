import { randomUUID } from 'node:crypto';
import { formatCurrency } from '@/lib/utils';
import { getPaymentClient } from '@/lib/mercadopago';
import { createAdminClient } from '@/lib/supabase/server';

type CreatePixPaymentInput = {
  amountCents: number;
  guestId: string;
  guestName: string;
  guestPhone: string;
  title: string;
  context: 'gift' | 'honeymoon';
  giftId?: string;
  quotas?: number;
};

export async function createPixPayment(input: CreatePixPaymentInput) {
  const paymentClient = getPaymentClient();
  const supabase = await createAdminClient();
  const externalReference = randomUUID();

  if (!paymentClient || !supabase) {
    return {
      id: externalReference,
      status: 'pending',
      qrCode: '00020101021126360014BR.GOV.BCB.PIX0114+55119999999995204000053039865802BR5925ANAEBRUNO6009SAOPAULO62070503***6304ABCD',
      qrCodeBase64: null,
      amountCents: input.amountCents,
      amountLabel: formatCurrency(input.amountCents),
      mock: true,
    };
  }

  const result = await paymentClient.create({
    body: {
      transaction_amount: Number((input.amountCents / 100).toFixed(2)),
      description: input.title,
      payment_method_id: 'pix',
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercadopago`,
      external_reference: externalReference,
      payer: {
        email: `${input.guestPhone.replace(/\D/g, '')}@anabruno.wedding`,
        first_name: input.guestName,
      },
      metadata: {
        guest_id: input.guestId,
        gift_id: input.giftId ?? null,
        quotas: input.quotas ?? 0,
        context: input.context,
      },
    },
  });

  const transactionData = result.point_of_interaction?.transaction_data;

  await supabase.from('payments').insert({
    id: externalReference,
    provider: 'mercado_pago',
    provider_payment_id: String(result.id),
    payment_type: 'pix',
    status: result.status,
    amount_cents: input.amountCents,
    guest_id: input.guestId,
    gift_id: input.giftId ?? null,
    qr_code: transactionData?.qr_code ?? null,
    qr_code_base64: transactionData?.qr_code_base64 ?? null,
    payload: result,
  });

  return {
    id: externalReference,
    providerPaymentId: result.id,
    status: result.status,
    qrCode: transactionData?.qr_code ?? null,
    qrCodeBase64: transactionData?.qr_code_base64 ?? null,
    amountCents: input.amountCents,
    amountLabel: formatCurrency(input.amountCents),
    mock: false,
  };
}
