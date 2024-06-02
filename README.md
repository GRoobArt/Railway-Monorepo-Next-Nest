# Turborepo Project Template with NestJS, PostgreSQL, Prisma ORM, Redis, and Next.js

This template provides a comprehensive starting point for a full-stack application using the following technologies:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/JvhvGi?referralCode=sM6cRx)

- Turborepo: A high-performance build system for JavaScript and TypeScript codebases, enabling efficient management of monorepos.
- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- PostgreSQL: A powerful, open-source object-relational database system.
- Prisma ORM: A modern database toolkit for TypeScript and Node.js, making database access easy with an auto-generated query builder.
- Redis: An in-memory data structure store, used as a database, cache, and message broker.
- Next.js: A React framework for building fast and user-friendly static websites and web applications.

## Project Structure

This template is organized into a monorepo structure using Turborepo, with the following main components:

- api: A NestJS-based API that connects to a PostgreSQL database using Prisma ORM. It also integrates Redis for caching.
- web: A Next.js frontend application that connects to the API.

## Features

- Efficient Monorepo Management: Utilizing Turborepo for streamlined development and deployment processes across multiple applications and libraries.
- Scalable API: Built with NestJS, providing a modular and maintainable architecture.
- Robust Database Management: PostgreSQL as the database, managed through Prisma ORM for type-safe database access.
- Caching with Redis: Improve performance and reduce database load by caching frequently accessed data.
- Modern Frontend: A Next.js frontend that interacts seamlessly with the NestJS API, offering a fast and responsive user experience.

## Getting Started

To use this template, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

```bash
git clone git@github.com:GRoobArt/Railway-Monorepo-Next-Nest.git
```

2. **Install Dependencies**: Navigate to the project directory and install dependencies.

```bash
cd $_
npm install
```

3. **Set Up Environment Variables**: Create a .env file in the root directory and configure the necessary environment variables for PostgreSQL, Redis, and any other services.
4. **Run the Project**: Start the development servers for both the API and the frontend.

```bash
npm run dev
```

5. Deploy on Railway: Follow the Railway deployment instructions to deploy your project.

## Deployment

Railway provides a seamless deployment process. Ensure your environment variables are set in the Railway project settings. Use the following commands to deploy your applications:

1. Deploy API:
   `railway up -s api`
2. Deploy Frontend:
   `railway up -s web`
