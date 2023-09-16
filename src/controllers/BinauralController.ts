import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import path from 'path';

export class BinauralController {

	// Listagem
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
							binaral_autor:true
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

	async listCategoryById(req: Request, res: Response) {
		try {
			const {id} = req.params;
			const binauralCategory = await prisma.binauralCategory.findUnique({
				where:{
					id:Number(id),
				},
				include: {
					binaural: {
						select: {
							id: true,
							binaural_name: true,
							binaural_sound: true,
							binaural_img: true,
							binaural_duration: true,
							binaral_autor:true
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

	// Criação
	async createCategory(req: Request, res: Response) {
		try {
			const { name , images } = req.body;
			const create = await prisma.binauralCategory.create({
				data: {
					name,
					images
				},
			});
			return res.json(create);
		} catch (error) {
			console.error('Erro ao criar categoria de binaurais:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	async createBinaural(req: Request, res: Response) {
		try {
			const {
				binaural_name,
				binaural_sound,
				binaural_img,
				binaral_autor,
				binaural_duration,
				binauralCategoryId,
			} = req.body;

			const create = await prisma.binaural.create({
				data: {
					binaural_name,
					binaural_sound,
					binaural_img,
					binaral_autor,
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

	// Audio
	async getAudio(req: Request, res: Response) {
		try {
			const audioId = parseInt(req.params.audioId);

			const audio = await prisma.binaural.findUnique({
				where: { id: audioId },
			});

			if (!audio) {
				return res.status(404).json({ error: 'Áudio não encontrado' });
			}

			const audioPath = path.join(__dirname, '../audios/binaural', audio.binaural_sound);

			res.sendFile(audioPath);
		} catch (error) {
			console.error('Erro ao entregar áudio:', error);
			res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Favoritos
	async favoriteBinaural(req: Request, res: Response) {
		try {
			const { userId, binauralId } = req.body;

			const favorite = await prisma.binauralFavorite.create({
				data: {
					userId,
					binauralId,
				},
			});

			return res.json(favorite);
		} catch (error) {
			console.error('Erro ao favoritar som binaural:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	async unfavoriteBinaural(req: Request, res: Response) {
		try {
			const { userId, binauralId } = req.params;
			await prisma.binauralFavorite.deleteMany({
				where: {
					userId,
					binauralId:Number(binauralId),
				},
			});

			console.log(userId, binauralId);
			

			return res.json({ message: 'Som binaural desfavoritado com sucesso' });
		} catch (error) {
			console.error('Erro ao desfavoritar som binaural:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}
	async getFavorites(req: Request, res: Response) {
		try{
			const {userId} = req.params;
			const getFavorites = await prisma.binauralFavorite.findMany({
				where:{
					userId
				},
				include: {
					binaural: {
						select: {
							id: true,
							binaural_name: true,
							binaural_sound: true,
							binaural_img: true,
							binaural_duration: true,
							binaral_autor:true
						},
					},
				},

			});
			return res.json(getFavorites);
		} catch (error) {
			console.error('Erro ao desfavoritar som binaural:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
		
	}
	// Update
	async updateCategory(req: Request, res: Response) {
		try {
			const categoryId = parseInt(req.params.categoryId);
			const { name,images } = req.body;

			const updatedCategory = await prisma.binauralCategory.update({
				where: { id: categoryId },
				data: {
					name,
					images,
				},
			});

			return res.json(updatedCategory);
		} catch (error) {
			console.error('Erro ao atualizar categoria de binaurais:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	async updateBinaural(req: Request, res: Response) {
		try {
			const binauralId = parseInt(req.params.binauralId);
			const {
				binaural_name,
				binaural_sound,
				binaural_img,
				binaural_duration,
				binauralCategoryId,
			} = req.body;

			const updatedBinaural = await prisma.binaural.update({
				where: { id: binauralId },
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

			return res.json(updatedBinaural);
		} catch (error) {
			console.error('Erro ao atualizar som binaural:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Delete
	async deleteCategory(req: Request, res: Response) {
		try {
			const categoryId = parseInt(req.params.categoryId);
			

			await prisma.binauralCategory.delete({
				where: { id: categoryId },
			});

			return res.json({ message: 'Categoria excluída com sucesso' });
		} catch (error) {
			console.error('Erro ao excluir categoria de binaurais:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	async deleteBinaural(req: Request, res: Response) {
		try {
			const binauralId = parseInt(req.params.binauralId);

			await prisma.binaural.delete({
				where: { id: binauralId },
			});

			return res.json({ message: 'Som binaural excluído com sucesso' });
		} catch (error) {
			console.error('Erro ao excluir som binaural:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}
}
