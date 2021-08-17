import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();
const controller = new CompanyController();

router.use(isAuthenticated);

router.get('/', controller.list);

router.post('/', controller.create);

router.get('/:id', controller.details);

router.put('/:id', controller.update);

router.put('/update_address/:id', controller.updateAddress);

router.put('/update_phones/:id', controller.updatePhones);

router.delete('/:id', controller.delete);

export default router;
