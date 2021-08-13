import { EntityRepository, Repository } from 'typeorm';
import Users from '../entities/Users';

@EntityRepository(Users)
export default class UsersRepository extends Repository<Users> {
  // encontra um usuário pelo email cadastrado na aplicação
  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
