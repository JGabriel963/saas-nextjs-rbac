import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirect = request.nextUrl.clone();
  redirect.pathname = "/auth/sign-in";

  const store = await cookies();

  store.delete("token");

  return NextResponse.redirect(redirect);
}
