import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyAddress from '../typeorm/entities/CompanyAddress';
import CompanyAddressRepository from '../typeorm/repositories/CompanyAddressRepository';

interface ICreateCompanyAddress {
  descricao_tipo_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  municipio: string;
}

export default class CreateCompanyAddressService {
  private repository: CompanyAddressRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyAddressRepository);
  }

  public async execute({
    descricao_tipo_logradouro,
    logradouro,
    numero,
    complemento,
    bairro,
    cep,
    uf,
    municipio,
  }: ICreateCompanyAddress): Promise<CompanyAddress> {
    // cria a instância do endereço
    const address = this.repository.create({
      descricao_tipo_logradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      municipio,
    });

    // salva a instancia
    if (!(await this.repository.save(address)))
      throw new ApplicationError(
        'there was an error trying to creater address instance',
      );

    return address;
  }
}
