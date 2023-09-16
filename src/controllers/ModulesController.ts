import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class ModuleController {

	// Listar todos os módulos
	async index(req: Request, res: Response) {
		try {
			const modulesWithContentCount = await prisma.modules.findMany({
				include: {
					contents: {
						select: {
							id: true,
							contents_name:true,
							contents_type:true,
							contents_video_url:true,
							contets_duration:true,
							contents_article: true,
						}
					}
				}
			});

			const modules = modulesWithContentCount.map((module) => ({
				id: module.id,
				module_name: module.module_name,
				module_description: module.module_description,
				contents: module.contents,
				content_count: module.contents.length
			}));

			return res.json({ modules });
		} catch (error) {
			console.error('Erro ao buscar os módulos:', error);
			return res.status(500).json({ error: 'Ocorreu um erro ao buscar os módulos' });
		}
	}

	async listUniqueModule(req: Request, res: Response){
		try{
			const moduleId = parseInt(req.params.moduleId);

			const module = await prisma.modules.findUnique({
				where:{
					id: moduleId,
				},
				include:{
					contents:{
						select:{
							id:true,
							contents_name:true,
							contents_type:true,
							contents_video_url:true,
							contents_article:true,
						}
					}
				}
			});

			if (!module) {
				return res.status(404).json({ error: 'Modulo não encontrado' });
			}

			return res.json(module);
			

		}
		catch (error) {
			console.error('Erro ao entregar vídeo:', error);
			res.status(500).json({ error: 'Erro interno do servidor' });
		}

	}

	// Criar um novo módulo
	async createModule(req: Request, res: Response) {
		const { module_name, module_description } = req.body;

		try {
			const module = await prisma.modules.create({
				data: {
					module_name,
					module_description,
				},
			});

			return res.json(module);
		} catch (error) {
			console.error('Erro ao criar o módulo:', error);
			return res.status(500).json({ error: 'Ocorreu um erro ao criar o módulo' });
		}
	}

	// Atualizar informações de um módulo existente
	async updateModule(req: Request, res: Response) {
		try {
			const moduleId = parseInt(req.params.moduleId);
			const { module_name, module_description } = req.body;

			const updatedModule = await prisma.modules.update({
				where: { id: moduleId },
				data: {
					module_name,
					module_description,
				},
			});

			return res.json(updatedModule);
		} catch (error) {
			console.error('Erro ao atualizar o módulo:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	// Excluir um módulo específico
	async deleteModule(req: Request, res: Response) {
		try {
			const moduleId = parseInt(req.params.moduleId);

			await prisma.modules.delete({
				where: { id: moduleId },
			});

			return res.json({ message: 'Módulo excluído com sucesso' });
		} catch (error) {
			console.error('Erro ao excluir o módulo:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}
}
