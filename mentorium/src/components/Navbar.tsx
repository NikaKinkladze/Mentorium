'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import ThemeToggle from './ThemeToggle';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const tb = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks: { label: string; href: string }[] = [
    { label: t('courses'), href: '/courses' },
    { label: t('categories'), href: '/categories' },
    { label: t('about'), href: '/about' },
  ];

  const isActive = (href: string) => pathname === href;
  const initial = user?.name?.trim()?.[0]?.toUpperCase() ?? '?';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'var(--accent)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1.5L9.5 5.5H13.5L10.5 8L11.5 12L7.5 9.5L3.5 12L4.5 8L1.5 5.5H5.5L7.5 1.5Z" fill="white" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            {tb('brand')}
          </span>
        </Link>

        <div className="navbar-desktop-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 14,
                fontWeight: isActive(link.href) ? 600 : 400,
                color: isActive(link.href) ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div className="navbar-right-desktop">
            <LocaleSwitcher />
            <ThemeToggle />

            {user ? (
              <>
                <Link
                  href="/my-profile"
                  style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
                >
                  {t('myLearning')}
                </Link>
                <Link
                  href="/my-profile"
                  title={user.name}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    flexShrink: 0,
                  }}
                >
                  {initial}
                </Link>
                <button
                  onClick={logout}
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: isActive('/login') ? 'var(--accent)' : 'var(--text)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  style={{
                    backgroundColor: 'var(--text)',
                    color: 'var(--bg)',
                    borderRadius: 10,
                    padding: '8px 18px',
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('signup')}
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-mobile-toggle"
            aria-label="Menu"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '16px 24px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
                fontSize: 15,
                color: isActive(link.href) ? 'var(--accent)' : 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontWeight: isActive(link.href) ? 600 : 400,
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ display: 'flex', gap: 10, padding: '14px 0', flexWrap: 'wrap' }}>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          {user ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '10px 0', fontFamily: 'var(--font-body)', color: 'var(--text)', textDecoration: 'none' }}
              >
                {t('myLearning')}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 0',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 15,
                }}
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '10px 0', fontFamily: 'var(--font-body)', color: 'var(--text)', textDecoration: 'none' }}
              >
                {t('login')}
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 8,
                  padding: '12px 0',
                  borderRadius: 10,
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {t('signup')}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
