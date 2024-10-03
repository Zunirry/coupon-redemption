import { Coupon } from "../domain/entities/Coupon.entity";
import { getDataSource } from "./data-source";
import { CouponRepository } from "./repositories/CouponRepository";

export const initDependencies = async () => {
  const appDataSource = await getDataSource();

  const couponRepository = new CouponRepository(
    appDataSource.getRepository(Coupon)
  );

  return {
    couponRepository,
  };
};
