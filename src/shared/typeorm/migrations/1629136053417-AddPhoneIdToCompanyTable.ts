import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddPhoneIdToCompanyTable1629136053417
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'companies',
      new TableColumn({
        name: 'phone_id',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'companies',
      new TableForeignKey({
        name: 'CompanyPhoneId',
        columnNames: ['phone_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company_phones',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('companies', 'CompanyPhoneId');
    await queryRunner.dropColumn('companies', 'phone_id');
  }
}
