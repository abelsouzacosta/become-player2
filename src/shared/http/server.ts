import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import router from './routes';
import '@shared/typeorm';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(process.env.PORT);
