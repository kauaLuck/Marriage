type SendWhatsAppParams = {
  phone: string;
  guestName: string;
  context: 'gift' | 'honeymoon';
  amountLabel: string;
};

export async function sendWhatsAppThankYouMessage(params: SendWhatsAppParams) {
  const token = process.env.META_WHATSAPP_TOKEN;
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    return { ok: false, skipped: true };
  }

  const body = `Olá, ${params.guestName}. 💛\n\nRecebemos sua contribuição de ${params.amountLabel} para ${params.context === 'gift' ? 'o presente escolhido' : 'nossa lua de mel na Argentina'}.\n\nObrigado por fazer parte desse capítulo tão especial da nossa história.\n\nCom carinho,\nAna & Bruno`; 

  const formattedPhone = `55${params.phone.replace(/\D/g, '')}`;

  const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: formattedPhone,
      type: 'text',
      text: { body },
    }),
  });

  return { ok: response.ok, skipped: false };
}
