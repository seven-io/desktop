import React from 'react'
import clsx from 'clsx'

export default function NavbarLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
    return <span {...props} className={clsx(className, 'truncate')} />
}
