import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCompanyIdToCompanyAddressTable1628969536659
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company_address',
      new TableColumn({
        name: 'company_id',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'company_address',
      new TableForeignKey({
        name: 'CompanyAddress',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('company_address', 'CompanyAddress');
    await queryRunner.dropColumn('company_address', 'company_id');
  }
}
