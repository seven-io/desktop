import React, {forwardRef} from 'react'
import * as Headless from '@headlessui/react'
import {Link} from '../Link'
import clsx from 'clsx'
import {TouchTarget} from '../Button'
import {Avatar, AvatarProps} from './Avatar'

export default forwardRef(function AvatarButton(
    {
        src,
        square = false,
        initials,
        alt,
        className,
        ...props
    }: AvatarProps &
        (Omit<Headless.ButtonProps, 'as' | 'className'> | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>),
    ref: React.ForwardedRef<HTMLElement>
) {
    let classes = clsx(
        className,
        square ? 'rounded-[20%]' : 'rounded-full',
        'relative inline-grid focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500'
    )

    return 'href' in props ? (
        <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
            <TouchTarget>
                <Avatar src={src} square={square} initials={initials} alt={alt} />
            </TouchTarget>
        </Link>
    ) : (
        <Headless.Button {...props} className={classes} ref={ref}>
            <TouchTarget>
                <Avatar src={src} square={square} initials={initials} alt={alt} />
            </TouchTarget>
        </Headless.Button>
    )
})