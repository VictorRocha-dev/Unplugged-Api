import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class HabitController {

	async createHabit(req: Request, res: Response) {
		const { userId, name, description, daysOfWeek } = req.body;
	
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
	
			if (!user) {
				return res.status(404).json('Usuário não encontrado');
			}
	
			const habit = await prisma.habit.create({
				data: {
					name,
					description,
					userId,
					habitSchedules: {
						create: daysOfWeek.map((day: number) => ({ dayOfWeek: day })),
					},
				},
				include: {
					habitSchedules: true,
				},
			});
	
			return res.json(habit);
		} catch (error) {
			console.error('Error creating habit:', error);
			return res.status(500).json({ error: 'An error occurred while creating the habit' });
		}
	}
	

	async getCompletedHabits(req: Request, res: Response) {
		const { userId } = req.query;
	
		try {
			const completedHabits = await prisma.habitLog.findMany({
				where: {
					habit: {
						userId: userId as string,
					},
					completed: true,
				},
				include: {
					habit: true,
				},
			});
	
			const habits = completedHabits.map(habitLog => habitLog.habit);
	
			return res.json(habits);
		} catch (error) {
			console.error('Error fetching completed habits:', error);
			return res.status(500).json({ error: 'An error occurred while fetching completed habits' });
		}
	}

	async getHabitsForToday(req: Request, res: Response) {
		try {
			const userId = req.query.userId as string;
			const currentDayOfWeek = new Date().getDay();
	
			const habitsForToday = await prisma.habit.findMany({
				where: {
					userId: userId,
					habitSchedules: {
						some: {
							dayOfWeek: currentDayOfWeek,
						},
					},
				},
				include: {
					habitLogs: true, // Inclua os registros de hábitos relacionados
				},
			});
	
			const currentDate = new Date();
			const nextWeek = new Date(currentDate);
			nextWeek.setDate(nextWeek.getDate() + 7);
	
			const habitsForNextWeek = habitsForToday.filter((habit) => {
				const lastCompletionDate = habit.habitLogs?.[0]?.date;
				return !lastCompletionDate || lastCompletionDate < nextWeek;
			});
	
			return res.json(habitsForNextWeek);
		} catch (error) {
			console.error('Error fetching habits for today:', error);
			return res.status(500).json({ error: 'An error occurred while fetching habits for today' });
		}
	}

	async completeHabit(req: Request, res: Response) {
		const habitId = parseInt(req.params.habitId);
		const { dayOfWeek, userId } = req.body;
	
		try {
			const habit = await prisma.habit.findFirst({
				where: {
					id: habitId,
					userId: {
						equals: userId,
					},
					habitSchedules: {
						some: {
							dayOfWeek: dayOfWeek,
						},
					},
				},
				include: {
					habitLogs: {
						where: {
							dayOfWeek: dayOfWeek,
						},
					},
				},
			});
	
			if (!habit) {
				return res.status(404).json('Hábito não encontrado');
			}
	
			const currentDate = new Date();
			const currentDayOfWeek = currentDate.getDay();
	
			// Verifique se já existe um registro de conclusão para a data atual e mesmo dia da semana
			const existingHabitLog = habit.habitLogs.find(log =>
				log.date.toDateString() === currentDate.toDateString()
			);
	
			if (existingHabitLog) {
				return res.status(400).json('Hábito já foi concluído hoje');
			}
	
			// Verifique se a data atual é igual ou após a próxima ocorrência desse dia da semana
			const daysUntilNextDayOfWeek = (7 + dayOfWeek - currentDayOfWeek) % 7;
			const nextDayOfWeek = new Date(currentDate);
			nextDayOfWeek.setDate(currentDate.getDate() + daysUntilNextDayOfWeek);
	
			if (currentDate >= nextDayOfWeek) {
				const habitLog = await prisma.habitLog.create({
					data: {
						habitId,
						dayOfWeek,
						completed: true,
						date: new Date(),
					},
				});
	
				return res.json(habitLog);
			} else {
				return res.status(400).json('Ainda não é possível concluir o hábito para este dia');
			}
		} catch (error) {
			console.error('Error completing habit:', error);
			return res.status(500).json({ error: 'An error occurred while completing the habit' });
		}
	}
	



}