"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordResetSuccessModal } from "@/components/modals/PasswordResetSuccessModal"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    // Add your password reset logic here
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccessPopup(true)
    }, 2000)
  }

  return (
    <>
      <div className="w-full max-w-md bg-[#0F172A]/50 p-[30px] rounded-[24px] border border-solid border-[#1E293B]">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
            <p className="mt-2 text-sm text-gray-300">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
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
                <Label htmlFor="email" className="absolute left-3 top-2 text-xs text-gray-300">
                  Email address
                </Label>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#3282f6] text-white" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send password reset link"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-blue-400 hover:text-blue-300">
              Back to login
            </Link>
          </div>
        </div>
      </div>

      <PasswordResetSuccessModal isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </>
  )
}

