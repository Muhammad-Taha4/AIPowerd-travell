import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'destructive'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    const variants = {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/80 border-transparent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        outline: "text-foreground border-input",
        destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 border-transparent",
    }
    return (
        <div
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
            {...props}
        />
    )
}

export { Badge }
