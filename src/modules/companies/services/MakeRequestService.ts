import { ApplicationError } from '@shared/errors/ApplicationError';
import axios from 'axios';
import 'dotenv/config';

interface IResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  cnae_fiscal_descricao: string;
  descricao_tipo_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  municipio: string;
}

interface IRequest {
  cnpj: string;
}

export default class MakeRequestService {
  public async execute({ cnpj }: IRequest): Promise<IResponse> {
    try {
      const response = await axios.get(`${process.env.API_ENDPOINT}/${cnpj}`);
      const data = await response.data;

      return data;
    } catch (error) {
      throw new ApplicationError(`Request errro: ${error}`);
    }
  }
}
