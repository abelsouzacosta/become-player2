import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company_phones')
export default class CompanyPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ddd_telefone_1: string;

  @Column()
  ddd_telefone_2: string;

  @Column()
  ddd_fax: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
