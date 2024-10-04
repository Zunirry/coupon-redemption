// coupon.entity.ts

import { User } from "@/app/api/user/domain/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "coupon",
})
export class Coupon {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  percentage: number;

  @Column()
  kindOf: string;

  @Column({ default: false })
  used: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.coupons, { eager: true })
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
