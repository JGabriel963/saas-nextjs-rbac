import { signInWithGithub } from "@/http/sign-in-with-github";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({
      message: "Github OAuth code was not found.",
      status: 400,
    });
  }

  const { token } = await signInWithGithub({ code });

  const cookiesStore = await cookies();

  cookiesStore.set("token", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  const redirect = request.nextUrl.clone(); // -> http://localhost:3000/api/auth/callback?code='123'
  redirect.pathname = "/"; // -> http://localhost:3000/

  return NextResponse.redirect(redirect);
}
