import { NextRequest, NextResponse } from "next/server";
import { initDependencies } from "@/app/lib/typeorm/initDependencies";
import { ResponseMessages } from "@/app/types/enums/ResponseMessages";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { couponService } = await initDependencies();

  if (!params.id) {
    return NextResponse.json({
      data: { message: ResponseMessages.PARAMETER_DOES_NOT_EXIST },
      status: 400,
    });
  }

  try {
    const coupons = await couponService.getCouponsByUser(params.id);
    return NextResponse.json(coupons, { status: coupons.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { couponService } = await initDependencies();

  if (!params.id) {
    return NextResponse.json({
      data: { message: ResponseMessages.PARAMETER_DOES_NOT_EXIST },
      status: 400,
    });
  }

  try {
    const user = await couponService.create(params.id);
    return NextResponse.json(user, { status: user.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
