import React from 'react';
import {useTranslation} from 'react-i18next';
import {HLR} from 'sms77-client';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {toString} from '../util/toString';
import {BoolChip} from './BoolChip';
import {CarrierTable} from './Lookup/CarrierTable';

export type TableRowSpreader = {
    nsKey: string
    pairs: any[]
    transEditor?: (k: string) => string
}

const carrierKeys: string[] = ['current_carrier' as keyof HLR, 'original_carrier' as keyof HLR];

export const TableRowSpreader = ({nsKey, pairs, transEditor}: TableRowSpreader) => {
    const {t} = useTranslation(nsKey);

    return <>
        {
            pairs.map(([k, v], i) =>
                <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                        {t(transEditor ? transEditor(k) : k)}
                    </TableCell>

                    <TableCell align='right'>
                        {'boolean' === typeof v
                            ? <BoolChip value={v}/>
                            : carrierKeys.includes(k)
                                ? <CarrierTable carrier={v}/>
                                : toString(v)}
                    </TableCell>
                </TableRow>)
        }
    </>;
};