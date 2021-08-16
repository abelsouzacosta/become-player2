import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import CompanyAddress from './CompanyAddress';
import CompanyPhone from './CompanyPhone';

@Entity('companies')
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  razao_social: string;

  @Column()
  nome_fantasia: string;

  @Column()
  descricao_situacao_cadastral: string;

  @Column()
  cnae_fiscal_descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  address_id: string;

  @Column()
  phone_id: string;

  @OneToOne(() => CompanyAddress)
  @JoinColumn({ name: 'address_id' })
  address: CompanyAddress;

  @OneToOne(() => CompanyPhone)
  @JoinColumn({ name: 'phone_id' })
  phone: CompanyPhone;
}
