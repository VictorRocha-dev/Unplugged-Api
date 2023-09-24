import { Request, Response } from 'express';
import { prisma } from '@/utils/prisma';

export class HabitController {

	async createHabit(req: Request, res: Response) {
		const { userId, name, description, daysOfWeek , color } = req.body;
	
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
					color,
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
	
	async getHabitsByDayOfWeek(req: Request, res: Response) {
		try {
			const userId = req.params.userId as string;
			const dayOfWeek = parseInt(req.params.dayOfWeek);

			const habitsByDayOfWeek = await prisma.habit.findMany({
				where: {
					userId: userId,
					habitSchedules: {
						some: {
							dayOfWeek: dayOfWeek,
						},
					},
				},
				include: {
					habitLogs: true, // Inclua os registros de hábitos relacionados
				},
			});

			return res.json(habitsByDayOfWeek);
		} catch (error) {
			console.error('Error fetching habits by day of week:', error);
			return res.status(500).json({ error: 'An error occurred while fetching habits by day of week' });
		}
	}
	
	async getCompletedHabitsByDayOfWeek(req: Request, res: Response) {
		try {
			const userId = req.params.userId as string;
			const dayOfWeek = parseInt(req.params.dayOfWeek);

			const completedHabitsByDayOfWeek = await prisma.habitLog.findMany({
				where: {
					habit: {
						userId: userId,
					},
					completed: true,
					dayOfWeek: dayOfWeek,
				},
				include: {
					habit: true, // Inclua os detalhes do hábito relacionado
				},
			});

			return res.json(completedHabitsByDayOfWeek);
		} catch (error) {
			console.error('Error fetching completed habits by day of week:', error);
			return res.status(500).json({ error: 'An error occurred while fetching completed habits by day of week' });
		}
	}


	async getCompletedHabits(req: Request, res: Response) {
		const { userId } = req.params;
	
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
			const userId = req.params.userId as string;
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
		const { dayOfWeek, userId , habitId} = req.body;
	
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

	async deleteHabit(req: Request, res: Response) {
		try {
			const habitId = parseInt(req.params.habitId);

			// Exclua registros relacionados nas tabelas HabitSchedule e HabitLog
			await prisma.habitSchedule.deleteMany({
				where: {
					habitId: habitId,
				},
			});

			await prisma.habitLog.deleteMany({
				where: {
					habitId: habitId,
				},
			});

			await prisma.habit.delete({
				where: {
					id: habitId,
				},
			});

			return res.json({ message: 'Hábito excluído com sucesso' });
		} catch (error) {
			console.error('Erro ao excluir o hábito:', error);
			return res.status(500).json({ error: 'Erro interno do servidor' });
		}
	}

	async getHabitsForWeek(req: Request, res: Response) {
		try {
			const userId = req.params.userId as string;

			const currentDayOfWeek = new Date().getDay();

			const daysRemainingInWeek = 7 - currentDayOfWeek;

			const currentDate = new Date();
			const nextWeekStartDate = new Date(currentDate);
			nextWeekStartDate.setDate(currentDate.getDate() + daysRemainingInWeek);

			const habitsForWeek = await prisma.habit.findMany({
				where: {
					userId: userId,
					habitSchedules: {
						some: {
							dayOfWeek: {
								in: Array.from({ length: 7 }, (_, i) => (i + currentDayOfWeek) % 7), 
							},
						},
					},
				},
				include: {
					habitLogs: true, 
				},
			});

			return res.json(habitsForWeek);
		} catch (error) {
			console.error('Error fetching habits for the week:', error);
			return res.status(500).json({ error: 'An error occurred while fetching habits for the week' });
		}
	}


}
	



