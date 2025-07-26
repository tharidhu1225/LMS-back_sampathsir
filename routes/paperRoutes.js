import express from "express";
import { createPaper, deletePaper, getPapers, updatePaper } from "../controllers/paperController.js";

const paperRouter = express.Router();

paperRouter.get("/", getPapers);
paperRouter.post("/", createPaper);
paperRouter.put("/:id", updatePaper);
paperRouter.delete("/:id", deletePaper);

export default paperRouter;
