'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth, ApiError } from '@/lib/auth-context';

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '1.5px solid var(--border)',
    fontSize: 14,
    color: 'var(--text)',
    backgroundColor: 'var(--surface)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      if (err instanceof ApiError && err.message === 'UNREACHABLE') {
        setError(t('apiUnreachable'));
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(t('genericError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="auth-layout">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 64px', backgroundColor: 'var(--bg)' }} className="auth-form-panel">
        <div style={{ width: '100%', maxWidth: 380 }}>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 36, display: 'inline-block' }}>
            ← {t('backToHome')}
          </Link>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{t('loginTitle')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32 }}>{t('loginSubtitle')}</p>

          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <button
            type="button"
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '12px 16px', border: '1.5px solid var(--border)', borderRadius: 12, backgroundColor: 'var(--surface)',
              cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 24,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {t('continueWithGoogle')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('orEmail')}</span>
            <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 7 }}>{t('email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t('password')}</label>
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--accent)' }}>
                  {t('forgotPassword')}
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: 44 }} />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 11 }}
                >
                  {showPass ? t('hide') : t('show')}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ width: '100%', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 12, padding: 13, fontSize: 15, fontWeight: 600, cursor: submitting ? 'default' : 'pointer', marginTop: 4, opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? t('loggingIn') : t('loginSubmit')}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', marginTop: 24 }}>
            {t('noAccount')}{' '}
            <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              {t('signupLink')}
            </Link>
          </p>
        </div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--text)' }} className="auth-visual">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=1000&fit=crop&auto=format" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '26px 30px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'white', lineHeight: 1.45, marginBottom: 18 }}>&quot;{t('testimonialQuote')}&quot;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format" alt="" style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover' }} />
              <div>
                <p style={{ fontWeight: 600, color: 'white', fontSize: 14 }}>{t('testimonialName')}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{t('testimonialRole')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
