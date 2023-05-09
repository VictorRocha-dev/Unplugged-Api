import { prisma } from "@/lib/prisma";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { User } from "@prisma/client";

export class CreateUserUSeCase{
  async execute({
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
    reference
    }: CreateUserDTO): Promise<User> {
      //Verificação de email igual
      //verificação de nickname igual
      //conversão de senha para hash 
      //criar o usuario 

      const emailAlreadyExists = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if(emailAlreadyExists){
        //erro de email ja cadastrado no meu banco

      }

      const nikeNameAlreadyExists = await prisma.user.findUnique({
        where: {
          nickname
        }
      })

      if(nikeNameAlreadyExists){
        
      }

      const user = await prisma.user.create({
        data:{
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
          reference
        }
      })

      return user

    }
}