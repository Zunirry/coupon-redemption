import { Repository } from "typeorm";
import { Coupon } from "@/app/server/domain/entities/Coupon.entity";
import { ICoupon } from "../../domain/models/ICoupon";

export class CouponRepository {
  private _respository: Repository<Coupon>;

  constructor(respository: Repository<Coupon>) {
    this._respository = respository;
  }

  async create(coupon: ICoupon): Promise<Coupon> {
    const newCoupon = this._respository.create(coupon);
    return this._respository.save(newCoupon);
  }
}
