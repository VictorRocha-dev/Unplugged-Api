 
import { Router } from 'express';
import { CommentController } from '../controllers/CommentsController';

const router = Router();
const commentController = new CommentController();

router.post('/add', commentController.addComment);
router.get('/:contentsId', commentController.searchCommentsByContentsId);
router.post('/:commentId/like', commentController.likeComment);
router.delete('/:commentId/user/:userId' , commentController.deleteComment);
router.put('/:commentId/:userId' , commentController.editComment);

export default router;
 