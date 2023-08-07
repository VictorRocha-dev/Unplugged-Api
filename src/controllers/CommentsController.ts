import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class CommentController {
	
	async addComment(req: Request, res: Response) {
		const {contentsId, userId , comments_text, comments_rating, comments_likes } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},

		});

		if (!user) {
			return res.status(404).json('Usuário não encontrado');
		}

		const content = await prisma.contents.findUnique({
			where: {
				id: contentsId,
			},
		});

		if (!content) {
			return res.status(404).json('Conteúdo não encontrado');
		}

		const comment = await prisma.comments.create({
			data: {
				comments_text: comments_text,
				comments_rating:comments_rating,
				comments_likes:comments_likes,
				User: {
					connect: { id: userId},
				},
				contents: {
					connect: { id: contentsId},
				},
			},
		});


		

		return res.json(comment);
	}
}



