import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FloatingChatbot } from '@/components/FloatingChatbot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#004CBC',
};

export const metadata: Metadata = {
  title: 'PSAD LPP Manager | Gestion Produits & Facturation LPPR',
  description: 'Plateforme de gestion des produits LPP pour PSAD France.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen bg-background">
          {children}
          <FloatingChatbot />
        </div>
      </body>
    </html>
  );
}
