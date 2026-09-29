'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { COURSES, INSTRUCTORS } from '@/lib/data';
import CourseCard from '@/components/CourseCard';

const CURRICULUM = [
  { title: 'საწყისები', lessons: ['ცვლადები და მონაცემთა ტიპები', 'ფუნქციები', 'ობიექტები და მასივები', 'კონტროლის ნაკადი'], duration: '5სთ 30წთ' },
  { title: 'პრაქტიკული პროექტი', lessons: ['ინტერფეისის აგება', 'მოვლენების დამუშავება', 'მონაცემთა მოთხოვნა', 'დეპლოი'], duration: '4სთ 15წთ' },
  { title: 'გაღრმავებული თემები', lessons: ['კლოუჟერები', 'დაპირებები და Async/Await', 'პროტოტიპები', 'მოდულები'], duration: '7სთ 20წთ' },
];

export default function CourseDetailPage() {
  const t = useTranslations('courseDetail');
  const params = useParams();
  const course = COURSES.find((c) => String(c.id) === params.id) ?? COURSES[0];
  const instructor = INSTRUCTORS.find((i) => i.id === course.instructorId) ?? INSTRUCTORS[0];
  const related = COURSES.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);

  const [tab, setTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const tabStyle = (name: string): React.CSSProperties => ({
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: tab === name ? 600 : 400,
    color: tab === name ? 'var(--accent)' : 'var(--text-secondary)',
    background: 'none',
    border: 'none',
    borderBottom: `2px solid ${tab === name ? 'var(--accent)' : 'transparent'}`,
    cursor: 'pointer',
  });

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'var(--text)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }} className="course-hero-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <Link href="/courses" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>
                ← {t('backToCourses')}
              </Link>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>/</span>
              <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{course.category}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--bg)', lineHeight: 1.2, marginBottom: 14 }}>{course.title}</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: 'var(--accent)', fontSize: 13 }}>★★★★★</span>
                <span style={{ color: 'var(--bg)', fontWeight: 700, fontSize: 14 }}>{course.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>({course.reviews.toLocaleString()})</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{course.students.toLocaleString()} {t('students')}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://images.unsplash.com/${instructor.imageId}?w=64&h=64&fit=crop&auto=format`} alt={instructor.name} style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }} />
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t('createdBy')} </span>
                <span style={{ color: 'var(--bg)', fontSize: 13, fontWeight: 600 }}>{instructor.name}</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--surface)', borderRadius: 20, overflow: 'hidden', border: '1.5px solid var(--border)', position: 'sticky', top: 88 }} className="price-card">
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: 'var(--surface-alt)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://images.unsplash.com/${course.imageId}?w=760&h=427&fit=crop&auto=format`} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>₾{course.price}</span>
                <span style={{ fontSize: 15, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₾{course.originalPrice}</span>
                {discount > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>-{discount}%</span>}
              </div>
              <button style={{ width: '100%', backgroundColor: 'var(--accent)', color: 'white', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10, marginTop: 14 }}>
                {t('enrollNow')}
              </button>
              <button style={{ width: '100%', backgroundColor: 'transparent', color: 'var(--text)', border: '1.5px solid var(--border)', borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {t('tryFree')}
              </button>
              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>{t('guarantee')}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 760, marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 28, flexWrap: 'wrap' }}>
            <button style={tabStyle('overview')} onClick={() => setTab('overview')}>{t('tabOverview')}</button>
            <button style={tabStyle('curriculum')} onClick={() => setTab('curriculum')}>{t('tabCurriculum')}</button>
            <button style={tabStyle('instructor')} onClick={() => setTab('instructor')}>{t('tabInstructor')}</button>
          </div>

          {tab === 'overview' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>{t('whatYouLearn')}</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', listStyle: 'none', padding: 0, marginBottom: 32 }}>
                {[t('learn1'), t('learn2'), t('learn3'), t('learn4')].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === 'curriculum' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CURRICULUM.map((section, i) => (
                <div key={section.title} style={{ backgroundColor: 'var(--surface)', borderRadius: 14, border: '1.5px solid var(--border)', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggle(i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{section.title}</span>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{section.lessons.length} {t('lessons')}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{section.duration}</span>
                    </div>
                  </button>
                  {expanded.has(i) && (
                    <div style={{ borderTop: '1px solid var(--border)', padding: '8px 20px 16px' }}>
                      {section.lessons.map((lesson) => (
                        <div key={lesson} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent)' }}>▶</span>
                          {lesson}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'instructor' && (
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://images.unsplash.com/${instructor.imageId}?w=160&h=160&fit=crop&auto=format`} alt={instructor.name} style={{ width: 90, height: 90, borderRadius: 20, objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{instructor.name}</h2>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>{instructor.title}</p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>★ {instructor.rating}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{instructor.students.toLocaleString()} {t('students')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 56, paddingBottom: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>{t('moreIn', { category: course.category })}</h2>
            <div style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} className="grid-3">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
