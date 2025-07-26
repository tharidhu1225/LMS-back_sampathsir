import express from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post("/", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/:id", getBookById);

export default bookRouter;
