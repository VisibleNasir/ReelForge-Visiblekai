"use server";

import { hashPassword } from "~/lib/auth";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";

type SignupResult = {
  success: boolean;
  error?: string;
};

export async function signUp(data: SignupFormValues): Promise<SignupResult> {
  const validationResult = signupSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { email, password } = validationResult.data;

  try {
    const { db } = await import("~/server/db");

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        error: "User already exists with this email",
      };
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch {
    return { success: false, error: "An error occured during signup" };
  }
}
