import { Router } from 'express';
import { HabitController } from '../controllers/HabitsController';

const router = Router();
const habitController = new HabitController();

router.post('/', habitController.createHabit);
router.post('/complete/:habitId', habitController.completeHabit);
router.get('/today', habitController.getHabitsForToday);
router.get('/completed', habitController.getCompletedHabits);
router.delete('/:habitId' , habitController.deleteHabit);
router.get('/week' , habitController.getHabitsForWeek);

export default router;
