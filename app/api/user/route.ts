import { NextRequest, NextResponse } from "next/server";
import { initDependencies } from "@/app/server/typeorm/initDependencies";
import { ResponseMessages } from "@/app/server/enums/ResponseMessages";

export async function POST(req: NextRequest) {
  const { userService } = await initDependencies();

  const body = await req.json();

  if (!body) {
    return NextResponse.json({
      data: { message: ResponseMessages.PARAMETER_DOES_NOT_EXIST },
      status: 400,
    });
  }

  try {
    const user = await userService.create(body);
    return NextResponse.json(user, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
