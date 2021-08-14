import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompanies1628951560702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'corporate_name',
            type: 'varchar',
          },
          {
            name: 'trade_name',
            type: 'varchar',
          },
          {
            name: 'registration_status',
            type: 'varchar',
          },
          {
            name: 'economic_activity_type',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
