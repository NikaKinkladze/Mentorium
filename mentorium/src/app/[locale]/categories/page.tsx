import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORIES, COURSES } from '@/lib/data';

export default function CategoriesPage() {
  const t = useTranslations('categoriesPage');

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'var(--text)', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{t('eyebrow')}</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: 'var(--bg)', marginBottom: 16, lineHeight: 1.1 }}>{t('title')}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 520 }}>{t('subtitle', { count: CATEGORIES.length })}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ gridTemplateColumns: 'repeat(2, 1fr)' }} className="grid-3 categories-grid">
          {CATEGORIES.map((cat) => {
            const catCourses = COURSES.filter((c) => c.category === cat.name).slice(0, 3);
            return (
              <Link
                key={cat.id}
                href="/courses"
                style={{ textDecoration: 'none', backgroundColor: 'var(--surface)', borderRadius: 20, border: '1.5px solid var(--border)', overflow: 'hidden', display: 'flex' }}
              >
                <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }} className="category-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/${cat.imageId}?w=360&h=220&fit=crop&auto=format`} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 24, flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 8 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: 'var(--text)' }}>{cat.name}</h3>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth={2} style={{ flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{cat.courseCount.toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t('coursesAvailable')}</span>
                  </div>
                  {catCourses.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {catCourses.map((c) => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
                          <p style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface-alt)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{t('ctaTitle')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 32 }}>{t('ctaSubtitle')}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/courses" style={{ backgroundColor: 'var(--accent)', color: 'white', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              {t('ctaPrimary')}
            </Link>
            <Link href="/about" style={{ backgroundColor: 'transparent', color: 'var(--text)', border: '1.5px solid var(--border)', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
