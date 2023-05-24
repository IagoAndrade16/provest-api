import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAvatarImageToUsersTable1684833239957
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "avatar_url",
        type: "varchar",
        length: "255",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "avatar_url");
  }
}
