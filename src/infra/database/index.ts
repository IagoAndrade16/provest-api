import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  logging: true,
  entities: ["./src/domain/modules/**/entities/*.ts"],
  migrations: ["./src/infra/database/migrations/*.ts"],
  migrationsTableName: "migrations",
});
