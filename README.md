# Prisma Express Rest API

boilerplate setup for express typescript project

### Tech stack:
- expressjs
- swagger
- prisma js
- jest unit tests
- zod schema
- typescript

---
Populate the database and run the express server
```bash 
npm i

npx prisma db seed

npm run dev
```

call the api

```bash
curl 'http://localhost:3000/users/' 

curl 'http://localhost:3000/posts/' 
```


Run tests

```bash
npm test
```
---

## swagger api documentation

http://localhost:3000/users/api-docs


