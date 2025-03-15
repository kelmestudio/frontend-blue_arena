import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import MatchForm from "../matches/match-form"

interface NewMatchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewMatchModal({ isOpen, onClose }: NewMatchModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#0F172A] border border-[#1E293B]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-white text-center">Create a match</AlertDialogTitle>
          {/* <AlertDialogDescription className="text-gray-300">
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <MatchForm />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="text-white bg-transparent border-[#1E293B] hover:bg-gray-200 w-full">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

