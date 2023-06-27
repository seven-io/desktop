import Button, {ButtonProps} from '@mui/material/Button'
import {shell} from 'electron'
import React from 'react'

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
        onClick={() => shell.openExternal(url)}
        sx={{
            color: '#fff',
        }}
        {...props}
    >
        {children}
    </Button>
}
