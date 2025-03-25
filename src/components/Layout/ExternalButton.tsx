import {Button} from '../catalyst/button'
import {PropsWithChildren} from 'react'

type ExternalButtonProps = PropsWithChildren<{
    url: string
}>

export const ExternalButton = ({
                                   children,
                                   url,
                               }: ExternalButtonProps) => {
    return <Button
        outline
        //className='text-white'
        onClick={() => window.require('electron').shell.openExternal(url)}
    >
        {children}
    </Button>
}
