import { Router } from 'express';
import AuthenticationController from '../controllers/AuthController';

const router = Router();
const controller = new AuthenticationController();

router.post('/', controller.authorize);

export default router;
