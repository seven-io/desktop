import React from 'react';
import {shell} from 'electron';
import {makeStyles} from '@material-ui/core/styles';
import Button, {ButtonProps} from '@material-ui/core/Button';

type ExternalButtonProps = ButtonProps & {
    url: string
}

export const ExternalButton = ({
                                   children,
                                   className,
                                   url,
                                   ...props
                               }: ExternalButtonProps) => {

    const classes = makeStyles({
        link: {
            color: '#fff',
        },
    })();

    return <Button
        className={classes.link}
        onClick={() => shell.openExternal(url)}
        {...props}

    >
        {children}
    </Button>;
};