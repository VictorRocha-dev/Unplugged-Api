import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class ContentController {

	async index(req: Request, res: Response) {
		try {
			const contents = await prisma.contents.findMany();
			return res.json({ contents });
		} catch (error) {
			console.error('Erro ao buscar os conteúdos:', error);
			return res.status(500).json({ error: 'Ocorreu um erro ao buscar os conteúdos' });
		}
	}

	async createContent(req: Request, res: Response) {
		const {
			contents_name,
			contents_type,
			contents_video_url,
			contents_article,
			modulesId
		} = req.body;

		try {
			const module = await prisma.modules.findUnique({
				where: { id: modulesId }
			});

			if (!module) {
				return res.status(404).json('Módulo não encontrado');
			}

			const content = await prisma.contents.create({
				data: {
					contents_name,
					contents_type,
					contents_video_url,
					contents_article,
					modules: { connect: { id: modulesId } },
				},
			});

			return res.json(content);
		} catch (error) {
			console.error('Erro ao criar o conteúdo:', error);
			return res.status(500).json({ error: 'Ocorreu um erro ao criar o conteúdo' });
		}
	}

}
