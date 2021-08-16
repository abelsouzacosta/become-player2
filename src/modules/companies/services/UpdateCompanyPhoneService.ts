import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import CompanyPhoneRepository from '../typeorm/repositories/CompanyPhoneRepository';
import CompanyPhone from '../typeorm/entities/CompanyPhone';

interface IUpdateCompanyPhone {
  id: string;
  ddd_telefone_1: string;
  ddd_telefone_2: string;
  ddd_fax: string;
}

export default class UpdateCompanyPhoneService {
  private repository: CompanyPhoneRepository;

  private companyRepository: CompanyRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyPhoneRepository);
    this.companyRepository = getCustomRepository(CompanyRepository);
  }

  public async execute({
    id,
    ddd_telefone_1,
    ddd_telefone_2,
    ddd_fax,
  }: IUpdateCompanyPhone): Promise<CompanyPhone> {
    // verifica se a empresa existe
    const company = await this.companyRepository.findById(id);

    if (!company) throw new ApplicationError('Company not found');

    // busca pelos telefones
    const phones = await this.repository.findById(company.phone_id);

    if (!phones) throw new ApplicationError('Phone instance not found');

    phones.ddd_telefone_1 = ddd_telefone_1;
    phones.ddd_telefone_2 = ddd_telefone_2;
    phones.ddd_fax = ddd_fax;

    // salva a instancia no banco de dados
    if (!(await this.repository.save(phones)))
      throw new ApplicationError(
        'There was an error trying to update phones instance',
      );

    return phones;
  }
}
