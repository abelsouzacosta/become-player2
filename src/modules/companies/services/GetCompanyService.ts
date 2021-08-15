import { ApplicationError } from '@shared/errors/ApplicationError';
import axios from 'axios';
import 'dotenv/config';
import IAxiosResponse from '../interfaces/IAxiosResponse';
import IGetCompany from '../interfaces/IGetCompany';

export default class GetCompanyService {
  public async execute({ cnpj_number }: IGetCompany): Promise<IAxiosResponse> {
    try {
      const response = await axios.get(
        `${process.env.API_ENDPOINT}/${cnpj_number}`,
      );
      const data = await response.data;

      const {
        cnpj,
        razao_social,
        nome_fantasia,
        descricao_situacao_cadastral,
        cnae_fiscal_descricao,
        descricao_tipo_logradouro,
        logradouro,
        bairro,
        cep,
        municipio,
        complemento,
        numero,
        uf,
      } = data;

      return {
        cnpj,
        razao_social,
        nome_fantasia,
        descricao_situacao_cadastral,
        cnae_fiscal_descricao,
        descricao_tipo_logradouro,
        logradouro,
        bairro,
        cep,
        municipio,
        complemento,
        numero,
        uf,
      };
    } catch (error) {
      throw new ApplicationError(`Company not found`);
    }
  }
}
