# 📚 Bookstore REST API

A RESTful API for managing books, built with Express.js and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookstore
```

### 3. Start MongoDB

```bash
mongosh
```

### 4. Run the server

```bash
npm run dev
```

## API Endpoints

### Books

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| GET    | `/api/books`                      | Get all books         |
| GET    | `/api/books/:id`                  | Get book by ID        |
| POST   | `/api/books`                      | Create a new book     |
| PUT    | `/api/books/:id`                  | Update a book         |
| DELETE | `/api/books/:id`                  | Delete a book         |
| GET    | `/api/books/genre/:genre`         | Get books by genre    |
| GET    | `/api/books/search?title=keyword` | Search books by title |

### Book Schema

| Field   | Type    | Required | Validation                                         |
| ------- | ------- | -------- | -------------------------------------------------- |
| title   | String  | Yes      | Min 3 characters                                   |
| author  | String  | Yes      | —                                                  |
| year    | Number  | Yes      | Min 1000, Max current year                         |
| genre   | String  | Yes      | Enum: Fiction, Non-Fiction, Science, History, etc. |
| pages   | Number  | Yes      | Min 1                                              |
| price   | Number  | Yes      | Min 0                                              |
| inStock | Boolean | No       | Default: true                                      |

### Example Request

**POST /api/books**

```json
{
  "title": "Harry Potter",
  "author": "JK Rowling",
  "year": 1997,
  "genre": "Fiction",
  "pages": 309,
  "price": 15.99
}
```

### Error Handling

| Status | Meaning                        |
| ------ | ------------------------------ |
| 200    | Success                        |
| 201    | Created                        |
| 400    | Bad Request / Validation Error |
| 404    | Not Found                      |
| 500    | Server Error                   |

## Project Structure

```
bookstore-api/
├── models/
│   └── Book.js
├── routes/
│   └── bookRoutes.js
├── middleware/
│   ├── validator.js
│   └── errorHandler.js
├── .env
├── app.js
├── package.json
└── README.md
```
