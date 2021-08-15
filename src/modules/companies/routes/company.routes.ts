import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();
const controller = new CompanyController();

router.get('/', controller.index);

router.post('/', controller.create);

export default router;
