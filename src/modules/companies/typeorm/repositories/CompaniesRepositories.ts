import { EntityRepository, Repository } from 'typeorm';
import Companies from '../entities/Companies';

@EntityRepository(Companies)
export default class CompaniesRepository extends Repository<Companies> {}
