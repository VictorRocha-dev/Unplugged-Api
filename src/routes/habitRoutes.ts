import { Router } from 'express';
import { HabitController } from '../controllers/HabitsController';

const router = Router();
const habitController = new HabitController();

router.post('/', habitController.createHabit);
router.post('/complete', habitController.completeHabit);
router.get('/today/:userId', habitController.getHabitsForToday);
router.get('/completed', habitController.getCompletedHabits);
router.delete('/:habitId' , habitController.deleteHabit);
router.get('/week/:userId' , habitController.getHabitsForWeek);

export default router;
