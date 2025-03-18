import {PropsWithChildren} from 'react'

export default function Tooltip({children, title}: PropsWithChildren<{title: string}>) {
    return <div className='has-tooltip'>
        <span className='tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8'>{title}</span>
        {children}
    </div>
}