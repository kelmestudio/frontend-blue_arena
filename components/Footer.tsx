import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#00041A] py-8 px-4">
      <div className="max-w-[1024px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
          <p>© 2025 Blue Arena - All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-gray-300 underline">
              Terms of use
            </Link>
            <Link href="/privacy" className="hover:text-gray-300 underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

