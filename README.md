# E-Learning Platform

A full-stack online learning platform that brings students and instructors together. Students can discover courses and learn through structured lessons, while instructors can create and manage courses. Administrators review submitted courses and manage platform content.

> **Project status:** Under active development. The backend foundation and core course-authoring modules are implemented. Most frontend pages are currently UI prototypes powered by static/mock data; authentication is the only feature currently connected to the backend.

## Contents

- [Overview](#overview)
- [Current Features](#current-features)
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

The backend follows a modular structure. Authentication, users, categories, courses, and lessons are separated into NestJS modules. Course ownership and role-based permissions are enforced in the backend.

## Current Features

### Backend

| Module | Current implementation |
| --- | --- |
| Authentication | Registration, login, JWT access tokens, refresh-token rotation, logout, and refresh-token storage as a bcrypt hash |
| Users | Student/instructor registration roles, user persistence, and admin-only user listing |
| Categories | Category CRUD, unique slugs, parent/child hierarchy, tree retrieval, and protection against deleting categories that still have courses or subcategories |
| Courses | Course CRUD, unique slugs, pagination, category/level/status filtering, instructor ownership, and course submission/review/publish/reject/unpublish workflow |
| Lessons | Lesson CRUD, course ownership checks, section grouping, section renaming, and section/lesson ordering |

**Course publishing workflow:** an instructor creates a draft and submits it for review. An administrator can approve or reject the submission. Editing a published course sends it back for review.

**Lesson organization:** lessons are stored separately and grouped into named sections within a course. Section and lesson order are stored explicitly.

### Frontend

- React application with routing and reusable page components.
- Login and registration connected to the backend.
- Access-token handling, refresh-based session restoration, and logout.
- React Query for authentication state and mutations.
- Course discovery, course details, checkout, and course-view screens are present as UI prototypes. Their displayed course, lesson, checkout, and review data is currently static/mock data and is not yet connected to the corresponding backend features.

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

## Project Structure

```text
E-learning/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── categories/
│   │   ├── courses/
│   │   ├── lessons/
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

### Frontend — `frontend/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API |

Use strong, private secrets in local and production environments. Do not commit either `.env` file or real credentials to the repository.

## Backend API Overview

The API uses the following route groups:

| Route group | Purpose |
| --- | --- |
| `/auth` | Register, login, refresh session, and logout |
| `/user` | User management endpoints (admin access) |
| `/categories` | Browse categories and category hierarchy; admin category management |
| `/courses` | Course creation, browsing, management, and review workflow |
| `/lessons` | Course lessons, section management, and ordering |

Most course and lesson endpoints require authentication. Instructor operations are restricted to the course owner, while administrators have elevated access. Exact request/response contracts are defined in the DTOs and controllers under `backend/src/`.

## Development Roadmap

The next development stages are:

1. Implement course enrollment and the rules that determine who can access course content.
2. Implement payment handling and connect successful purchases to enrollment.
3. Implement lesson progress tracking.
4. Connect the existing frontend screens to the backend APIs and replace mock data incrementally.
5. Add systematic backend and frontend tests, including authorization and access-control cases.
6. Review security and production configuration, then deploy the frontend, backend, and database.

Some access rules are intentionally not final yet. In particular, access to full lesson/video content must be tied to preview eligibility or a valid enrollment before the learning experience is connected end-to-end.

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

This project is a work in progress. Features marked as implemented describe the current codebase and do not imply that the complete end-to-end user journey has been tested or deployed.
