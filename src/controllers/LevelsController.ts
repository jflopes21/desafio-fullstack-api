import knex from "../database/connection";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

class LevelsController {
  async create(request: Request, response: Response) {
    const { nivel } = request.body;
    if (!nivel) {
      throw new AppError("O corpo da requisição está incorreto!", 400);
    }

    const trx = await knex.transaction();

    const isLevelExists = await trx("niveis").where('nivel', nivel).first();
    if(isLevelExists) {
      await trx.rollback();
      throw new AppError("Este nível já foi cadastrado!", 400)
    }

    const level = await trx("niveis").insert(request.body);
    await trx.commit();

    return response.json(`Nível ${nivel} cadastrado com sucesso!`);
  }

  async index(request: Request, response: Response) {
    const levels = await knex("niveis").select('niveis.*')
    return response.json(levels);
  }
}

export { LevelsController };
