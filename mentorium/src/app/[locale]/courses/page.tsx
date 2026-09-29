'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { COURSES } from '@/lib/data';
import CourseCard from '@/components/CourseCard';

export default function CoursesPage() {
  const t = useTranslations('courses');

  const CATS = ['all', 'პროგრამირება', 'დიზაინი', 'ბიზნესი', 'ფოტოგრაფია'];
  const LEVELS = ['all', 'დამწყები', 'საშუალო', 'გაწაფული'];

  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let list = COURSES.filter((c) => {
      if (category !== 'all' && c.category !== category) return false;
      if (level !== 'all' && c.level !== level) return false;
      if (c.price > maxPrice) return false;
      return true;
    });
    if (sort === 'popular') list = [...list].sort((a, b) => b.students - a.students);
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, level, maxPrice, sort]);

  const reset = () => {
    setCategory('all');
    setLevel('all');
    setMaxPrice(200);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'var(--text)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--bg)', marginBottom: 10 }}>{t('title')}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>{t('count', { count: COURSES.length })}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 32, alignItems: 'flex-start' }} className="courses-layout">
        <aside
          style={{ width: 240, flexShrink: 0, backgroundColor: 'var(--surface)', borderRadius: 20, border: '1.5px solid var(--border)', padding: 24, position: 'sticky', top: 88 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{t('filters')}</h3>
            <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--accent)' }}>
              {t('resetAll')}
            </button>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{t('category')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CATS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: 9,
                    border: 'none',
                    backgroundColor: category === cat ? 'var(--accent-tint)' : 'transparent',
                    color: category === cat ? 'var(--accent)' : 'var(--text)',
                    fontWeight: category === cat ? 600 : 400,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {cat === 'all' ? t('allCategories') : cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{t('level')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: 9,
                    border: 'none',
                    backgroundColor: level === lv ? 'var(--accent-tint)' : 'transparent',
                    color: level === lv ? 'var(--accent)' : 'var(--text)',
                    fontWeight: level === lv ? 600 : 400,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {lv === 'all' ? t('allLevels') : lv}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t('maxPrice')}</h4>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>₾{maxPrice}</span>
            </div>
            <input type="range" min={20} max={200} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </div>
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              <span style={{ fontWeight: 700, color: 'var(--text)' }}>{filtered.length}</span> {t('results')}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 10, border: '1.5px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text)', fontSize: 13, cursor: 'pointer' }}
            >
              <option value="popular">{t('sortPopular')}</option>
              <option value="rating">{t('sortRating')}</option>
              <option value="price-low">{t('sortPriceLow')}</option>
              <option value="price-high">{t('sortPriceHigh')}</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', marginBottom: 8 }}>{t('noResults')}</p>
              <button onClick={reset} style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                {t('resetAll')}
              </button>
            </div>
          ) : (
            <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
