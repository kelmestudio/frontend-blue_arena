'use client';

import { Button } from "@/components/ui/button";
import { IMatch } from "@/@types/@match";
import { completePayment } from "@/common/actions/complete-payment";
import { toast } from "react-hot-toast";

import { useRouter } from 'next/navigation'
import { useState } from "react";

export function CompletePaymentButton({ match }: { match?: IMatch }) {
    const [isLoading, setIsLoading] = useState(false);
    if (!match) {
        return null;
    }

    const { refresh, push } = useRouter();

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const result = await completePayment(match);

            if (result.approval_url) {
                push(result.approval_url);
                return;
            }
          
            throw 'não foi possível gerar o link de pagamento'
        } catch (error) {
            toast.error('Failed to complete payment');
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isLoading}
            className="w-full bg-[#047857] hover:bg-[#047857]"
        >
            Complete Payment
        </Button>
    );
}