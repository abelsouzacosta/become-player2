import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import ISessionCreate from '../interfaces/ISessionCreate';
import ISessionResponse from '../interfaces/ISessionResponse';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

export default class CreateSessionService {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  public async execute({
    email,
    password,
  }: ISessionCreate): Promise<ISessionResponse> {
    // verifica se o usuário existe
    const user = await this.repository.findByEmail(email);

    if (!user) throw new ApplicationError('User not found');

    // verifica se a senha está correta
    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) throw new ApplicationError('Password incorrect');

    // gerando o token de autenticaçõa
    const token = sign({}, String(process.env.HASH), {
      expiresIn: 86400,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
