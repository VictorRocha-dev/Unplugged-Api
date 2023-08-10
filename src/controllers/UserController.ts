import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '@/env';



export class UserController {

	// Listar todos os usuários
	async index(req: Request, res: Response) {
		try {
			const users = await prisma.user.findMany();
			return res.json({ users });
		} catch (error) {
			console.error('Erro ao listar usuários:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Criar novo usuário
	async store(req: Request, res: Response) {
		try {
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
				reference,
			} = req.body;

			// Hash da senha
			const hashPassword = await hash(password, 8);

			// Verificar se o email já existe
			const emailAlreadyExist = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (emailAlreadyExist) {
				return res.status(409).json('This email already exists');
			}

			// Criar novo usuário
			const user = await prisma.user.create({
				data: {
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
					reference,
				},
			});

			return res.json({ user });
		} catch (error) {
			console.error('Erro ao criar usuário:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const token = req.headers.authorization?.split(' ')[1]; // Obtém o token Bearer do header
			if (!token) {
				return res.status(401).json('Unauthorized');
			}

			const decodedToken: any = jwt.verify(token, env.TOKEN_KEY); // Verifica o token
			const userId = decodedToken.id;

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
				reference,
			} = req.body;

			// Verifica se o usuário existe
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!user) {
				return res.status(404).json('User not found');
			}

			// Hash da nova senha, se fornecida
			let hashPassword = user.password;
			if (password) {
				hashPassword = await hash(password, 8);
			}

			// Atualiza os dados do usuário
			const updatedUser = await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
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
					reference,
				},
			});

			return res.json({ user: updatedUser });
		} catch (error) {
			console.error('Erro ao atualizar usuário:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}


}
