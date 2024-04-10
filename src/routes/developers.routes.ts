import { Router } from "express";
import { DevelopersController } from "../controllers/DevelopersController";

const developersController = new DevelopersController();

const developersRouter = Router();

developersRouter.get("/", developersController.index);

export { developersRouter };
