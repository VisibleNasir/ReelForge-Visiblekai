"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { signUp } from "~/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const SignupForm = ({className, ...props}:React.ComponentPropsWithoutRef<"div">) => {
  const [error , setError] = useState<string | null>(null);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit , formState: { errors } }  = useForm<SignupFormValues>({resolver: zodResolver(signupSchema)});
  
  const onSubmit = async (data : SignupFormValues)=>{
    try{
      setIsSubmitting(true);
      setError(null);

      const result = await signUp(data);
      if(!result.success){
        setError(result.error || "An error occurred during signup")
        return;
      }

      const signUpResult = await signIn("credentials",{
        email: data.email,
        password: data.password,
        redirect:false,
      });

      if(signUpResult?.error){
        setError("Account created but couldnt sign in automatically. Please try again. ")
      }else{
        router.push("/dashboard"); 
      }

    }catch(e){
      setError("An unexpected ")
    }finally{
      setIsSubmitting(false);
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Enter your email below to create a new account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input id="password" type="password" required {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              {error && <p className="text-sm text-red-500 rounded-md bg-red-50 p-3 ">{error}</p>}
            </div>    
          
        </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Signup"}
            </Button>
              <p className="inline-block text-sm ">Already have an account? 
              <Link href="/login"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            > Log in</Link></p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignupForm
