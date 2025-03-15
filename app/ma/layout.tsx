import useMeUser from "@/common/hooks/use-me-user"
import { UserProvider } from "@/components/providers/user-provider"

export default async function MaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { execMeUser } = useMeUser();
    const result = await execMeUser();

    return (
        <UserProvider value={result}>
            {children}
        </UserProvider>
    )
}