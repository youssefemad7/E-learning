# E-Learning Platform

A full-stack online learning platform that brings students and instructors together. Students can discover courses, enroll, purchase paid courses, and learn through structured lessons. Instructors can create and manage courses, while administrators manage users and review course submissions.

> **Project status:** Backend core modules are implemented. Learning progress tracking is the next backend module. Frontend authentication is connected; most other frontend features are still UI prototypes using static/mock data. Systematic backend, frontend, and end-to-end testing is pending.

## Contents

- [Overview](#overview)
- [Current Implementation Status](#current-implementation-status)
- [Important Product and Technical Decisions](#important-product-and-technical-decisions)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Backend API Overview](#backend-api-overview)
- [Development Roadmap](#development-roadmap)
- [Available Scripts](#available-scripts)

## Overview

The application is organized as two separate projects:

- **Frontend:** React single-page application built with Vite and TypeScript.
- **Backend:** REST API built with NestJS and TypeScript, using MongoDB through Mongoose.

The backend follows a modular architecture. Authentication, users, categories, courses, lessons, enrollments, and payments are implemented as separate modules. Authentication, role-based authorization, course ownership, and lesson access rules are enforced by the backend.

The platform is intended for registered users. A public guest course catalog is not part of the current product scope.

## Current Implementation Status

### Backend

| Module | Current implementation |
| --- | --- |
| Authentication | Registration, login, JWT access tokens, refresh-token rotation, logout, and refresh-token storage as a bcrypt hash |
| Users | User persistence, student/instructor registration roles, and admin-only user management endpoints |
| Categories | Category CRUD, unique slugs, parent/child hierarchy, tree retrieval, and protection against deleting categories that still have courses or subcategories |
| Courses | Course CRUD, unique slugs, pagination and filtering, instructor ownership, and submission/review/approve/reject/publish/unpublish workflow |
| Lessons | Lesson CRUD, section grouping, section renaming, lesson/section ordering, ownership checks, and access control based on role, preview eligibility, and enrollment |
| Enrollments | Free-course enrollment, enrollment after verified successful payment, and enrollment cancellation |
| Payments | Paymob intention flow, callback HMAC verification, payment status handling, expiration, idempotent processing, and enrollment after verified success |
| Learning Progress | Not implemented yet; this is the next backend module |

**Course review workflow:** Instructors submit courses for review. Administrators can approve or reject submissions. Actual instructor changes to a published course's details or curriculum send the course back to `PENDING_REVIEW`. Administrative actions and no-op curriculum updates should not trigger an unnecessary review transition.

**Lesson access:** Full lesson access is controlled by the backend. Preview eligibility, course ownership, administrator access, and active enrollment determine whether a user can access lesson content.

### Frontend

- React application with routing and reusable page components.
- Login and registration connected to the backend.
- Access-token handling, refresh-based session restoration, and logout.
- React Query for authentication state and mutations.
- Course discovery, course details, checkout, and course-view screens exist as UI prototypes. Their course, lesson, checkout, and progress data is not yet integrated with the backend APIs.

### Testing and deployment status

- A complete systematic backend test pass is still pending.
- Frontend API integration beyond authentication is pending.
- Full frontend and end-to-end user-journey testing is pending.
- Deployment and production-readiness work have not been completed.
- Implemented features should not be interpreted as proof that all end-to-end flows have been tested.

## Important Product and Technical Decisions

These decisions are intentional and should be preserved during future development:

1. **Registered-user platform:** There is no public guest catalog. Course routes remain protected according to the current authentication policy.
2. **Roles:** The application uses `student`, `instructor`, and `admin`. Public registration must not allow users to create an administrator account.
3. **Course review:** An instructor's actual change to a published course's details or curriculum moves it back to `PENDING_REVIEW`. Administrative changes and no-op updates should not trigger this transition.
4. **Payment integration scope:** Paymob is being integrated as a demonstrative/test gateway flow. This project is not claiming a fully onboarded live merchant or production payment account.
5. **Payment verification:** A payment must be verified through the gateway callback/HMAC flow before it is treated as successful and before enrollment is granted.
6. **Payment expiration:** A payment intention has a 30-minute validity window and can transition to `EXPIRED`.
7. **Late verified callbacks:** A verified successful gateway callback can still be processed after the local payment expiration time. A verified payment must not be discarded solely because the local expiration job ran first.
8. **Course unpublished during checkout:** If a student initiated payment while the course was available, a later verified successful payment should still grant the corresponding enrollment even if the course was unpublished in the meantime.
9. **Idempotency:** Repeated payment callbacks or retries must not create duplicate successful payment processing or duplicate enrollments.
10. **Refresh-token security:** The refresh token is stored in an HTTP-only cookie and is not returned as a JSON response field. The database stores a bcrypt hash of the refresh token.
11. **Testing approach:** Add appropriate tests while implementing modules where practical, then perform a systematic backend test pass before frontend integration is considered complete.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 7 |
| Styling and UI | Tailwind CSS 4, shadcn/ui, Radix UI, Flowbite |
| Routing and data | React Router 7, TanStack React Query 5 |
| HTTP client | Axios |
| Backend | NestJS 11, TypeScript |
| Database | MongoDB, Mongoose 9 |
| Authentication | Passport, JWT, bcrypt, HTTP-only refresh-token cookie |
| Validation | class-validator, class-transformer |
| Payment gateway | Paymob test/demonstration integration |

## Project Structure

The backend currently contains the implemented feature modules below. Learning progress is planned but has not been implemented yet.

```text
E-learning/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── categories/
│   │   ├── courses/
│   │   ├── lessons/
│   │   ├── enrollments/
│   │   ├── payments/
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── test/
├── frontend/
│   └── src/
│       ├── Component/
│       ├── features/
│       ├── Pages/
│       ├── services/
│       └── App.tsx
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (local MongoDB or MongoDB Atlas)
- Paymob test credentials/configuration for exercising the payment flow

### 1. Clone the repository

```bash
git clone https://github.com/youssefemad7/E-learning.git
cd E-learning
```

### 2. Configure and run the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and provide the variables listed in [Environment Variables](#environment-variables).

Start the API in development mode:

```bash
npm run start:dev
```

### 3. Configure and run the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory and set `VITE_API_URL` to the backend API base URL.

Start the frontend:

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Environment Variables

### Backend — `backend/.env`

| Variable | Purpose |
| --- | --- |
| `PORT` | Port used by the NestJS server |
| `MONGO_URI` | MongoDB connection string |
| `FRONTEND_URL` | Frontend origin allowed by CORS |
| `JWT_SECRET` | Secret used to sign access tokens |
| `JWT_EXPIRES_IN` | Access-token lifetime (for example, `15m`) |
| `JWT_REFRESH_SECRET` | Separate secret used to sign refresh tokens |
| `JWT_REFRESH_EXPIRES_IN` | Refresh-token lifetime (for example, `7d`) |
| Paymob configuration | Provide the Paymob test credentials and callback/HMAC configuration required by the payment service |

Use strong, private secrets in local and production environments. Do not commit either `.env` file or real credentials to the repository. Check the backend configuration and payment service for the exact Paymob variable names required by the current implementation.

### Frontend — `frontend/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API |

## Backend API Overview

The backend is organized around these route groups:

| Route group | Purpose |
| --- | --- |
| `/auth` | Register, login, refresh session, and logout |
| `/user` | User management endpoints |
| `/categories` | Browse categories and category hierarchy; category management |
| `/courses` | Course creation, management, and review workflow |
| `/lessons` | Course lessons, section management, and ordering |
| `/enrollments` | Course enrollment operations |
| `/payments` | Payment initiation and gateway callback handling |

Protected operations enforce authentication, roles, and resource ownership. Instructor operations are restricted to the course owner where applicable, while administrators have elevated access. Payment callback verification is handled by the payment flow and must not be replaced by trusting client-provided payment status. Exact request/response contracts are defined in the DTOs and controllers under `backend/src/`.

## Development Roadmap

The agreed development order is:

1. **Implement Learning Progress Module** — track student progress through course lessons.
2. **Test the complete backend** — systematically test modules, validation, authorization, access control, payment edge cases, and cross-module flows; fix discovered bugs.
3. **Integrate frontend with backend** — connect features module by module and replace mock/static data with real API data.
4. **Test the frontend** — verify forms, loading/error states, navigation, authentication/session behavior, and feature flows.
5. **Test the complete application end to end** — verify realistic student, instructor, and administrator journeys, including free and paid enrollment.
6. **Security, performance, and deployment** — review production configuration, secrets, error handling, performance, and deployment.

Build checks and focused tests should also be run during implementation when practical, rather than allowing all verification work to accumulate at the end.

## Available Scripts

Run commands from the relevant `backend/` or `frontend/` directory.

### Backend

| Command | Description |
| --- | --- |
| `npm run start:dev` | Start NestJS in watch mode |
| `npm run build` | Compile the backend |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the frontend |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

---

This project is a work in progress. The implementation status above describes the current development scope; it does not imply that all features have passed systematic testing or are deployed to production.
