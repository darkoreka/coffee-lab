import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f5d9b8]/60",
    {
        variants: {
            variant: {
                light: "border-2 border-[#deb47f] bg-[#f7e1bc] text-[#2a140f] shadow-[0_12px_35px_rgba(0,0,0,0.35)] hover:bg-[#fdeaca]",
                dark: "border-2 border-[#deb47f] bg-[#4a2b20] text-[#f5d9b8] shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:bg-[#5b3224]"
            },
            size: {
                default: "px-10 py-3.5",
                sm: "px-8 py-3 text-sm",
                lg: "px-12 py-4 text-lg"
            },
        },
        defaultVariants: {
            variant: "light",
            size: "default",
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
