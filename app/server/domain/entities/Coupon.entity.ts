import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { Customer } from "./Customer.entity"

@Entity({
  name: "coupon",
})
export class Coupon {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //   @OneToOne(() => Customer)
  //   @JoinColumn()
  //   customer: Customer

  @Column()
  name: string;

  @Column()
  percentage: number;

  @Column()
  kindOf: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
