import "reflect-metadata";
import { DataSource } from "typeorm";
import { Coupon } from "../domain/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "zunirry",
  password: "test123",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Coupon],
  subscribers: [],
  migrations: [],
});

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
      throw err;
    }
  }
  return AppDataSource;
}
