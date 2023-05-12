import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '@/env';

export class AuthController{

	async authenticate(req: Request , res: Response){
		const {  email, password}  = req.body;

		const user = await prisma.user.findUnique({
			where:{
				email,
			}
		});

		if(!user){
			return res.status(401).json({error:'User not found'});
		}
      
		const isValuePassword = await  compare(password, user.password);

		if(!isValuePassword){
			return res.status(401).json({error:'Password invalid '});
		}

		const token = sign({id: user.id}, env.TOKEN_KEY , {expiresIn: '190d'});

		const {id} = user;

		return res.json({user:{ id , email} , token});

	}
}


