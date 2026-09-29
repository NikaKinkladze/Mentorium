import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { COURSES, INSTRUCTORS } from '@/lib/data';

const popularTags = ['JavaScript', 'Python', 'UI Design', 'Machine Learning', 'ფოტოგრაფია'];

export default function Home() {
  const t = useTranslations('home');

  return (
    <div>
      <section style={{ backgroundColor: 'var(--bg)', padding: '72px 24px 80px' }}>
        <div
          style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}
          className="home-hero-grid"
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                backgroundColor: 'var(--accent-tint)',
                color: 'var(--accent)',
                fontSize: 13,
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: 100,
                marginBottom: 28,
              }}
            >
              <span>⚡</span>
              <span>{t('badge')}</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 600,
                color: 'var(--text)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: 24,
              }}
            >
              {t('titleLine1')}
              <br />
              {t('titleLine2')} <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{t('titleEmphasis')}</em>
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.65, marginBottom: 36, maxWidth: 440 }}>{t('subtitle')}</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20, maxWidth: 480, flexWrap: 'wrap' }}>
              <div
                style={{
                  flex: '1 1 200px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 12,
                  padding: '12px 16px',
                }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--text-muted)" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  placeholder={t('searchPlaceholder')}
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: 'var(--text)', backgroundColor: 'transparent', fontFamily: 'var(--font-body)', minWidth: 0 }}
                />
              </div>
              <Link
                href="/courses"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  borderRadius: 12,
                  padding: '12px 22px',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {t('searchButton')}
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('popularLabel')}</span>
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  href="/courses"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '5px 13px', fontSize: 12, color: 'var(--text)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }} className="hero-visual">
            <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--surface-alt)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format"
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--surface-alt)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{t('instructorsTitle')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 420, margin: '0 auto' }}>{t('instructorsSubtitle')}</p>
          </div>

          <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
            {INSTRUCTORS.map((inst) => (
              <div key={inst.id} style={{ backgroundColor: 'var(--surface)', borderRadius: 20, padding: '28px 24px', border: '1.5px solid var(--border)', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: 20, overflow: 'hidden', margin: '0 auto 16px', border: '3px solid var(--surface-alt)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/${inst.imageId}?w=160&h=160&fit=crop&auto=format`} alt={inst.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{inst.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>{inst.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
                  <span style={{ color: 'var(--accent)', fontSize: 13 }}>★</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{inst.rating}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t('rating')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{(inst.students / 1000).toFixed(0)}K</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('students')}</p>
                  </div>
                  <div style={{ width: 1, backgroundColor: 'var(--border)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{inst.courses}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('courses')}</p>
                  </div>
                  <div style={{ width: 1, backgroundColor: 'var(--border)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{(inst.reviews / 1000).toFixed(1)}K</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('reviews')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
            {COURSES.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                style={{ backgroundColor: 'var(--surface)', borderRadius: 20, overflow: 'hidden', border: '1.5px solid var(--border)', textDecoration: 'none', display: 'block' }}
              >
                <div style={{ aspectRatio: '16/10', backgroundColor: 'var(--surface-alt)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/${course.imageId}?w=500&h=320&fit=crop&auto=format`} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 18 }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{course.instructor}</p>
                  <h3 style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 10 }}>{course.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <span style={{ color: 'var(--accent)', fontSize: 13 }}>★</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{course.rating}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({course.reviews})</span>
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>₾{course.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--accent)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>{t('ctaTitle')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, marginBottom: 36, lineHeight: 1.6 }}>{t('ctaSubtitle')}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/register" style={{ backgroundColor: 'white', color: 'var(--accent)', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              {t('ctaPrimary')}
            </Link>
            <Link href="/courses" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
