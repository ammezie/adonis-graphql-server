# adonis-graphql-server

A GraphQL server built with Apollo server and AdonisJs

## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
git clone git@github.com:ammezie/adonis-graphql-server.git
```

If you use https, use this instead

```bash
git clone https://github.com/ammezie/adonis-graphql-server.git
```

## Setup

Run the command below to install dependencies

```bash
npm install
```

### Environment variables

Duplicate `.env.example` and rename it `.env`

### Migrations

Setup your database and enter the following in `.env`

```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=adonis_graphql_server
DB_USER=root
DB_PASSWORD=
```

Run the following command to run migration.

```bash
adonis migration:run
```

Finally, start the application:

```bash
adonis serve --dev
```

and visit [http://127.0.0.1:3333](http://127.0.0.1:3333) to see the application in action.