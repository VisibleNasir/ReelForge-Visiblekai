"use client";

import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { signUp } from "~/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await signUp(data);
      if (!result.success) {
        setError(result.error ?? "An error occured during signup");
        return;
      }

      const signUpResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signUpResult?.error) {
        setError(
          "Account created but couldn't sign in automatically. Please try again."
        );
      } else {
        router.push("/user/dashboard");
      }
    } catch {
      setError("An unexpected error occured");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex  max-w-3xl items-center px-4",
        className
      )}
      {...props}
    >
      <div className="w-full">

        <Card className="border-zinc-200 shadow-sm dark:border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Reelforge
            </h1>
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Create an account
            </CardDescription>
            <CardDescription className="text-zinc-500">
              Start your journey with ReelForge today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-zinc-900 text-zinc-900 hover:bg-zinc-800 dark:bg-zinc-400 "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Sign up"}
              </Button>

              <p className="text-center text-sm text-zinc-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
