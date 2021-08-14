import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export default class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  corporate_name: string;

  @Column()
  trade_name: string;

  @Column()
  registration_status: string;

  @Column()
  economic_activity_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
