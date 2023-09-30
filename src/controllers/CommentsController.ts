import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class CommentController {

	async index(req: Request , res: Response){
		const comments = await prisma.comments.findMany();
		return res.json({comments});
	}

	
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

	async likeComment(req: Request, res: Response) {
		const { commentId } = req.params;

		try {
			const comment = await prisma.comments.update({
				where: { id: parseInt(commentId) },
				data: {
					comments_likes: {
						increment: 1,
					},
				},
			});

			return res.json(comment);
		} catch (error) {
			console.error('Error liking comment:', error);
			return res.status(500).json({ error: 'An error occurred while liking the comment' });
		}
	}

	async searchCommentsByContentsId(req: Request, res: Response) {
		const { contentsId } = req.params;

		try {
			const comments = await prisma.comments.findMany({
				where: {
					contentsId: parseInt(contentsId),
				},

				include:{
					User:{
						select:{
							name: true,
						}
					}
				}
			});

			return res.json({ comments });
		} catch (error) {
			console.error('Erro ao buscar comentários:', error);
			return res.status(500).json({ error: 'Erro ao buscar comentários' });
		}

	}

}
