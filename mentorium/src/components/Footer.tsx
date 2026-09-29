import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tb = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--surface-alt)', borderTop: '1px solid var(--border)', padding: '48px 24px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32, marginBottom: 32 }}>
          <div style={{ maxWidth: 280 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: 'var(--text)' }}>{tb('brand')}</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>{t('tagline')}</p>
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{t('company')}</p>
            <Link href="/about" style={{ display: 'block', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 8 }}>
              {t('about')}
            </Link>
            <Link href="/contact" style={{ display: 'block', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              {t('contact')}
            </Link>
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{t('legal')}</p>
            <Link href="/terms" style={{ display: 'block', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 8 }}>
              {t('terms')}
            </Link>
            <Link href="/privacy" style={{ display: 'block', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              {t('privacy')}
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © {year} {tb('brand')}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
