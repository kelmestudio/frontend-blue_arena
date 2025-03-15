'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ICreateMach } from "@/@types/@match"
import useMatchCreation from "@/common/hooks/use-match-creation"
import { cn } from "@/common/lib/utils"

const matchSchema = z.object({
    game_title: z.string()
        .min(3, { message: "Game must be at least 3 characters long" })
        .max(35, { message: "Game must be at most 35 characters long" }),
    date:
        z.coerce.date({
            required_error: "Please select a date and time",
            invalid_type_error: "That's not a date!",
        })
            .min(new Date(), { message: "Date must be in the future" }),
    type: z.coerce.number({
        message: 'Please select a match type'
    }),
    prize:
        z.coerce.number({
            message: 'Please enter a valid number'
        })
            .int('Expected an integer number')
            .min(1, { message: "Prize must be at least 1B" })
            .max(800, { message: "Prize must be at most 800B" }),
})

type LoginFormValues = z.infer<typeof matchSchema>

export default function MatchForm() {
    const [isLoading, setIsLoading] = useState(false)
    const { execMatchCreation } = useMatchCreation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<LoginFormValues>({
        resolver: zodResolver(matchSchema),
    })

    const prize = watch("prize")

    const onSubmit = ({ date, game_title, prize, type }: ICreateMach) => {
        const result = execMatchCreation({ date, game_title, prize, type });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <Input
                        id="game_title"
                        {...register("game_title")}
                        type="text"
                        className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${errors.game_title ? "border-red-500" : ""
                            }`}
                        placeholder="Choose a game"
                        disabled={isLoading}
                    />
                    <Label htmlFor="game_title" className="absolute left-3 top-2 text-xs text-gray-400">
                        Game name
                    </Label>
                    {errors.game_title && <p className="mt-1 text-xs text-red-500">{errors.game_title.message}</p>}
                </div>

                <div className="relative">
                    <Input
                        id="date"
                        {...register("date")}
                        type="datetime-local"
                        className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${errors.date ? "border-red-500" : ""
                            }`}
                        placeholder="At least 8 characters"
                        disabled={isLoading}
                    />
                    <Label htmlFor="date" className="absolute left-3 top-2 text-xs text-gray-400">
                        Match date
                    </Label>
                    {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
                </div>

                <div className="relative">
                    <select
                        id="type"
                        {...register("type")}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            `h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${errors.type ? "border-red-500" : ""}`,
                        )}
                        disabled={isLoading}
                    >
                        <option value="">Select a match type</option>
                        <option value="1">Solo</option>
                        <option value="2">Team</option>
                    </select>
                    <Label htmlFor="date" className="absolute left-3 top-2 text-xs text-gray-400">
                        Select the game type
                    </Label>
                    {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>}
                </div>

                <div className="relative">
                    <Input
                        id="prize"
                        {...register("prize")}
                        type="text"
                        className={`h-[62px] bg-[#1e293b] border-[#374151] text-white pt-7 ${errors.prize ? "border-red-500" : ""}`}
                        placeholder="999"
                        disabled={isLoading}
                    />
                    <Label htmlFor="date" className="absolute left-3 top-2 text-xs text-gray-400">
                        Prize value
                    </Label>
                    {errors.prize && <p className="mt-1 text-xs text-red-500">{errors.prize.message}</p>}
                </div>
            </div>

            <Button type="submit" className="w-full bg-[#3282f6] hover:bg-blue-600 text-white" disabled={isLoading || prize <= 0}>
                {isLoading ? "Creating in..." : `Send ${prize || 0}€ and create`}
            </Button>
        </form>
    )
}