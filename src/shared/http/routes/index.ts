import { Router } from 'express';
import userRouter from '@modules/authentication/routes/users.routes';
import authRouter from '@modules/authentication/routes/authentication.routes';
import companyRouter from '@modules/companies/routes/company.routes';

const router = Router();

router.get('/', (req, res) => res.status(200).json({ message: 'Hello World' }));

router.use('/users', userRouter);

router.use('/authenticate', authRouter);

router.use('/company', companyRouter);

export default router;
