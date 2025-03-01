import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

interface PasswordResetSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PasswordResetSuccessModal({ isOpen, onClose }: PasswordResetSuccessModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#0F172A] border border-[#1E293B]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-white">Password Reset Link Sent</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the
            instructions to reset your password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="bg-white text-[#0F172A] hover:bg-gray-200">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

