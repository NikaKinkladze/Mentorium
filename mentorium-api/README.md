# Mentorium — Database + API

Prisma schema, seed script, and now a real NestJS API on top of it — starting with authentication, since almost everything else depends on knowing who's making the request.

## Setup

```bash
npm install
cp .env.example .env   # edit DATABASE_URL, and set a real JWT_SECRET for anything beyond local dev
npm run db:migrate     # creates tables from schema.prisma
npm run db:seed        # populates sample data matching the frontend's placeholder content
npm run start:dev      # starts the API on http://localhost:3001
```

`npm run db:studio` opens Prisma Studio — a GUI to browse/edit data in the browser.

## Auth endpoints (built so far)

| Method | Route | Auth required? | Body |
|---|---|---|---|
| POST | `/auth/register` | No (`@Public()`) | `{ name, email, password }` |
| POST | `/auth/login` | No (`@Public()`) | `{ email, password }` |
| GET | `/users/me` | Yes | — (reads the token) |

`register` and `login` both return `{ accessToken, user }`. Send the token back as `Authorization: Bearer <accessToken>` on subsequent requests.

**Every route is protected by default.** `JwtAuthGuard` is registered globally in `app.module.ts`, so a new controller method needs no extra code to require auth — only routes explicitly marked `@Public()` (see `auth/decorators/public.decorator.ts`) skip the check. This is deliberate: it's much safer to opt individual routes *out* of auth than to remember to add a guard to every new protected route as the API grows.

### How the guard works

1. `JwtStrategy` (`auth/strategies/jwt.strategy.ts`) reads the `Authorization: Bearer <token>` header, verifies the signature against `JWT_SECRET`, and loads the matching user from the database.
2. If valid, the user (password hash stripped) is attached to `req.user`.
3. Controllers pull it out with `@CurrentUser()` — see `users.controller.ts` for the pattern.

### Password handling

Passwords are hashed with bcrypt (10 salt rounds) before ever touching the database — `passwordHash` on `User` is nullable specifically so OAuth-only accounts (Google login, planned per the tech stack) can exist without one.

## What's deliberately not built yet

- **Refresh tokens** — the access token is a single 7-day JWT for now. Fine for early development; worth adding a short-lived access token + refresh token pair before this goes to real users, so a compromised token doesn't stay valid for a week.
- **Google OAuth** — `passwordHash` being nullable is already set up for this, but the actual OAuth strategy isn't wired in yet.
- **Rate limiting on `/auth/login`** — needed before production, to blunt brute-force attempts.
- **Password reset flow** — no `/auth/forgot-password` yet.
- **Courses/enrollments/etc. controllers** — this pass was scoped to auth only, since every other module will need `@CurrentUser()` to know whose data it's touching.

## How this maps to the frontend

| Frontend concept | Table(s) |
|---|---|
| `COURSES` array in `src/lib/data.ts` | `Course`, joined with `Category` and `User` (instructor) |
| `INSTRUCTORS` array | `User` where `role = INSTRUCTOR` |
| `CATEGORIES` array | `Category` |
| Course detail page tabs (curriculum) | `Section` → `Lecture` |
| Student dashboard "My Learning" | `Enrollment` (+ `LectureProgress` for per-lecture state) |
| Student dashboard "Wishlist" | `WishlistItem` |
| Student dashboard "Certificates" | `Certificate` |
| Course detail page reviews | `Review` |
| Checkout / purchase | `Order` + `OrderItem` |

## Design notes

- **Bilingual fields** (`titleKa`/`titleEn`, `nameKa`/`nameEn`, etc.) follow the same Georgian-primary, English-secondary pattern as the frontend's `ka.json`/`en.json`. Georgian fields are required; English fields are nullable — a course can exist without an English translation, but not without a Georgian one.
- **`Order` + `OrderItem`** rather than a single purchase row, so checkout can hold multiple courses in one cart, and the price paid is locked in on `OrderItem.price` even if the course's price changes later.
- **`LectureProgress`** is separate from `Enrollment.progressPercent` — the percent is a fast-to-read summary; the per-lecture rows are what actually drive "continue where you left off" and lesson checkmarks in the course player.
- **Instructor fields live on `User`** (`title`, `bio`) rather than a separate `Instructor` table — since anyone can be both a student and an instructor, this avoids a confusing dual-identity model for v1. Worth splitting out later if instructor-specific fields grow a lot.
- **`@@map(...)` on every model** gives the actual MySQL table names (snake_case, plural) while keeping PascalCase model names in Prisma/TypeScript — matches common Node.js/MySQL convention.

## What's not modeled yet (intentionally, for v1)

- Coupons/discount codes
- Instructor payouts (belongs in a `teach/earnings` feature, not core schema)
- Course Q&A threads
- Notifications
- Admin moderation/reporting tables

These map to routes we deliberately deferred in the sitemap plan (`/teach/*`, `/admin/*`) — worth adding once those features are actually being built, rather than speculatively now.

## Next step

Auth is done. The natural next module is **Courses** — a `CoursesController` with public `GET /courses` and `GET /courses/:slug` endpoints (using `@Public()`), plus protected `POST /courses` for instructors to create one. That's the module the Next.js frontend's `/courses` and `/courses/:id` pages will actually call once we replace the placeholder `data.ts` with real API requests.
