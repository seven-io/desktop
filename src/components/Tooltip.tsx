import {PropsWithChildren} from 'react'

export default function Tooltip({children, title}: PropsWithChildren<{title: string}>) {
    return <span className='has-tooltip'>
        <span className='tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8 -ml-18 dark:bg-zinc-600 dark:text-white'>{title}</span>
        {children}
    </span>
}