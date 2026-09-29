import { PrismaClient, Role, CourseLevel, CourseStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Categories ---
  const [programming, design, , photography] = await Promise.all([
    prisma.category.create({ data: { slug: 'programming', nameKa: 'პროგრამირება', nameEn: 'Programming' } }),
    prisma.category.create({ data: { slug: 'design', nameKa: 'დიზაინი', nameEn: 'Design' } }),
    prisma.category.create({ data: { slug: 'business', nameKa: 'ბიზნესი', nameEn: 'Business' } }),
    prisma.category.create({ data: { slug: 'photography', nameKa: 'ფოტოგრაფია', nameEn: 'Photography' } }),
  ]);

  // --- Instructors (Users with instructor fields filled in) ---
  const ana = await prisma.user.create({
    data: {
      email: 'ana@mentorium.ge',
      name: 'ანა ბერიძე',
      role: Role.INSTRUCTOR,
      title: 'UX დიზაინის მენტორი',
      bio: 'UX დიზაინერი 8+ წლის გამოცდილებით.',
    },
  });

  const nika = await prisma.user.create({
    data: {
      email: 'nika@mentorium.ge',
      name: 'ნიკა გელაშვილი',
      role: Role.INSTRUCTOR,
      title: 'Full-Stack დეველოპერი',
      bio: 'დეველოპერი და მენტორი, აწარმოებს პროდუქტებს 10+ წელია.',
    },
  });

  const tamar = await prisma.user.create({
    data: {
      email: 'tamar@mentorium.ge',
      name: 'თამარ ლომიძე',
      role: Role.INSTRUCTOR,
      title: 'ფოტოგრაფი და პედაგოგი',
      bio: 'პროფესიონალი ფოტოგრაფი, ასწავლის დამწყებებს 5 წელია.',
    },
  });

  // --- A sample student ---
  const student = await prisma.user.create({
    data: {
      email: 'luka@mentorium.ge',
      name: 'ლუკა გიორგაძე',
      role: Role.STUDENT,
    },
  });

  // --- Courses ---
  const uxCourse = await prisma.course.create({
    data: {
      slug: 'ux-design-basics',
      titleKa: 'UX დიზაინის საფუძვლები',
      titleEn: 'UX Design Basics',
      descriptionKa: 'ისწავლე UX დიზაინის ძირითადი პრინციპები ნულიდან.',
      price: 89,
      originalPrice: 149,
      level: CourseLevel.BEGINNER,
      status: CourseStatus.PUBLISHED,
      instructorId: ana.id,
      categoryId: design.id,
      sections: {
        create: [
          {
            titleKa: 'შესავალი UX-ში',
            order: 1,
            lectures: {
              create: [
                { titleKa: 'რა არის UX დიზაინი', order: 1, durationSeconds: 480, isPreview: true },
                { titleKa: 'მომხმარებლის კვლევა', order: 2, durationSeconds: 720 },
              ],
            },
          },
        ],
      },
    },
  });

  const jsCourse = await prisma.course.create({
    data: {
      slug: 'javascript-basics',
      titleKa: 'JavaScript საწყისები',
      titleEn: 'JavaScript Basics',
      descriptionKa: 'JavaScript-ის საფუძვლები პრაქტიკული პროექტებით.',
      price: 129,
      originalPrice: 199,
      level: CourseLevel.BEGINNER,
      status: CourseStatus.PUBLISHED,
      instructorId: nika.id,
      categoryId: programming.id,
    },
  });

  await prisma.course.create({
    data: {
      slug: 'photography-101',
      titleKa: 'ფოტოგრაფია 101',
      titleEn: 'Photography 101',
      descriptionKa: 'ფოტოგრაფიის საფუძვლები დამწყებთათვის.',
      price: 69,
      originalPrice: 99,
      level: CourseLevel.ALL_LEVELS,
      status: CourseStatus.PUBLISHED,
      instructorId: tamar.id,
      categoryId: photography.id,
    },
  });

  // --- Sample enrollment + review ---
  await prisma.enrollment.create({
    data: { userId: student.id, courseId: uxCourse.id, progressPercent: 35 },
  });

  await prisma.review.create({
    data: { userId: student.id, courseId: jsCourse.id, rating: 5, comment: 'ძალიან ნათლად აიხსნება ყველაფერი.' },
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
