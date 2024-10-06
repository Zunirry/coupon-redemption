/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { products } from "@/app/lib/products";
import {
  CouponResponseApi,
  CreateCouponResponseApi,
  RedeemCouponResponseApi,
} from "@/app/types/coupon";
import { Product } from "@/components/product";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { getDiscount } from "@/app/lib/getDiscount";
import { twMerge } from "tailwind-merge";
import { UserInterface } from "@/app/types/user";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CartItem = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const router = useRouter();

  const [user, setUser] = useState<UserInterface>();
  const [couponId, setCouponId] = useState<string | null>(null);
  const [couponPercentage, setCouponPercentage] = useState<string | undefined>(
    undefined
  );
  const [couponDiscount, setCouponDiscount] = useState<number | undefined>(
    undefined
  );

  const {
    execute: getCoupons,
    data: coupons,
    isLoading: couponsLoading,
  } = useApi<CouponResponseApi>({
    method: "GET",
    url: `coupon/user/${user?.id}`,
  });

  const { execute: redeemCoupon, isLoading: redeemLoading } =
    useApi<RedeemCouponResponseApi>({
      method: "PATCH",
      url: `coupon/${couponId}`,
    });

  const {
    execute: createCoupon,
    data: createData,
    isLoading: createLoading,
    error: createError,
  } = useApi<CreateCouponResponseApi>({
    method: "POST",
    url: `coupon/user/${user?.id}`,
  });

  const handlePayment = async () => {
    if (couponDiscount && couponPercentage) await redeemCoupon();

    try {
      const response = await createCoupon();
      Swal.fire({
        title: "You have purchased the product",
        text: "You have purchased the product successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok!",
      }).then(() => {
        Swal.fire({
          title: `You got a ${response?.data?.kindOf} off coupon`,
          text: "You have purchased the product successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/products");
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      Swal.fire({
        title: "You have purchased the product",
        text: "You have purchased the product successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok!",
      }).then(() => router.push("/products"));
    }
  };

  useEffect(() => {
    if (!createError) {
    }
  }, [createError, createData]);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, []);

  useEffect(() => {
    if (user) {
      getCoupons();
    }
  }, [user]);

  useEffect(() => {
    if (couponId) {
      const couponFound = coupons?.data.find(
        (coupon) => coupon.id === couponId
      );

      setCouponDiscount(couponFound?.percentage);
      setCouponPercentage(couponFound?.kindOf);
    }
  }, [couponId]);

  const selectedProduct = products.find((product) => product.id === id);

  if (!selectedProduct) {
    return (
      <div className="h-screen justify-center items-center  w-full flex">
        <p className="font-semibold text-2xl">Not product selected yet</p>
      </div>
    );
  }

  return (
    <div className="h-screen mx-5 items-center justify-center flex">
      <div className="flex justify-between items-start gap-10">
        <div className="w-2/3 flex justify-center items-center">
          <Product product={selectedProduct} />
        </div>
        <div className="w-1/3 flex flex-col gap-5">
          <div className="bg-white shadow-lg py-5 px-4 rounded-lg">
            <div className="py-3 space-y-4">
              <h2 className="text-lg font-semibold">
                Redeem your coupon here for get a discount
              </h2>
              <select
                className="w-full h-[40px] bg-gray-200"
                onChange={(e) => setCouponId(e.target.value)}
              >
                <option hidden>Select coupon</option>

                {coupons &&
                  Array.isArray(coupons.data) &&
                  coupons.data
                    .filter((coupon) => !coupon?.used)
                    .map((coupon: any, index: number) => (
                      <option key={index + 1} value={coupon.id}>
                        {coupon.name}
                      </option>
                    ))}
                <option key={0} value={0}>
                  No coupon
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-center shadow-lg bg-white rounded-lg py-2 px-3">
            {couponPercentage && couponDiscount ? (
              <>
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-semibold">Discount:</p>
                  <p className="font-bold">{couponPercentage}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <p className="text-lg font-semibold">Total:</p>
                  <p className="font-bold">
                    ${getDiscount(selectedProduct.price, couponDiscount)}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex gap-4 items-center">
                <p className="text-lg font-semibold">Total:</p>
                <p className="font-bold">${selectedProduct.price}</p>
              </div>
            )}
            <button
              className={twMerge(
                couponsLoading || redeemLoading || createLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 cursor-pointer",
                " font-bold py-2 rounded-lg w-full"
              )}
              disabled={couponsLoading || redeemLoading}
              onClick={handlePayment}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
