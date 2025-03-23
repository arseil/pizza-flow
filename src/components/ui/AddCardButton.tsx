import { Button } from "@/components/ui/shadcn/button";

interface AddCardButtonProps {
    onClick: () => void;
}

export function AddCardButton({ onClick }: AddCardButtonProps) {
    return (
        <Button
            variant="outline"
            size="sm"
            className="absolute w-8 h-18 right-[-4%] top-16 -translate-y-1/2 flex flex-col items-center gap-1 bg-white border-gray-200 hover:bg-gray-50 py-3 px-2"
            onClick={() => {
                onClick();
            }}
        >
            <span className="text-sm [writing-mode:vertical-rl] rotate-180">Card</span>
            <span className="text-lg font-normal">+</span>
        </Button>
    );
} 