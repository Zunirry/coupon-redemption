// user.entity.ts

import { Coupon } from "@/app/api/coupon/server/domain/entities/Coupon";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "user",
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons: Coupon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
