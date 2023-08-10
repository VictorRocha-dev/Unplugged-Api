import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class BinauralController {
	// Listar todos os binaurais com suas categorias
	async listBinaural(req: Request, res: Response) {
		try {
			const binaurals = await prisma.binaural.findMany({
				include: {
					binauralCategory: {
						select: {
							name: true,
						},
					},
				},
			});
			return res.json(binaurals);
		} catch (error) {
			console.error('Erro ao listar binaurais:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Listar todas as categorias de binaurais com seus detalhes
	async listCategory(req: Request, res: Response) {
		try {
			const binauralCategory = await prisma.binauralCategory.findMany({
				include: {
					binaural: {
						select: {
							id: true,
							binaural_name: true,
							binaural_sound: true,
							binaural_img: true,
							binaural_duration: true,
						},
					},
				},
			});
			return res.json(binauralCategory);
		} catch (error) {
			console.error('Erro ao listar categorias de binaurais:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Criar nova categoria de binaurais
	async createCategory(req: Request, res: Response) {
		try {
			const { name } = req.body;
			const create = await prisma.binauralCategory.create({
				data: {
					name,
				},
			});
			return res.json(create);
		} catch (error) {
			console.error('Erro ao criar categoria de binaurais:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Criar novo binaural
	async createBinaural(req: Request, res: Response) {
		try {
			const {
				binaural_name,
				binaural_sound,
				binaural_img,
				binaural_duration,
				binauralCategoryId,
			} = req.body;

			const create = await prisma.binaural.create({
				data: {
					binaural_name,
					binaural_sound,
					binaural_img,
					binaural_duration,
					binauralCategory: {
						connect: { id: binauralCategoryId },
					},
				},
			});

			return res.json(create);
		} catch (error) {
			console.error('Erro ao criar binaural:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}
}
