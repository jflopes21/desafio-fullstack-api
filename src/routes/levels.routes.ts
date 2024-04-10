import { Router } from "express";
import { LevelsController } from "../controllers/LevelsController";

const levelsController = new LevelsController();

const levelsRouter = Router();

levelsRouter.get("/", levelsController.index);
levelsRouter.post("/", levelsController.create);

export { levelsRouter };
