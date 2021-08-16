import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyAddressRepository from '../typeorm/repositories/CompanyAddressRepository';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import CompanyAddress from '../typeorm/entities/CompanyAddress';

interface IUpdateCompanyAddress {
  id: string;
  descricao_tipo_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  municipio: string;
}

export default class UpdateCompanyAddressService {
  private companyAddressRepository: CompanyAddressRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyAddressRepository = getCustomRepository(
      CompanyAddressRepository,
    );
    this.companyRepository = getCustomRepository(CompanyRepository);
  }

  public async execute({
    id,
    descricao_tipo_logradouro,
    logradouro,
    numero,
    complemento,
    bairro,
    cep,
    uf,
    municipio,
  }: IUpdateCompanyAddress): Promise<CompanyAddress> {
    const companyExists = await this.companyRepository.findById(id);

    if (!companyExists) throw new ApplicationError('Company not found');

    // busca pelo endereço da empresa
    const address = await this.companyAddressRepository.findById(
      companyExists.address_id,
    );

    if (!address) throw new ApplicationError('Company Address not found');

    address.descricao_tipo_logradouro = descricao_tipo_logradouro;
    address.logradouro = logradouro;
    address.numero = numero;
    address.complemento = complemento;
    address.bairro = bairro;
    address.cep = cep;
    address.uf = uf;
    address.municipio = municipio;

    if (!(await this.companyAddressRepository.save(address)))
      throw new ApplicationError(
        'There was an error trygin to update Company Address instance',
      );

    return address;
  }
}
