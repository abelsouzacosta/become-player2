import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyAddress from '../typeorm/entities/CompanyAddress';
import CompanyAddressRepository from '../typeorm/repositories/CompanyAddressRepository';
import ICompanyAddressCreate from '../interfaces/ICompanyAddressCreate';

export default class CreateCompanyAddressService {
  private repository: CompanyAddressRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyAddressRepository);
  }

  public async execute({
    descricao_tipo_logradouro,
    logradouro,
    complemento,
    bairro,
    numero,
    municipio,
    cep,
    uf,
    company_id,
  }: ICompanyAddressCreate): Promise<CompanyAddress> {
    // cria a instância de um endedreço
    const address = this.repository.create({
      public_place_type: descricao_tipo_logradouro,
      public_place_name: logradouro,
      number: numero,
      complement: complemento,
      district: bairro,
      cep,
      federative_unit: uf,
      city: municipio,
      company_id,
    });

    // salva a instância no banco de dados
    if (!(await this.repository.save(address)))
      throw new ApplicationError(
        'There was an errro trying to create the address instance',
      );

    return address;
  }
}
