import { UserService } from "@/app/api/user/server/service/UserService";
import { ICoupon } from "../domain/models/ICoupon";
import { CouponRepository } from "../repositories/CouponRepository";
import { ResponseMessages } from "@/app/types/enums/ResponseMessages";
import { generateRandomNumber } from "@/app/lib/random";

export class CouponService {
  private _couponRepository: CouponRepository;
  private _userService: UserService;

  constructor(couponRepository: CouponRepository, userService: UserService) {
    this._couponRepository = couponRepository;
    this._userService = userService;
  }

  async create(userId: string) {
    const user = await this._userService.getById(userId);

    if ("message" in user.data) {
      return {
        data: {
          message: ResponseMessages.USER_NOT_FOUND,
        },
        status: 404,
      };
    }

    const userCoupons = user.data.coupons;

    const activeUserCoupons = userCoupons.filter(
      (coupon) => !coupon.used
    ).length;

    if (activeUserCoupons >= 10) {
      return {
        data: {
          message: ResponseMessages.MAX_COUPONS_REACHED_BY_USER,
        },
        status: 400,
      };
    }

    const randomNumber = generateRandomNumber();
    const kindOf = `${randomNumber}%`;

    const totalKindOfCoupons = await this._couponRepository.countNonUsed(
      kindOf
    );

    if (totalKindOfCoupons >= 10) {
      return {
        data: {
          message: ResponseMessages.MAX_COUPONS_REACHED,
        },
        status: 400,
      };
    }

    const newCoupon: ICoupon = {
      kindOf,
      userId,
      name: `Coupon of ${kindOf}`,
      percentage: randomNumber,
    };

    const result = await this._couponRepository.create(newCoupon);

    return { data: result, status: 201 };
  }

  async getCouponsByUser(userId: string) {
    const user = await this._userService.getById(userId);

    if ("message" in user.data) {
      return {
        data: {
          message: ResponseMessages.USER_NOT_FOUND,
        },
        status: 404,
      };
    }

    const coupons = await this._couponRepository.findByUserId(userId);

    return { data: coupons, status: 200 };
  }

  async redeemCoupon(couponId: string) {
    const coupon = await this._couponRepository.findById(couponId);

    if (!coupon) {
      return {
        data: {
          message: ResponseMessages.COUPON_NOT_FOUND,
        },
        status: 404,
      };
    }

    if (coupon.used) {
      return {
        data: {
          message: ResponseMessages.COUPON_ALREADY_USED,
        },
        status: 400,
      };
    }

    const updatedCoupon = await this._couponRepository.update(coupon, {
      used: true,
    });

    if (!updatedCoupon) {
      return {
        data: {
          message: ResponseMessages.COUPON_NOT_FOUND,
        },
        status: 404,
      };
    }

    return { data: updatedCoupon, status: 201 };
  }
}
