import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import router from './routes';
import '@shared/typeorm';
import { ApplicationError } from '@shared/errors/ApplicationError';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

// middleware de tratamento de erros assíncronos
app.use(
  // eslint-disable-next-line
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ApplicationError) {
      return response.status(error.statusCode).json({
        status: 'Application Errror',
        message: error.message,
      });
    }

    return response.status(400).json({
      status: 'error',
      message: error.message,
    });
  },
);

app.listen(process.env.PORT);
