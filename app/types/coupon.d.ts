import type { UserInterface } from "./user";

export interface CouponResponseApi {
  data: CouponInterface[];
  status: number;
}

export interface CreateCouponResponseApi {
  data: CouponInterface;
  status: number;
}

export interface RedeemCouponResponseApi {
  data: CouponInterface;
  status: number;
}

export interface CouponInterface {
  id: string;
  name: DatumName;
  percentage: number;
  kindOf: string;
  used: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __user__: UserInterface;
}
