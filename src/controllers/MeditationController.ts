import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import path from 'path';

export class MeditationController {

	// Listar todas as meditações com suas categorias
	async listMeditation(req: Request, res: Response) {
		try {
			const meditations = await prisma.meditation.findMany({
				include: {
					meditation_category: {
						select: {
							name: true
						}
					}
				}
			});
			return res.json(meditations);
		} catch (error) {
			console.error('Erro ao listar meditações:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Listar todas as categorias de meditações com seus detalhes
	async listCategory(req: Request, res: Response) {
		try {
			const meditationsCategory = await prisma.meditationCategory.findMany({
				include: {
					meditation: {
						select: {
							id: true,
							meditation_name: true,
							meditation_sound: true,
							meditation_img: true,
							meditation_duration: true
						}
					}
				}
			});
			return res.json(meditationsCategory);
		} catch (error) {
			console.error('Erro ao listar categorias de meditações:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Criar nova categoria de meditações
	async createCategory(req: Request, res: Response) {
		const { name } = req.body;
		try {
			const create = await prisma.meditationCategory.create({
				data: {
					name
				}
			});
			return res.json(create);
		} catch (error) {
			console.error('Erro ao criar categoria de meditações:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Criar nova meditação
	async createMeditation(req: Request, res: Response) {
		const {
			meditation_name,
			meditation_sound,
			meditation_img,
			Meditation_autor,
			meditation_duration,
			meditationCategoryId
		} = req.body;

		try {
			const create = await prisma.meditation.create({
				data: {
					meditation_name,
					meditation_sound,
					meditation_img,
					Meditation_autor,
					meditation_duration,
					meditation_category: {
						connect: { id: meditationCategoryId }
					}
				}
			});

			return res.json(create);
		} catch (error) {
			console.error('Erro ao criar meditação:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Recuperar áudio de meditação
	async getAudio(req: Request, res: Response) {
		try {
			const audioId = parseInt(req.params.audioId);

			const audio = await prisma.meditation.findUnique({
				where: { id: audioId },
			});

			if (!audio) {
				return res.status(404).json({ error: 'Áudio não encontrado' });
			}

			const audioPath = path.join(__dirname, '../audios/meditation', audio.meditation_sound);

			res.sendFile(audioPath);
		} catch (error) {
			console.error('Erro ao entregar áudio:', error);
			res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Atualizar informações de uma meditação existente
	async updateMeditation(req: Request, res: Response) {
		try {
			const meditationId = parseInt(req.params.meditationId);
			const {
				meditation_name,
				meditation_sound,
				meditation_img,
				meditation_duration,
			} = req.body;

			const updatedMeditation = await prisma.meditation.update({
				where: { id: meditationId },
				data: {
					meditation_name,
					meditation_sound,
					meditation_img,
					meditation_duration,
				},
			});

			return res.json(updatedMeditation);
		} catch (error) {
			console.error('Erro ao atualizar meditação:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Excluir uma meditação específica
	async deleteMeditation(req: Request, res: Response) {
		try {
			const meditationId = parseInt(req.params.meditationId);

			await prisma.meditation.delete({
				where: { id: meditationId },
			});

			return res.json({ message: 'Meditação excluída com sucesso' });
		} catch (error) {
			console.error('Erro ao excluir meditação:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}
}
