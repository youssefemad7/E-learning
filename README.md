# E-Learning Platform

A full-stack online learning platform built with React, NestJS, TypeScript, and MongoDB. Students can discover courses, enroll in free courses or use a demonstrative payment flow for paid courses, study lessons, and track learning progress. Instructors can create and manage courses and lessons, while administrators manage users, categories, and course reviews.

> **Project status:** Backend feature modules are implemented and have been manually tested through Postman. Frontend authentication is connected to the backend. Most other frontend feature pages are still UI prototypes using static/mock data. The next phase is frontend integration, followed by browser-based manual testing and a final project review.

## Contents

- Overview
- Current Implementation Status
- Product Rules and Technical Decisions
- Technology Stack
- Project Structure
- Getting Started
- Environment Variables
- Backend API Overview
- Testing Status
- Development Roadmap
- Available Scripts

## Overview

The repository contains two separate applications:

- **Frontend:** React single-page application built with Vite and TypeScript.
- **Backend:** REST API built with NestJS and TypeScript, using MongoDB through Mongoose.

The backend is organized into feature modules. Authentication, role-based authorization, ownership checks, enrollment rules, lesson access, payment verification logic, and learning progress are handled by the backend.

The intended product is a registered-user platform. Public guest course browsing is not part of the current product scope.

## Current Implementation Status

### Backend

The following backend feature modules have been implemented:

| Module | Implementation |
| --- | --- |
| Authentication | Student/instructor registration, login, JWT access tokens, refresh-token rotation, logout, and refresh-token storage as a bcrypt hash |
| Users | User persistence and admin-only user listing endpoints |
| Categories | Category CRUD, unique slugs, parent/child hierarchy, tree retrieval, and deletion checks for related courses/subcategories |
| Courses | Course CRUD, unique slugs, pagination/filtering, instructor ownership, and submission/review/approve/reject/publish/unpublish workflow |
| Lessons | Lesson CRUD, section grouping/renaming, lesson and section ordering, ownership checks, and access control |
| Enrollments | Free-course enrollment, enrollment after verified successful payment, enrollment lookup, and cancellation |
| Payments | Payment records, Paymob intention/checkout integration boundary, callback validation, HMAC verification, payment status handling, expiration, idempotent processing, and enrollment after verified success |
| Learning Progress | Updating lesson completion, retrieving progress for one course, and retrieving progress across a student's active courses |

**Backend verification:** Backend build and application startup have been verified. Feature APIs have been exercised manually through Postman, including authentication, authorization, validation, ownership, and common error cases. See Testing Status for known limitations.

### Frontend

- React application with routing and reusable page/component structure.
- Login and registration are connected to the backend.
- Authentication uses React Query, an in-memory access token, an HTTP-only refresh-token cookie, automatic refresh handling, and logout.
- React Query is configured at the application root.
- Course listing, course details, checkout, course viewing, and other screens have UI implementations, but most of their data and actions are still static or mock data.
- The remaining feature screens have not yet been integrated with backend APIs.

## Product Rules and Technical Decisions

These decisions are intentional and should be preserved during future development:

1. **Registered-user platform:** The current product does not include public guest course browsing. Frontend routes and backend endpoints must follow the authentication policy.
2. **Roles:** The application uses student, instructor, and admin. Public registration must never allow a user to create an administrator account.
3. **Instructor permissions:** Instructors can create and manage their own courses and lessons. They can submit courses for administrative review.
4. **Course review:** Administrators approve or reject submitted courses. Actual instructor changes to a published course's details or curriculum send it back to PENDING_REVIEW. Administrative changes and no-op curriculum updates should not trigger an unnecessary review transition.
5. **Lesson access:** Full lesson access is controlled by the backend. Course ownership, administrator access, preview eligibility, and active enrollment determine access.
6. **Payment integration scope:** Paymob is a demonstrative/test integration for this learning project. The repository does not claim a fully onboarded live merchant account or production payment processing.
7. **Payment verification:** A payment must be verified through the gateway callback/HMAC flow before it is treated as successful and before enrollment is granted. The frontend must never decide that a payment succeeded by sending its own status.
8. **Payment expiration:** A payment intention has a 30-minute validity window and can transition to EXPIRED.
9. **Late verified callbacks:** A verified successful gateway callback can still be processed after the local payment expiration time. A verified payment must not be discarded solely because the local expiration job ran first.
10. **Course unpublished during checkout:** If a student initiated payment while the course was available, a later verified successful payment should still grant the corresponding enrollment even if the course was unpublished in the meantime.
11. **Idempotency:** Repeated payment callbacks or retries must not create duplicate successful payment processing or duplicate enrollments.
12. **Refresh-token security:** The refresh token is stored in an HTTP-only cookie and is not returned as a JSON response field. The database stores a bcrypt hash of the refresh token.
13. **Testing scope:** Manual Postman API testing is the current backend verification approach. Automated unit and backend E2E tests are deferred and will be reconsidered during the final project review. This is a deliberate scope choice for this individual learning project, not a claim that manual testing replaces automated testing in team or production systems.

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
| Payment gateway | Paymob demonstrative/test integration |

## Project Structure

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
    │   │   ├── progress/
    │   │   ├── app.module.ts
    │   │   └── main.ts
    │   └── test/
    ├── frontend/
    │   └── src/
    │       ├── Component/
    │       ├── features/
    │       ├── Pages/
    │       ├── services/
    │       ├── App.tsx
    │       └── main.tsx
    └── README.md

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (local MongoDB or MongoDB Atlas)
- Paymob test configuration only if exercising the external Paymob integration

### 1. Clone the repository

    git clone https://github.com/youssefemad7/E-learning.git
    cd E-learning

### 2. Configure and run the backend

    cd backend
    npm install
    npm run start:dev

Create a .env file in the backend directory and provide the variables listed in Environment Variables.

### 3. Configure and run the frontend

Open a second terminal:

    cd frontend
    npm install
    npm run dev

Create a .env file in the frontend directory and set VITE_API_URL to the backend API base URL. Vite will print the local development URL in the terminal.

## Environment Variables

### Backend — backend/.env

| Variable | Purpose |
| --- | --- |
| PORT | Port used by the NestJS server |
| MONGO_URI | MongoDB connection string |
| FRONTEND_URL | Frontend origin allowed by CORS |
| JWT_SECRET | Secret used to sign access tokens |
| JWT_EXPIRES_IN | Access-token lifetime (for example, 15m) |
| JWT_REFRESH_SECRET | Separate secret used to sign refresh tokens |
| JWT_REFRESH_EXPIRES_IN | Refresh-token lifetime (for example, 7d) |
| Paymob configuration | Test credentials and callback/HMAC configuration required by the payment service |

Use strong, private secrets in local and production environments. Do not commit either .env file or real credentials to the repository. Check the backend configuration and payment service for the exact Paymob variable names required by the current implementation.

### Frontend — frontend/.env

| Variable | Purpose |
| --- | --- |
| VITE_API_URL | Backend API base URL |

## Backend API Overview

| Route group | Purpose |
| --- | --- |
| /auth | Register, login, refresh session, and logout |
| /user | Admin-only user listing |
| /categories | Retrieve categories/tree; admin category management |
| /courses | Course listing/details, instructor course management, and admin review workflow |
| /lessons | Lesson retrieval, creation, editing, deletion, section management, and ordering |
| /enrollments | Student enrollment, enrolled-course listing, enrollment checks, and cancellation |
| /payments | Start payment, retrieve a student's payments, and receive the Paymob callback |
| /progress | Update lesson completion and retrieve course/student learning progress |

Protected operations enforce authentication, roles, and resource ownership. Exact request/response contracts and route permissions are defined in the DTOs and controllers under backend/src/.

## Testing Status

### Completed

- Backend build and startup checks.
- Manual Postman API testing for Authentication, Users, Categories, Courses, Lessons, Enrollments, Payments, and Learning Progress.
- Authentication checks included registration, login, protected requests, refresh, logout, and refresh rejection after logout.
- API checks covered successful responses, validation failures, authorization, ownership, invalid identifiers, and not-found cases where applicable.

### Deferred / Not yet completed

- Feature-level automated backend unit tests (.spec.ts).
- Automated backend E2E tests (.e2e-spec.ts).
- Frontend feature integration and systematic browser testing.
- Full browser-based user journeys across student, instructor, and administrator roles.
- A successful end-to-end Paymob checkout and real provider callback verification. The code contains the integration/verification flow, but external provider checkout has not yet been validated successfully. A local/mock payment path may be added to test the paid-course journey without depending on live merchant onboarding.

### Known items to recheck

- A Categories circular-parent Postman scenario returned a 404 where rejection of the circular relationship was expected; verify the exact test data and behavior during final backend regression.
- The Courses invalid-category-ID Postman scenario was not conclusively verified.
- Paymob checkout attempts returned a provider/API error during manual testing, leaving temporary pending payment records that subsequently expired. Do not treat this as a verified successful gateway flow.

Manual Postman testing is useful API verification, but it does not automatically cover browser behavior, all integration combinations, or regressions after future code changes.

## Development Roadmap

The next phase is to connect the existing frontend screens to the completed backend. Work should proceed feature by feature, preserving the existing UI where it makes sense and replacing mock data/actions with real API calls.

1. **Frontend integration foundation**
   - Run and inspect the current frontend build/lint checks.
   - Review existing route protection and authentication/session behavior.
   - Establish a shared Axios API client that all feature services can use, preserving the existing access-token and refresh-token behavior.
   - Define shared API response/error handling and React Query key conventions.

2. **Categories and course discovery**
   - Connect category retrieval and course listing.
   - Replace static course cards, search/filter, and pagination data with backend responses.
   - Respect the backend authentication policy for course endpoints.

3. **Course details and curriculum**
   - Connect course details and lesson/section retrieval.
   - Display real course information, instructor information, requirements, learning outcomes, and curriculum based on available API fields.
   - Handle loading, empty, and error states.

4. **Instructor course management**
   - Connect create, edit, delete, and submit-for-review operations.
   - Connect lesson creation/editing/deletion, section renaming, and ordering.
   - Ensure instructor actions are limited to the instructor's own courses.

5. **Administrator features**
   - Connect category management, user listing, and course review actions.
   - Verify role-based route visibility in the UI while keeping backend authorization as the actual security boundary.

6. **Student enrollment and payments**
   - Connect free enrollment and enrolled-course retrieval.
   - Integrate the existing payment initiation/status experience.
   - Decide and implement a safe local/mock payment flow for demonstrative paid-course testing if the external Paymob test flow remains unavailable. Never trust a client-side success flag to grant enrollment.

7. **Course player and learning progress**
   - Connect lesson content and navigation.
   - Connect lesson completion updates and course progress retrieval.
   - Display accurate progress percentages and completed lessons.

8. **Frontend and full-application manual testing**
   - Test forms, validation messages, loading/error/empty states, navigation, session restoration, refresh, and logout.
   - Test complete student, instructor, and administrator journeys in the browser.
   - Re-run relevant Postman requests after backend changes and resolve the known items listed above.

9. **Final review**
   - Review security, authorization, data exposure, error handling, and performance basics.
   - Verify frontend/backend production builds and environment configuration.
   - Update this README to reflect the final implemented and tested state.
   - Reconsider whether a small number of automated tests for critical flows would add enough value to justify the time.

## Available Scripts

Run commands from the relevant backend/ or frontend/ directory.

### Backend

| Command | Description |
| --- | --- |
| npm run start:dev | Start NestJS in watch mode |
| npm run build | Compile the backend |
| npm run test | Run Jest unit tests; feature-level test coverage is not implemented |
| npm run test:e2e | Run the configured Jest E2E command; feature-level E2E coverage is not implemented |
| npm run test:cov | Run tests with coverage |

### Frontend

| Command | Description |
| --- | --- |
| npm run dev | Start the Vite development server |
| npm run build | Type-check and build the frontend |
| npm run lint | Run ESLint |
| npm run preview | Preview the production build |

---

This project is a work in progress. Implemented backend modules and successful Postman checks do not imply that the frontend is fully integrated, that the external payment provider has been validated end to end, or that the application is production-ready.
