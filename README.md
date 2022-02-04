# <img src="./public/logo.svg" width=50> Welcome to the Project

– A Nextjs practise repository

## About

This is a practise project I will, or will not, update with something in the future. The goal of this project is to learn the basics of typescript and Next.js as well as proper authentication.
The styling in this project is done with Tailwind and the database utilices wrapper named Prisma.

## Getting Started

First, install the dependencies

```bash
npm i
#or
yarn dev
```

Then certificates-example to certificates and insert proper tokens inside.
You'll also need to rename `.env-example.local` to `.env.local` and fill it out.

Lastly before you can start developing you'll need to migrate the database with

```bash
npx prisma migrate dev --name init
```

To start the development server run

```bash
npm run dev
#or
yarn dev
```

If you wish to connect to the backend, you'll need to add authentication token to the database

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
