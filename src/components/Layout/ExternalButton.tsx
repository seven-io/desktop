import React from 'react';
import {shell} from 'electron';
import Button, {ButtonProps} from '@mui/material/Button'

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
    </Button>;
};
