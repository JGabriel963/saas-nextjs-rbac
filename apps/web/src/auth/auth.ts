import { getProfile } from "@/http/get-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isAuthenticated() {
  const token = await cookies();

  return !!token.get("token")?.value;
}

export async function auth() {
  const store = await cookies();

  const token = store.get("token")?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const { user } = await getProfile();

    return { user };
  } catch {}

  redirect("/api/auth/sign-out");
}
