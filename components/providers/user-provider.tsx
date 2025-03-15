'use client'

import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { createContext, useContext } from 'react'

export const UserContext = createContext<any>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children, value }: { children: React.ReactNode, value: any }) {
  const { push } = useRouter();

  if (!value) {
    deleteCookie('token');
    deleteCookie('session-code');
    deleteCookie('session_name');
    push('/');
    return;
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}