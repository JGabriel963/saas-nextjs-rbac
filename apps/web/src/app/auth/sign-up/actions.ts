"use server";

import { z } from "zod";

import { HTTPError } from "ky";
import { redirect } from "next/navigation";
import { signUp } from "@/http/sign-up";

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(" ").length > 1, {
      error: "Please, enter your full name",
    }),
    email: z.email("Please, provide a valid e-mail address."),
    password: z
      .string()
      .min(6, "Please, password must be at least 6 caracters."),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: "Passwords do not match",
    // path: ["password_confirmation"],
  });

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, email, password } = result.data;

  try {
    await signUp({
      name,
      email,
      password,
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
