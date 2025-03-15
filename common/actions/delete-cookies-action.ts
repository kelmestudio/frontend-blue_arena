'use server'

import { cookies } from "next/headers"

export default async function deleteCookiesAction() {
    const cookieStore = await cookies()
    cookieStore.delete('token')
    cookieStore.delete('session-code')
    cookieStore.delete('session_name')
}