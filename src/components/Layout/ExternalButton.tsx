import Button, {type ButtonProps} from '@mui/material/Button'
//import {shell} from 'electron'

type ExternalButtonProps = ButtonProps & {
    url: string
}

export const ExternalButton = ({
                                   children,
                                   className,
                                   url,
                                   ...props
                               }: ExternalButtonProps) => {
    return <Button
        onClick={() => window.require('electron').shell.openExternal(url)}
        sx={{
            color: '#fff',
        }}
        {...props}
    >
        {children}
    </Button>
}
