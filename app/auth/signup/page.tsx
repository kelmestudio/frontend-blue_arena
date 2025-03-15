'use client'

import { ICreateUser } from "@/@types/@user"
import useUserAuthentication from "@/common/hooks/use-user-authentication"
import { useUserCreation } from "@/common/hooks/use-user-creation"

import { SignupForm } from "@/components/auth/signup-form"
import { BlueArenaLogo } from "@/components/BlueArenaLogo"
import { Footer } from "@/components/Footer"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const { execUserCreation } = useUserCreation();
  const { execUserAuthentication } = useUserAuthentication();

  const { replace } = useRouter();

  const handleSubmit = async ({ name, email, password, username }: ICreateUser) => {
    const retrUserCreation = await execUserCreation({ name, email, password, username });

    if (retrUserCreation && retrUserCreation.id) {
      const retrUserAuthentication = await execUserAuthentication({
        username,
        password
      })

      if (retrUserAuthentication) {
        replace("/ma/matches");
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BlueArenaLogo />
        </div>
        <SignupForm onSubmit={handleSubmit} />
      </div>

      <Footer />
    </main>
  )
}

