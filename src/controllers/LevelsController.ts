import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

class LevelsController {
  async create(request: Request, response: Response, next: NextFunction) {
    const { nivel } = request.body;
    if (!nivel) {
      throw new AppError("O corpo da requisição está incorreto!", 400);
    }

    return response.json();
  }

  async index(request: Request, response: Response) {}
}

export { LevelsController };
