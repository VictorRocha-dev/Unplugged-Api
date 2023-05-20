import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import { hash } from 'bcryptjs';

export class UserController{

	async index(req: Request , res: Response){
		const users = await prisma.user.findMany();
		return res.json({users});
	}

	async store(req: Request , res: Response){
		const {    
			name,
			email,
			password,
			nickname,
			img_user,
			street,
			number,
			city,
			state,
			zip_code,
			reference}  = req.body;
      
		const hashPassword = await  hash(password , 8);

		const emailAlreadyExist = await prisma.user.findUnique({
			where:{
				email
			}
		});

		if(emailAlreadyExist){
			return res.status(409).json('this email already exist');
		}

		const user = await prisma.user.create({
			data:{
				name,
				email,
				password: hashPassword,
				nickname,
				img_user,
				street,
				number,
				city,
				state,
				zip_code,
				reference
			}
		});

		return res.json({user});

	}

	
}


