export const siteConfig = {
  couple: 'Ana & Bruno',
  weddingDate: process.env.NEXT_PUBLIC_WEDDING_DATE ?? '2026-11-21T16:00:00-03:00',
  location: 'São Paulo, Brasil',
  honeymoonTitle: 'Ajude nossa lua de mel na Argentina',
  honeymoonTargetCents: Number(process.env.NEXT_PUBLIC_HONEYMOON_TARGET_CENTS ?? 1000000),
  honeymoonQuotaValueCents: 10000,
  palette: ['#EDE0D4', '#D6CCC2', '#7F5539', '#B08968', '#6B705C', '#A5A58D'],
};
