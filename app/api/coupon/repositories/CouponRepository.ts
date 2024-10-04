import { Repository } from "typeorm";
import { ICoupon } from "../domain/models/ICoupon";
import { Coupon } from "../domain/entities/Coupon";

export class CouponRepository {
  private _couponRepository: Repository<Coupon>;

  constructor(couponRepository: Repository<Coupon>) {
    this._couponRepository = couponRepository;
  }

  async create(coupon: ICoupon): Promise<Coupon> {
    console.log("coupon: ", coupon);
    const newCoupon = this._couponRepository.create(coupon);
    console.log("newCoupon: ", newCoupon);

    return this._couponRepository.save(newCoupon);
  }

  async count(type: ICoupon["kindOf"]) {
    return await this._couponRepository.count({ where: { kindOf: type } });
  }
}
