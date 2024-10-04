import { getDataSource } from "./data-source";
import { CouponRepository } from "@/app/api/coupon/server/repositories/CouponRepository";
import { Coupon } from "@/app/api/coupon/server/domain/entities/Coupon";
import { CouponService } from "@/app/api/coupon/server/service/CouponService";
import { UserRepository } from "@/app/api/user/server/repositories/UserRepository";
import { User } from "@/app/api/user/server/domain/entities/User";
import { UserService } from "@/app/api/user/server/service/UserService";

export const initDependencies = async () => {
  const appDataSource = await getDataSource();
  /**
   * Repositories
   */
  const userRepository = new UserRepository(appDataSource.getRepository(User));
  const couponRepository = new CouponRepository(
    appDataSource.getRepository(Coupon)
  );
  /**
   * Services
   */
  const userService = new UserService(userRepository);
  const couponService = new CouponService(couponRepository, userService);
  /**
   * Return Services
   */
  return {
    couponService,
    userService,
  };
};
