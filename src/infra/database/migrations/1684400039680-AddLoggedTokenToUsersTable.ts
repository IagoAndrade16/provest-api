import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLoggedTokenToUsersTable1684400039680
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE users ADD COLUMN logged_token varchar(255)"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE users DROP COLUMN logged_token");
  }
}
