import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import Users from '../typeorm/entities/Users';
import IUserCreate from '../interfaces/IUserCreate';
import { hash } from 'bcryptjs';

export default class CreateUserService {
  private repository: UsersRepository;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  public async execute({ name, email, password }: IUserCreate): Promise<Users> {
    // verifica se o usuário já existe
    const userAlreadyExists = await this.repository.findByEmail(email);

    if (userAlreadyExists) throw new ApplicationError('User already exists');

    // criptografa o password do usuário
    const hashedPassword = await hash(password, 10);

    // instância o objeto de usuário
    const user = this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    // salva a instância de usuário no banco de dados
    if (!(await this.repository.save(user)))
      throw new ApplicationError(
        'There was an error trying to save the user instance',
      );

    return user;
  }
}
