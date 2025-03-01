"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ICreateUser } from "@/@types/@user"

const signupSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm({ onSubmit }: { onSubmit: (data: ICreateUser) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  return (
    <div className="w-full max-w-md bg-[#0F172A]/50 p-[30px] rounded-[24px] border border-solid border-[#1E293B]">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:text-blue-400">
              Log in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
          <div className="relative">
              <Input
                id="name"
                {...register("name")}
                type="text"
                className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Your full name"
                disabled={isLoading}
              />
              <Label htmlFor="name" className="absolute left-3 top-2 text-xs text-gray-400">
                Full Name
              </Label>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <Input
                id="email"
                {...register("email")}
                type="email"
                className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Your email address"
                disabled={isLoading}
              />
              <Label htmlFor="email" className="absolute left-3 top-2 text-xs text-gray-400">
                Email address
              </Label>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <Input
                id="username"
                {...register("username")}
                type="text"
                className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Choose a username"
                disabled={isLoading}
              />
              <Label htmlFor="username" className="absolute left-3 top-2 text-xs text-gray-400">
                Username
              </Label>
              {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
            </div>

            <div className="relative">
              <Input
                id="password"
                {...register("password")}
                type="password"
                className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="At least 8 characters"
                disabled={isLoading}
              />
              <Label htmlFor="password" className="absolute left-3 top-2 text-xs text-gray-400">
                Password
              </Label>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#3282f6] hover:bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-xs text-center text-gray-400">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-500 hover:text-blue-400">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-500 hover:text-blue-400">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

