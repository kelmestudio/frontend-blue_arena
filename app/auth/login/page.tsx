import { LoginForm } from "@/components/auth/login-form"
import { BlueArenaLogo } from "@/components/BlueArenaLogo"
import { Footer } from "@/components/Footer"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BlueArenaLogo />
        </div>
        <LoginForm />
      </div>

      <Footer />
    </main>
  )
}

