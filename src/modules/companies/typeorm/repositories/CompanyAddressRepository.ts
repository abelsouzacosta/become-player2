import { EntityRepository, Repository } from 'typeorm';
import CompanyAddress from '../entities/CompanyAddress';

@EntityRepository(CompanyAddress)
export default class CompanyAddressRepository extends Repository<CompanyAddress> {}
