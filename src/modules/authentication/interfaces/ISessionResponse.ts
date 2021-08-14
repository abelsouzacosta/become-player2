import Users from '../typeorm/entities/Users';

export default interface ISessionResponse {
  user: Users;
  token: string;
}
