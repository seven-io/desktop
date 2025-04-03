import type React from 'react'
import clsx from 'clsx'

export function TableHead({className, ...props}: React.ComponentPropsWithoutRef<'thead'>) {
    return <thead {...props} className={clsx(className, 'text-zinc-500 dark:text-zinc-400')}/>
}