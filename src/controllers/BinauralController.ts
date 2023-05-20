import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';


export class BinauralController{

	async listBinaural(req: Request , res: Response){
		const binaurals = await prisma.binaural.findMany({
			include:{
				binauralCategory:{
					select:{
						name:true	
					}
				}
			}
		});
		return res.json(binaurals);
	}
	
	async listCategory(req: Request , res: Response){
		const binauralCategory = await prisma.binauralCategory.findMany({
			include:{
				binaural:{
					select:{
						id: true,
						binaural_name: true,
						binaural_sound:true,
						binaural_img: true,
						binaural_duration: true
					}
				}
			}
		});
		return res.json(binauralCategory);
	}

	async createCategory(req: Request , res: Response){
		const { name } = req.body;
		const create  = await prisma.binauralCategory.create({
			data:{
				name
			}
		});
		return res.json(create);
	}

	async createBinaural(req: Request , res: Response){
		const {            
			binaural_name,
			binaural_sound, 
			binaural_img,  
			binaural_duration,
			binauralCategoryId
		} = req.body;
		
		
		
		const create  = await prisma.binaural.create({
			data:{
				binaural_name,
				binaural_sound,
				binaural_img,
				binaural_duration,
				binauralCategory:{
					connect:{id: binauralCategoryId} 
				}
			}
		}); 

		return res.json(create);
	}
	

}