# <img src="./public/logo.svg" width=50> Welcome to the Project

– A Nextjs practise repository

## About

This is a practise project I will, or will not, update with something in the future. The goal of this project is to learn the basics of typescript and Next.js as well as proper authentication.
The styling in this project is done with Tailwind and the database utilices wrapper named Prisma.

## Getting Started

Start by cloning the repository `git clone https://github.com/tlitola/project.git`

Then navigate to the folder in your terminal and install the dependencies

```bash
npm i
#or
yarn install
```

Then rename folder `certificates-example` to `certficates` and remove the example tag from the token names inside. Optionally you can supply your own tokens and add certificates (see more under security)

You'll also need to rename `.env-example` to `.env` and fill in absolute path to your certificates folder (apparently next doesn't like relative paths...). You can further edit the file if you wish to change the default behavior (see Custom database).

Lastly rename `.prisma` to `prisma`

To start the development server run

```bash
npm run dev
#or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Custom Database

By default, Project uses sqlite. You can change this by deleting prisma folder and copying one of the folders inside `prisma-example` under project-folder and renaming it to prisma. You'll also need to update the database_url inside of `.env`

Then you'll need to migrate the database by running

```bash
npx prisma migrate dev --name init
```

and add your API-key to the database and `.env`

## Security

If you wish to enable https on your local development server start by adding your certificates to the `certificates`-folder. You can generate the certificates using [mkcert](https://github.com/FiloSottile/mkcert) for example

Then inside `.env` enable https.

You can run your server with

```bash
npm run devhttps
#or
yarn devhttps
```
