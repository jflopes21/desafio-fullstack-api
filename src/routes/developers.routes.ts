import { Router } from "express";
import { DevelopersController } from "../controllers/developersController";

const developersController = new DevelopersController();

const developersRouter = Router();

developersRouter.get("/", developersController.index);

export { developersRouter };
