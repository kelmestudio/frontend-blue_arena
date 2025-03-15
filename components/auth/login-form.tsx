"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IAuthenticateUser } from "@/@types/@user"

const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  // rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({ onSubmit }: { onSubmit: (data: IAuthenticateUser) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="w-full max-w-md bg-[#0F172A]/50 p-[30px] rounded-[24px] border border-solid border-[#1E293B]">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome back.</h2>
          <p className="mt-2 text-sm text-gray-400">
            New to Blue Arena?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                id="username"
                {...register("username")}
                type="text"
                className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${errors.username ? "border-red-500" : ""
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
                className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${errors.password ? "border-red-500" : ""
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

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <Checkbox
                id="remember-me"
                {...register("rememberMe")}
                className="border-[#374151] data-[state=checked]:bg-blue-500"
                disabled={isLoading}
              />
              <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                Remember me
              </Label>
            </div> */}

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="text-blue-500 hover:text-blue-400">
                Trouble logging in?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#3282f6] hover:bg-blue-600 text-white" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  )
}

