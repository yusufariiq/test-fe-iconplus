import * as React from "react"
import { cn } from "../../utils/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-[#296377] text-white hover:bg-[#18A2BA]",
      outline: "border border-[#296377] text-white bg-transparent hover:bg-[#273F4F]/10",
      ghost: "text-white hover:bg-white/30",
    }

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-4",
      lg: "px-8 py-3 text-lg",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }