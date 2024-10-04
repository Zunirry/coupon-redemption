import { UserService } from "../../user/service/UserService";
import { ICoupon } from "../domain/models/ICoupon";
import { CouponRepository } from "../repositories/CouponRepository";
import { ResponseMessages } from "@/app/server/enums/ResponseMessages";

export class CouponService {
  private _couponRepository: CouponRepository;
  private _userService: UserService;

  constructor(couponRepository: CouponRepository, userService: UserService) {
    this._couponRepository = couponRepository;
    this._userService = userService;
  }

  async create(coupon: ICoupon) {
    const user = await this._userService.getById(coupon.userId);

    if ("message" in user.data)
      return {
        data: {
          message: ResponseMessages.USER_NOT_FOUND,
        },
        status: 404,
      };

    const userCoupons = user.data.coupons.length;

    if (userCoupons >= 10) {
      return {
        data: {
          message: ResponseMessages.MAX_COUPONS_REACHED_BY_USER,
        },
        status: 400,
      };
    }

    const totalKindOfCoupons = await this._couponRepository.count(
      coupon.kindOf
    );

    if (totalKindOfCoupons >= 10) {
      return {
        data: {
          message: ResponseMessages.MAX_COUPONS_REACHED,
        },
        status: 400,
      };
    }

    coupon.userId = user.data.id;

    const result = await this._couponRepository.create(coupon);

    return { data: result, status: 2001 };
  }
}
