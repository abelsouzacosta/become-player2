import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class AuthenticationController {
  public async authorize(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const create = new CreateSessionService();

    const session = await create.execute({ email, password });

    return response.status(200).json(session);
  }
}
