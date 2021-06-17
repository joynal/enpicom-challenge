# Backend

## 1. Setup environment variables

Copy `.env.example` to `.env` & modify env vars.

## 2. Setup database

I've used postgres for persisting data and used `fuzzystrmatch` extension for finding levenshtein distance. Both application & test
database needed to enable this extension.

Install extension:

```bash
CREATE EXTENSION fuzzystrmatch;
```

## 3. Install node modules

```bash
npm i
```

## Run tests

Before running test, create test database & enable `fuzzystrmatch` extension.

```bash
npm run test
```

## Run server

Before running API server, create application database & enable `fuzzystrmatch` extension. Then generate database table.

```bash
npm run migrate:latest
```

Start server

```bash
npm run start
```
