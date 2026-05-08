import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#004CBC',
};

export const metadata: Metadata = {
  title: 'PSAD LPP Manager | Gestion Produits & Facturation LPPR',
  description:
    'Plateforme de gestion des produits LPP pour PSAD France. Recherche intelligente, fiches détaillées, checklist facturation, chatbot MAD. Conforme LPPR Titre I Chapitre 2.',
  keywords: [
    'PSAD',
    'LPP',
    'LPPR',
    'facturation',
    'produits médicaux',
    'remboursement',
    'Assurance Maladie',
    'lits médicalisés',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PSAD LPP Manager',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
