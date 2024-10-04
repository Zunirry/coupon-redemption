import { Coupon } from "@/app/api/coupon/server/domain/entities/Coupon";
import { User } from "@/app/api/user/server/domain/entities/User";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "zunirry",
  password: "test123",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [User, Coupon],
  subscribers: [],
  migrations: [],
});

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
    } catch (err) {
      throw err;
    }
  }
  return AppDataSource;
}
