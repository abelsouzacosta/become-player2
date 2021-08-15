import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();
const controller = new CompanyController();

router.get('/', controller.index);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().required(),
    },
  }),
  controller.create,
);

export default router;
