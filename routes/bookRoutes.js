import express from "express";
import Book from "../models/Book.js";
import validateBook from "../middleware/validator.js";

const router = express.Router();

// get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();

    if (books.length === 0) {
      const error = new Error("No books found");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// search books by title
router.get("/search", async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) {
      const error = new Error("Please provide a title");
      error.status = 400;
      return next(error);
    }

    const books = await Book.find({ title: new RegExp(title, "i") });

    if (books.length === 0) {
      const error = new Error(`No books found matching: ${title}`);
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// get books by genre
router.get("/genre/:genre", async (req, res, next) => {
  try {
    const genre = req.params.genre;
    const books = await Book.find({ genre: new RegExp(`^${genre}$`, "i") });

    if (books.length === 0) {
      const error = new Error(`No books found in genre: ${genre}`);
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// get book by id
router.get("/:bookid", async (req, res, next) => {
  try {
    const bookid = req.params.bookid;
    const book = await Book.findById(bookid);

    if (!book) {
      const error = new Error(`Book with id ${bookid} not found`);
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// create a new book
router.post("/", validateBook, async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// update a book
router.put("/:bookid", validateBook, async (req, res, next) => {
  try {
    const bookid = req.params.bookid;
    const book = await Book.findByIdAndUpdate(bookid, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      const error = new Error(`Book with id ${bookid} not found`);
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

// delete a book
router.delete("/:bookid", async (req, res, next) => {
  try {
    const bookid = req.params.bookid;
    const book = await Book.findByIdAndDelete(bookid);

    if (!book) {
      const error = new Error(`Book with id ${bookid} not found`);
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      message: `Book with id ${bookid} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
