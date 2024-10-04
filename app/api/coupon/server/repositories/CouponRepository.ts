import { Repository } from "typeorm";
import { ICoupon } from "../domain/models/ICoupon";
import { Coupon } from "../domain/entities/Coupon";

export class CouponRepository {
  private _couponRepository: Repository<Coupon>;

  constructor(couponRepository: Repository<Coupon>) {
    this._couponRepository = couponRepository;
  }

  async create(coupon: ICoupon): Promise<Coupon> {
    const newCoupon = this._couponRepository.create(coupon);

    return this._couponRepository.save(newCoupon);
  }

  async update(
    coupon: Coupon,
    updateData: Partial<ICoupon>
  ): Promise<Coupon | null> {
    Object.assign(coupon, updateData);

    return this._couponRepository.save(coupon);
  }

  async findById(id: ICoupon["userId"]) {
    return await this._couponRepository.findOne({
      where: { id },
    });
  }

  async count(type: ICoupon["kindOf"]) {
    return await this._couponRepository.count({ where: { kindOf: type } });
  }
}
