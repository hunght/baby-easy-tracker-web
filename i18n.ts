import { getRequestConfig } from 'next-intl/server';

// Import messages directly to avoid dynamic import caching issues
import enMessages from './messages/en.json';
import viMessages from './messages/vi.json';

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

const messagesMap: Record<Locale, typeof enMessages> = {
  en: enMessages,
  vi: viMessages,
};

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // Get locale from requestLocale (next-intl v3+) or fallback to locale parameter
  const resolvedLocale = (await requestLocale) || locale;

  // Use 'en' as default if locale is invalid
  const currentLocale: Locale = locales.includes(resolvedLocale as Locale)
    ? (resolvedLocale as Locale)
    : 'en';

  return {
    locale: currentLocale,
    messages: messagesMap[currentLocale],
  };
});
