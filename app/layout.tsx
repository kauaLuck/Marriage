import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { RealtimeProvider } from '@/components/providers/realtime-provider';

export const metadata: Metadata = {
  title: 'Ana & Bruno — Wedding Experience',
  description: 'Plataforma premium de casamento com presentes, cotas da lua de mel, RSVP e pagamentos via PIX.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <RealtimeProvider>{children}</RealtimeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
