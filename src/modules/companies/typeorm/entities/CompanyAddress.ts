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
  public_place_type: string;

  @Column()
  public_place_name: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  district: string;

  @Column()
  cep: string;

  @Column()
  federative_unit: string;

  @Column()
  city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
