import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';


export class MeditationController{

	async listMeditation(req: Request , res: Response){
		const meditations = await prisma.meditation.findMany({
			include:{
				meditation_category:{
					select:{
						name:true	
					}
				}
			}
		});
		return res.json(meditations);
	}
	
	async listCategory(req: Request , res: Response){
		const meditationsCategory = await prisma.meditationCategory.findMany({
			include:{
				meditation:{
					select:{
						id: true,
						meditation_name: true,
						meditation_sound:true,
						meditation_img: true,
						meditation_duration: true
					}
				}
			}
		});
		return res.json(meditationsCategory);
	}

	async createCategory(req: Request , res: Response){
		const { name } = req.body;
		const create  = await prisma.meditationCategory.create({
			data:{
				name
			}
		});
		return res.json(create);
	}

	async createMeditation(req: Request , res: Response){
		const {            
			meditation_name,
			meditation_sound, 
			meditation_img,  
			meditation_duration,
			meditationCategoryId
		} = req.body;


		
		
		
		const create  = await prisma.meditation.create({
			data:{
				meditation_name,
				meditation_sound,
				meditation_img,
				meditation_duration,
				meditation_category:{
					connect:{id: meditationCategoryId} 
				}
			}
		}); 

		return res.json(create);
	}
	

}