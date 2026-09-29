'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuth, ApiError } from '@/lib/auth-context';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
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
      await register(name, email, password);
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
      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--text)' }} className="auth-visual">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=1000&fit=crop&auto=format" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 48 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '26px 30px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'white', lineHeight: 1.35, marginBottom: 6 }}>{t('registerVisualTitle')}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{t('registerVisualSubtitle')}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 64px', backgroundColor: 'var(--bg)' }} className="auth-form-panel">
        <div style={{ width: '100%', maxWidth: 380 }}>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: 36, display: 'inline-block' }}>
            ← {t('backToHome')}
          </Link>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{t('registerTitle')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32 }}>{t('registerSubtitle')}</p>

          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 7 }}>{t('fullName')}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('fullNamePlaceholder')} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 7 }}>{t('email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 7 }}>{t('password')}</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} style={{ ...inputStyle, paddingRight: 44 }} />
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
              {submitting ? t('registering') : t('registerSubmit')}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', marginTop: 24 }}>
            {t('haveAccount')}{' '}
            <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              {t('loginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
