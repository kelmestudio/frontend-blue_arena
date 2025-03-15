'use client'

import { IAuthenticateUser } from "@/@types/@user";
import useUserAuthentication from "@/common/hooks/use-user-authentication";
import { LoginForm } from "@/components/auth/login-form"
import { BlueArenaLogo } from "@/components/BlueArenaLogo"
import { Footer } from "@/components/Footer"
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { execUserAuthentication } = useUserAuthentication();
  
  const { replace } = useRouter();

  const handleSubmit = async ({ username, password }: IAuthenticateUser) => {
    const retrUserAuthentication = await execUserAuthentication({
      username,
      password
    })

    if (retrUserAuthentication) {
      replace("/ma/matches");
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BlueArenaLogo />
        </div>
        <LoginForm onSubmit={handleSubmit} />
      </div>

      <Footer />
    </main>
  )
}

