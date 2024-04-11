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

    const isLevelExists = await trx("niveis").where("nivel", nivel).first();
    if (isLevelExists) {
      await trx.rollback();
      throw new AppError("Este nível já foi cadastrado!", 400);
    }

    await trx("niveis").insert({ nivel });
    await trx.commit();

    return response.json({
      "status": 201,
      "message": `Nível ${nivel} cadastrado com sucesso!`
    });
  }

  async index(request: Request, response: Response) {
    const levels = await knex("niveis").select("niveis.*");
    if (!levels) {
      throw new AppError("Não há níveis cadastrados!", 404);
    }
    return response.json(levels);
  }

  async update(request: Request, response: Response){
    const {id} = request.params;
    const {nivel} = request.body;

    if (!nivel) {
      throw new AppError("O corpo da requisição está incorreto!", 400);
    }

    const level = await knex("niveis").where({id}).first();
    if (!level) {
      throw new AppError("Nível informado não existe!");
    }

    level.nivel = nivel ?? level.nivel;

    await knex("niveis").where({id}).update(level)

    return response.json({
      "status": 200,
      "message": `Nível ${level.id} editado com sucesso!`
    });

  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const level = await knex("niveis").where({id}).first();
    if (!level) {
      throw new AppError("Nível informado não existe!");
    }
    const levelName = level.nivel;
    await knex("niveis").where({ id }).delete();

    return response.json(`Nível ${levelName} Excluído com sucesso!`);
  }

}

export { LevelsController };
