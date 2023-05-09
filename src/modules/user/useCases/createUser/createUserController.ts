import { Request, Response } from "express";
import { CreateUserUSeCase } from "./createUserUseCase";

export class CreateUserController{
  async handle(req: Request , res: Response){
    const {    
      name,
      email,
      password_hash,
      nickname,
      img_user,
      street,
      number,
      city,
      state,
      zip_code,
      reference}  = req.body

      const createUserUseCase = new CreateUserUSeCase();

      const result = await createUserUseCase.execute({name, email,
        password_hash,
        nickname,
        img_user,
        street,
        number,
        city,
        state,
        zip_code,
        reference });

        return res.status(201).json(result)

  }
}