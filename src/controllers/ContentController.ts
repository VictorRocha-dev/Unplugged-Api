import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';
import path from 'path';

export class ContentController {
	// Listar todos os conteúdos
	async index(req: Request, res: Response) {
		try {
			const modulesWithCommentsCount = await prisma.contents.findMany({
				include:{
					modules:{
						select:{
							module_name:true
						}
					},
					comments:{
						select:{
							id:true
						}
					}
					
				}
			});

			const contents = modulesWithCommentsCount.map((content) => ({
				id: content.id,
				content_name: content.contents_name,
				content_type: content.contents_type,
				content_video_url: content.contents_video_url,
				content_article: content.contents_article,
				contents_duration: content.contets_duration,
				content_Module_id: content.modulesId,
				content_Module_name: content.modules.module_name,
				content_comments: content.comments.length,
			}));

			return res.json({ contents });



		} catch (error) {
			console.error('Erro ao buscar os conteúdos:', error);
			return res.status(500).json({ error: 'Ocorreu um erro ao buscar os conteúdos' });
		}
	}
 
	async  responsevideomove(req: Request, res: Response){
		res.send('Video postado');
	}

	async createContent(req: Request, res: Response) {
		const {
			contents_name,
			contents_type,
			contents_video_url,
			contets_duration,
			contents_article,
			
			modulesId
		} = req.body;

		try {
			// Verifica se o módulo associado ao conteúdo existe
			const module = await prisma.modules.findUnique({
				where: { id: modulesId }
			});

			if (!module) {
				return res.status(404).json('Módulo não encontrado');
			}

			// Criação do conteúdo
			const content = await prisma.contents.create({
				data: {
					contents_name,
					contents_type,
					contents_video_url,
					contets_duration,
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

	// Mostrar um vídeo
	async getVideo(req: Request, res: Response) {
		try {
			const videoId = parseInt(req.params.videoId);
			
			const video = await prisma.contents.findUnique({
				where: { id: videoId },
			});
			console.log(video);
			
			if (!video) {
				return res.status(404).json({ error: 'Vídeo não encontrado' });
			}

			const videoPath = video.contents_video_url
				? path.join(__dirname, '../videos/', video.contents_video_url)
				: null;

			if (videoPath !== null) {
				res.sendFile(videoPath);
			} else {
				res.status(404).send('Vídeo não encontrado.');
			}
		} catch (error) {
			console.error('Erro ao entregar vídeo:', error);
			res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Atualizar informações de um conteúdo existente
	async updateContent(req: Request, res: Response) {
		try {
			const contentId = parseInt(req.params.contentId);
			const {
				contents_name,
				contents_type,
				contents_video_url,
				contents_duration,
				contents_article,
				modulesId
			} = req.body;

			const updatedContent = await prisma.contents.update({
				where: { id: contentId },
				data: {
					contents_name,
					contents_type,
					contents_video_url,
					contets_duration: contents_duration,
					contents_article,
					modules: { connect: { id: modulesId } },
				},
			});

			return res.json(updatedContent);
		} catch (error) {
			console.error('Erro ao atualizar o conteúdo:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Excluir um conteúdo específico
	async deleteContent(req: Request, res: Response) {
		try {
			const contentId = parseInt(req.params.contentId);

			await prisma.contents.delete({
				where: { id: contentId },
			});

			return res.json({ message: 'Conteúdo excluído com sucesso' });
		} catch (error) {
			console.error('Erro ao excluir o conteúdo:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}
}
