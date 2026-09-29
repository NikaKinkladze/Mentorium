'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import { COURSES } from '@/lib/data';
import CourseCard from '@/components/CourseCard';

type Tab = 'learning' | 'wishlist' | 'certificates' | 'settings';

export default function MyProfilePage() {
  const t = useTranslations('myProfile');
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [tab, setTab] = useState<Tab>('learning');

  // Not logged in and we've finished checking — bounce to login
  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        …
      </div>
    );
  }

  const enrolled = COURSES.slice(0, 2);
  const wishlist = COURSES.slice(1, 3);

  const stats = [
    { value: String(enrolled.length), label: t('statEnrolled') },
    { value: '1', label: t('statCompleted') },
    { value: '24სთ', label: t('statTimeLearned') },
    { value: '1', label: t('statCertificates') },
  ];

  const tabBtn = (name: Tab, label: string) => (
    <button
      key={name}
      onClick={() => setTab(name)}
      style={{
        padding: '10px 20px',
        fontSize: 14,
        fontWeight: tab === name ? 600 : 400,
        color: tab === name ? 'var(--accent)' : 'var(--text-muted)',
        background: 'none',
        border: 'none',
        borderBottom: `2px solid ${tab === name ? 'var(--accent)' : 'transparent'}`,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'var(--text)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
            <div
              style={{
                width: 90, height: 90, borderRadius: 20, backgroundColor: 'var(--accent)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700,
                border: '3px solid rgba(255,255,255,0.1)', flexShrink: 0,
              }}
            >
              {user.name.trim()[0]?.toUpperCase() ?? '?'}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--bg)', marginBottom: 4 }}>{user.name}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{user.email}</p>
            </div>
          </div>

          <div style={{ gridTemplateColumns: 'repeat(4, 1fr)', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', marginBottom: 28 }} className="grid-4">
            {stats.map((s) => (
              <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '18px 20px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--bg)' }}>{s.value}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
            {tabBtn('learning', t('tabLearning'))}
            {tabBtn('wishlist', t('tabWishlist'))}
            {tabBtn('certificates', t('tabCertificates'))}
            {tabBtn('settings', t('tabSettings'))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 64px' }}>
        {tab === 'learning' && (
          <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
            {enrolled.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}

        {tab === 'wishlist' && (
          <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
            {wishlist.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}

        {tab === 'certificates' && (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text-secondary)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text)', marginBottom: 8 }}>{t('noCertificatesYet')}</p>
            <p style={{ fontSize: 14 }}>{t('noCertificatesHint')}</p>
          </div>
        )}

        {tab === 'settings' && (
          <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 7 }}>{t('settingsName')}</label>
              <input defaultValue={user.name} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid var(--border)', fontSize: 14, color: 'var(--text)', backgroundColor: 'var(--surface)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 7 }}>{t('settingsEmail')}</label>
              <input defaultValue={user.email} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid var(--border)', fontSize: 14, color: 'var(--text)', backgroundColor: 'var(--surface)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <button style={{ alignSelf: 'flex-start', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 26px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
              {t('settingsSave')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
