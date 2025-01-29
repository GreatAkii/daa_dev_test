# Web Backend Developer Test

## Tech Stack

- Node.js v23.4.0
- Express.js v4.21.2
- TypeScript v5.7.3
- In-memory data storage

## Dir Structure

```
.
├── dev_test/(project root)
├── src/
│   ├── models/
│   │   ├── item.ts             // Defines Item model
│   ├── services/
│   │   ├── item.service.ts     // Business logic and data operations
│   ├── controllers/
│   │   ├── item.controller.ts  // Request handling
│   ├── routes/
│   │   ├── item.route.ts       // Routes definition
│   ├── index.ts                // Application Setup

```

## Task Lists

- [x] Endpoint to add an items [POST] [http://localhost:8000/api/items](http://localhost:8000/api/items)
- [x] Endpoint to get all items [GET] [http://localhost:8000/api/items](http://localhost:8000/api/items)
- [x] Endpoint to delete an item by id [DELETE] [http://localhost:8000/api/items/:id](http://localhost:8000/api/items/:id)

---

### Extra

- [x] Endpoint to update an item details by id [PATCH] [http://localhost:8000/api/items/:id](http://localhost:8000/api/items/:id)
- [x] Endpoint to get item by id [GET] [http://localhost:8000/api/items/:id](http://localhost:8000/api/items/:id)
- [x] Unit tests for services
- [x] Integration tests for api endpoints

## Commands

`npm install` - Install dependencies

`npm run start` - Start development server
