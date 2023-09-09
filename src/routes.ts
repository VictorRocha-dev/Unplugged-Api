// import { Router } from 'express';
// import { UserController } from './controllers/UserController';
// import { AuthController } from './controllers/AuthController';
// import {AuthMiddleware} from '@/middleware/auth';
// import { MeditationController } from './controllers/MeditationController';
// import { BinauralController } from './controllers/BinauralController';
// import { CommentController } from './controllers/CommentsController';
// import { ContentController } from './controllers/ContentController';
// import { ModuleController } from './controllers/ModulesController';
// import { HabitController } from './controllers/HabitsController';


// const userController = new UserController();
// const authController = new AuthController();
// const meditationController = new MeditationController();
// const binauralController = new BinauralController();
// const commentController = new CommentController();
// const moduleController = new ModuleController();
// const contentController = new ContentController();
// const habitController = new HabitController();


// export const router  = Router();

// //user and auth
// router.get('/users' , AuthMiddleware, userController.index);
// router.post('/create' , userController.store);
// router.post('/auth' , authController.authenticate);
// router.put('/user/update' ,  userController.update);


// //meditation
// router.get('/meditations' , meditationController.listMeditation);
// router.get('/meditationsCategory' , meditationController.listCategory);
// router.post('/createMeditationCategory' , meditationController.createCategory);
// router.post('/createMeditation' , meditationController.createMeditation);
// router.get('/meditations/:audioId', meditationController.getAudio);

// //binaural
// router.get('/binaurals' , binauralController.listBinaural);
// router.get('/binauralCategory' , binauralController.listCategory);
// router.post('/createBinauralCategory' , binauralController.createCategory);
// router.post('/createBinaural' , binauralController.createBinaural);
// router.get('/binaurals/:audioId', binauralController.getAudio);
// router.post('/binaural/favorite', binauralController.favoriteBinaural);
// router.delete('/binaural/unfavorite', binauralController.unfavoriteBinaural);

// // comments
// router.post('/add-comment', commentController.addComment);
// router.get('/get-comments', commentController.index);
// router.post('/comments/:commentId/like', commentController.likeComment);


// // Rotas para o módulo
// router.get('/modules', moduleController.index);
// router.post('/modules', moduleController.createModule);

// // Rotas para o conteúdo
// router.get('/contents', contentController.index);
// router.post('/contents', contentController.createContent);
// router.get('/contents/:videoId', contentController.getVideo);

// //habitos 
// router.post('/habits', habitController.createHabit);

// router.post('/completeHabit/:habitId', habitController.completeHabit);

// router.get('/habits/today/', habitController.getHabitsForToday); 
// router.get('/completedHabits', habitController.getCompletedHabits);

