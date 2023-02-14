import * as dotenv from "dotenv";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

dotenv.config();

console.log(process.env.NODE_ENV);

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: "localhost",
      database:
        process.env.NODE_ENV === "test"
          ? "provest_test"
          : defaultOptions.database,
    })
  );
};
