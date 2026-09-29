import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STATS = [
  { value: '10M+', labelKey: 'stat1Label', descKey: 'stat1Desc' },
  { value: '180K+', labelKey: 'stat2Label', descKey: 'stat2Desc' },
  { value: '74K+', labelKey: 'stat3Label', descKey: 'stat3Desc' },
  { value: '4.6', labelKey: 'stat4Label', descKey: 'stat4Desc' },
];

const VALUES = [
  { icon: '🌍', titleKey: 'value1Title', descKey: 'value1Desc' },
  { icon: '🎯', titleKey: 'value2Title', descKey: 'value2Desc' },
  { icon: '🤝', titleKey: 'value3Title', descKey: 'value3Desc' },
  { icon: '🔬', titleKey: 'value4Title', descKey: 'value4Desc' },
  { icon: '💬', titleKey: 'value5Title', descKey: 'value5Desc' },
  { icon: '✨', titleKey: 'value6Title', descKey: 'value6Desc' },
];

const TEAM = [
  { name: 'მაია ოქონკვო', roleKey: 'team1Role', imageId: 'photo-1573496359142-b8d87734a5a2' },
  { name: 'ლიანგ ვეი', roleKey: 'team2Role', imageId: 'photo-1500648767791-00dcc994a43e' },
  { name: 'ანა ბერიძე', roleKey: 'team3Role', imageId: 'photo-1580489944761-15a19d654956' },
  { name: 'გიორგი ხატიაშვილი', roleKey: 'team4Role', imageId: 'photo-1568602471122-7832951cc4c5' },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <section style={{ backgroundColor: 'var(--text)', padding: '80px 24px 72px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
            {t('eyebrow')}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 700, color: 'var(--bg)', lineHeight: 1.15, marginBottom: 24 }}>
            {t('heroTitle')} <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{t('heroEmphasis')}</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 18, lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>{t('heroSubtitle')}</p>
        </div>
      </section>

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="split-grid">
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 16 }}>
              {t('missionEyebrow')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: 24 }}>{t('missionTitle')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>{t('missionBody1')}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>{t('missionBody2')}</p>
            <Link href="/register" style={{ display: 'inline-block', backgroundColor: 'var(--accent)', color: 'white', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              {t('missionCta')}
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1/1' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&auto=format" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1/1', marginTop: 28 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop&auto=format" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1/1', marginTop: -28 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop&auto=format" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1/1' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop&auto=format" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--surface-alt)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text)', textAlign: 'center', marginBottom: 48 }}>{t('statsTitle')}</h2>
          <div style={{ gridTemplateColumns: 'repeat(4, 1fr)' }} className="grid-4">
            {STATS.map((s) => (
              <div key={s.labelKey} style={{ backgroundColor: 'var(--surface)', borderRadius: 20, padding: '28px 20px', border: '1.5px solid var(--border)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{s.value}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{t(s.labelKey)}</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>
              {t('valuesEyebrow')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--text)' }}>{t('valuesTitle')}</h2>
          </div>
          <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
            {VALUES.map((v) => (
              <div key={v.titleKey} style={{ backgroundColor: 'var(--surface)', borderRadius: 20, padding: 26, border: '1.5px solid var(--border)' }}>
                <span style={{ fontSize: 30, display: 'block', marginBottom: 14 }}>{v.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{t(v.titleKey)}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--text)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>
              {t('teamEyebrow')}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--bg)' }}>{t('teamTitle')}</h2>
          </div>
          <div style={{ gridTemplateColumns: 'repeat(4, 1fr)' }} className="grid-4">
            {TEAM.map((m) => (
              <div key={m.name} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/${m.imageId}?w=400&h=400&fit=crop&auto=format`} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 18 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--bg)', marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{t(m.roleKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{t('finalCtaTitle')}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.65, marginBottom: 32 }}>{t('finalCtaSubtitle')}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/register" style={{ backgroundColor: 'var(--accent)', color: 'white', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              {t('finalCtaPrimary')}
            </Link>
            <Link href="/courses" style={{ backgroundColor: 'transparent', color: 'var(--text)', border: '1.5px solid var(--border)', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              {t('finalCtaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
