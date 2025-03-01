'use client'

import { ICreateUser } from "@/@types/@user"
import { errorTypes } from "@/common/lib/error-types"
import { createUser } from "@/common/services/create-user"
import { SignupForm } from "@/components/auth/signup-form"
import { BlueArenaLogo } from "@/components/BlueArenaLogo"
import { Footer } from "@/components/Footer"
import toast from "react-hot-toast";

export default function SignupPage() {
  const handleSubmit = ({ name, email, password, username }: ICreateUser) => {
    const promise = createUser({
      name,
      email,
      password,
      username
    });

    promise
      .then(result => {
        console.log(result)

        switch(result) {
          case errorTypes._500.user_nc:
            toast.error('It was not possible to create your account, please try again or contact support.');
            break;
        }
      })
      .catch((result) => {
        toast.error('Ocorreu um erro ao criar o usuário');
      })
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

