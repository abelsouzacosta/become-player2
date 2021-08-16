import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyPhone from '../typeorm/entities/CompanyPhone';
import CompanyPhoneRepository from '../typeorm/repositories/CompanyPhoneRepository';

interface ICreateCompanyPhone {
  ddd_telefone_1: string;
  ddd_telefone_2: string;
  ddd_fax: string;
}

export default class CreateCompanyPhoneService {
  private repository: CompanyPhoneRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyPhoneRepository);
  }

  public async execute({
    ddd_telefone_1,
    ddd_telefone_2,
    ddd_fax,
  }: ICreateCompanyPhone): Promise<CompanyPhone> {
    // cria a instancia de contatos telefonicos
    const phones = this.repository.create({
      ddd_telefone_1,
      ddd_telefone_2,
      ddd_fax,
    });

    // salva a instancia no banco de dados da aplicação
    if (!(await this.repository.save(phones)))
      throw new ApplicationError(
        'There was an error trying to create the phone instance',
      );

    return phones;
  }
}
