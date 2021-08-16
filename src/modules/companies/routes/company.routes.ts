import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();
const controller = new CompanyController();

router.get('/', controller.list);

router.post('/', controller.create);

router.get('/:id', controller.details);

router.put('/:id', controller.update);

router.put('/update_address/:id', controller.updateAddress);

export default router;
