import { Link } from '@/i18n/navigation';
import type { Course } from '@/lib/types';

export default function CourseCard({ course }: { course: Course }) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <Link
      href={`/courses/${course.id}`}
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: 'var(--surface-alt)', flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://images.unsplash.com/${course.imageId}?w=480&h=270&fit=crop&auto=format`}
          alt={course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', backgroundColor: 'var(--accent-tint)', padding: '3px 9px', borderRadius: 100 }}>
            {course.category}
          </span>
          {discount > 0 && (
            <span style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', backgroundColor: '#F0FDF4', padding: '3px 8px', borderRadius: 100 }}>
              -{discount}%
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: 4,
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {course.title}
        </h3>

        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{course.instructor}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{course.rating}</span>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} style={{ fontSize: 11, color: i <= Math.round(course.rating) ? 'var(--accent)' : 'var(--border)' }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({course.reviews.toLocaleString()})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>₾{course.price}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₾{course.originalPrice}</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{course.duration}</span>
        </div>
      </div>
    </Link>
  );
}
