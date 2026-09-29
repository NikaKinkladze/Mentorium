'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const otherLocale = locale === 'ka' ? 'en' : 'ka';

  return (
    <button
      type="button"
      onClick={() => router.replace({ pathname, params }, { locale: otherLocale })}
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-secondary)',
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '6px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {locale === 'ka' ? 'ქართ · EN' : 'EN · ქართ'}
    </button>
  );
}
