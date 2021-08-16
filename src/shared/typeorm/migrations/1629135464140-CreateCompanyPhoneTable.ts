import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompanyPhoneTable1629135464140
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_phones',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'ddd_telefone_1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ddd_telefone_2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ddd_fax',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('company_phones');
  }
}
