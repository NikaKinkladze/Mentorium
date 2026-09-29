import type { Metadata } from 'next';
import { Fraunces, Outfit, Noto_Serif_Georgian, Noto_Sans_Georgian } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSerifKa = Noto_Serif_Georgian({
  subsets: ['georgian'],
  variable: '--font-noto-serif-ka',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const notoSansKa = Noto_Sans_Georgian({
  subsets: ['georgian'],
  variable: '--font-noto-sans-ka',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mentorium',
  description: 'Mentorium — ისწავლე ნებისმიერი უნარი ნამდვილი მენტორებისგან',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  // THE FIX: fetch messages on the server and pass them explicitly.
  // NextIntlClientProvider without an explicit `messages` prop relies on an
  // implicit server->client handoff that isn't available in every next-intl
  // version — when it's missing, client components silently get zero
  // messages and every t('key') call renders the raw key instead.
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fraunces.variable} ${outfit.variable} ${notoSerifKa.variable} ${notoSansKa.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
