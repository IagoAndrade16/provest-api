import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Testmigration1674726720579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "test",
        columns: [
          {
            name: "test_field",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("test");
  }
}
