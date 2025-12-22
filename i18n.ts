import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'vi'];

export default getRequestConfig(async ({ locale }) => {
  // Use 'en' as default if locale is invalid (handles internal Next.js routes during build)
  const currentLocale = locales.includes(locale as any) ? locale : 'en';

  return {
    locale: currentLocale as string,
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  };
});
