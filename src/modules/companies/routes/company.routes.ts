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

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      razao_social: Joi.string(),
      nome_fantasia: Joi.string(),
      cnae_fiscal_descricao: Joi.string(),
      cnpj: Joi.string(),
      descricao_situacao_cadastral: Joi.string(),
    },
  }),
  controller.update,
);

export default router;
