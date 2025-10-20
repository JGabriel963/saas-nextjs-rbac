"use client";

import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "./actions";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { AlertTriangle, Loader2 } from "lucide-react";

import githubIcon from "@/assets/github.svg";
import { FormEvent, useState, useTransition } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithGithub } from "../actions";

export function SignInForm() {
  //   const [{ success, message, errors }, formAction, isPending] = useActionState(
  //     signInWithEmailAndPassword,
  //     { success: false, message: null, errors: null }
  //   );
  const router = useRouter();
  const searchParams = useSearchParams();

  const [{ success, message, errors }, handleSignIn, isPending] = useFormState(
    signInWithEmailAndPassword,
    undefined,
    () => {
      router.push("/");
    }
  );

  return (
    <div className="space-y-4">
      <form onSubmit={handleSignIn} className="space-y-4">
        {success === false && message && (
          <Alert variant={"destructive"}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed</AlertTitle>
            <AlertDescription>
              <p> {message} </p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="text"
            id="email"
            defaultValue={searchParams.get("email") ?? ""}
          />
          {errors?.email && (
            <span className="text-xs font-medium text-red-500 dark:text-red-400">
              {" "}
              {errors?.email?.[0]}{" "}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {errors?.password && (
            <span className="text-xs font-medium text-red-500 dark:text-red-400">
              {" "}
              {errors?.password?.[0]}
            </span>
          )}

          <Link
            href="/auth/forgot-password"
            className="block text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Sign in with e-mail"
          )}
        </Button>

        <Button variant={"link"} className="w-full" size={"sm"} asChild>
          <Link href={"/auth/sign-up"}>Create new account</Link>
        </Button>
      </form>
      <Separator />

      <form action={signInWithGithub}>
        <Button type="submit" variant={"outline"} className="w-full">
          <Image
            src={githubIcon}
            className="size-4 mr-2 invert dark:invert-0"
            alt=""
          />
          Sign in with Github
        </Button>
      </form>
    </div>
  );
}
