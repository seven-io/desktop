import React from 'react';

import {Radios} from './Radios';

export type SignaturePositionProps = {
    onChange: any
    signaturePosition: any
}

export const SignaturePosition = ({onChange, signaturePosition}: SignaturePositionProps) => <Radios
    entries={[{value: 'append', label: 'Append Signature'}, {
        value: 'prepend',
        label: 'Prepend Signature'
    }]}
    label='Signature Positioning'
    name='signaturePosition'
    onChange={onChange}
    value={signaturePosition}
/>;