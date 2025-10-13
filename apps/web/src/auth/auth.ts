import { cookies } from "next/headers";

export async function isAuthenticated() {
  const token = await cookies();

  return !!token.get("token")?.value;
}
