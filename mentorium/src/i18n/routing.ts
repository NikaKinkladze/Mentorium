import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ka', 'en'],
  defaultLocale: 'ka',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
