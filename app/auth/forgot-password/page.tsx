import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { BlueArenaLogo } from "@/components/BlueArenaLogo"
import { Footer } from "@/components/Footer"

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BlueArenaLogo />
        </div>
        <ForgotPasswordForm />
      </div>

      <Footer />
    </main>
  )
}

