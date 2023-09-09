import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '@/env';

export class AuthController {

	
	async authenticate(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			// Busca o usuário pelo email
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			// Verifica se o usuário existe
			if (!user) {
				return res.status(401).json({ error: 'User not found' });
			}

			// Compara a senha fornecida com a senha do usuário
			const isPasswordValid = await compare(password, user.password);

			// Verifica a validade da senha
			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Invalid password' });
			}

			// Gera um token de autenticação
			const token = sign({ id: user.id }, env.TOKEN_KEY, { expiresIn: '190d' });

			// Extrai o ID do usuário
			const { id } = user;

			// Retorna os dados do usuário e o token de autenticação
			return res.json({ user: { id, email }, token });
		} catch (error) {
			console.error('Erro na autenticação:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	}


	async userAuthentication(req: Request, res: Response) {
		try {
			
			const userId = req.user.id; 

			
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}


			return res.json({ message: 'Acesso autorizado', user });
		} catch (error) {
			console.error('Erro na rota protegida:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	}
}	