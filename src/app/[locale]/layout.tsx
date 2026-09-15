import '@/config/style/global.css';

import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { locales } from '@/config/locale';
import { routing } from '@/core/i18n/config';
import { getMetadata } from '@/shared/lib/seo';

const dmSans = localFont({
  src: '../../assets/fonts/dm-sans-variable.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-vag-sans',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const generateMetadata = getMetadata();

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const appUrl = envConfigs.app_url || '';

  return (
    <html lang={locale} className={dmSans.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href={envConfigs.app_favicon} />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/voiceactinggame/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        {locales
          ? locales.map((loc) => (
              <link
                key={loc}
                rel="alternate"
                hrefLang={loc}
                href={`${appUrl}${loc === 'en' ? '' : `/${loc}`}`}
              />
            ))
          : null}
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
