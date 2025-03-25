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
        onClick={() => window.require('electron').shell.openExternal(url)}
        plain
    >
        {children}
    </Button>
}
