import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class ModuleController {

	async index(req: Request, res: Response) {
		try {
			const modules = await prisma.modules.findMany();
			return res.json({ modules });
		} catch (error) {
			console.error('Erro ao buscar os módulos:', error);
			return res.status(500).json({ error: 'Ocorreu um erro ao buscar os módulos' });
		}
	}

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

}
