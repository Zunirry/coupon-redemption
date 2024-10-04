import { UserRepository } from "@/app/api/user/repositories/UserRepository";
import { getDataSource } from "./data-source";
import { CouponRepository } from "@/app/api/coupon/repositories/CouponRepository";
import { User } from "@/app/api/user/domain/entities/User";
import { Coupon } from "@/app/api/coupon/domain/entities/Coupon";
import { CouponService } from "@/app/api/coupon/service/CouponService";
import { UserService } from "@/app/api/user/service/UserService";

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
