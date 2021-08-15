import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company_address')
export default class CompanyAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao_tipo_logradouro: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  uf: string;

  @Column()
  municipio: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
