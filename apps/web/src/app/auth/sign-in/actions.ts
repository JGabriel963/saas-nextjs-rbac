"use server";

import { z } from "zod";

import { signInWithPassword } from "@/http/sign-in-with-password";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signInSchema = z.object({
  email: z.email("Please, provide a valid e-mail address."),
  password: z.string().min(6, "Please, password must be at least 6 caracters."),
});

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { email, password } = result.data;

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json();

      return { success: false, message, errors: null };
    }

    console.log(error);

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }

  redirect("/");
}
