import { MercadoPagoConfig, Payment } from 'mercadopago';

export function getMercadoPagoClient() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) return null;

  return new MercadoPagoConfig({ accessToken });
}

export function getPaymentClient() {
  const client = getMercadoPagoClient();
  if (!client) return null;
  return new Payment(client);
}
