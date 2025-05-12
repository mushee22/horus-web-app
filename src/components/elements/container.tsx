import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    className?: string
}

export default function Container({ children, className = '' }: Props) {
    return (
        <section className={cn('container px-5 max-w-7xl mx-auto py-10 pb-[86px]', className)}>
            {children}
        </section>
    )
}
