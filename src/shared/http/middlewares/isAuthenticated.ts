import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ApplicationError } from '@shared/errors/ApplicationError';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new ApplicationError('Token not provided');

  const parts = authHeader.split(' ');

  if (parts.length !== 2) throw new ApplicationError('Token mismatch');

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer))
    throw new ApplicationError('Token malformatted');

  try {
    verify(token, String(process.env.HASH));

    return next();
  } catch (error) {
    throw new ApplicationError('Invalid Token');
  }
}
