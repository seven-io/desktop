import React from 'react';
import TextField from '@material-ui/core/TextField';

export type SignatureProps = {
    signature: any
    onChange: any
}

export const Signature = ({onChange, signature}: SignatureProps) => {
    return <TextField
        fullWidth
        label='Signature added to all outgoing messages'
        multiline
        name='signature'
        onChange={onChange}
        rows={3}
        value={signature}
    />;
};
