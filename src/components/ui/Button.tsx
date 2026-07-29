'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }
>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
      secondary:
        'bg-sage-200 text-charcoal-900 hover:bg-sage-300 active:bg-sage-400',
      outline:
        'border border-charcoal-200 text-charcoal-900 hover:bg-charcoal-50',
      ghost: 'text-charcoal-700 hover:bg-charcoal-50',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
