import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import '@/shared/presentation/styles/globals.css';
import { Header } from '@/shared/presentation/components/Header';
import { Footer } from '@/shared/presentation/components/Footer';
import { CartDrawer } from '@/modules/cart/presentation/components/CartDrawer';

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Delosi E-commerce',
  description:
    'Plataforma de comercio electrónico de alto rendimiento - Evaluación Técnica Frontend Senior',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <Footer />

        <CartDrawer />
      </body>
    </html>
  );
}
