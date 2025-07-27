import express from "express";
import { createPaper, deletePaper, getPaperById, getPapers, updatePaper } from "../controllers/paperController.js";

const paperRouter = express.Router();

paperRouter.get("/", getPapers);
paperRouter.post("/", createPaper);
paperRouter.put("/:id", updatePaper);
paperRouter.delete("/:id", deletePaper);
paperRouter.get("/:id", getPaperById);

export default paperRouter;
