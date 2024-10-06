import { initDependencies } from "@/app/lib/typeorm/initDependencies";
import { ResponseMessages } from "@/app/types/enums/ResponseMessages";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { couponService } = await initDependencies();

  const { id: couponId } = params;

  if (!couponId) {
    return NextResponse.json({
      data: { message: ResponseMessages.NOT_ID_RECEIVED },
      status: 400,
    });
  }

  try {
    const updatedCoupon = await couponService.redeemCoupon(couponId);

    if (!updatedCoupon) {
      return NextResponse.json({
        data: { message: ResponseMessages.COUPON_NOT_FOUND },
        status: 404,
      });
    }

    return NextResponse.json(updatedCoupon, { status: updatedCoupon.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
