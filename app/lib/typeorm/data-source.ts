import { Coupon } from "@/app/api/coupon/server/domain/entities/Coupon";
import { User } from "@/app/api/user/server/domain/entities/User";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres.railway.internal",
  port: 5432,
  username: "postgres",
  password: "RnXLnoRZmvVKJxSXTPOCeElTIQdvxiiw",
  database: "railway",
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
