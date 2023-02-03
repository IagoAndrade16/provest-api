import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCourses1675444801715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "courses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "link",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "user_id",
            type: "uuid",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("courses");
  }
}
