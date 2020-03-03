import React from 'react';
import {useTranslation} from 'react-i18next';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {BoolChip} from './BoolChip';
import {toString} from '../util/toString';

export type TableRowSpreader = {
    nsKey: string
    pairs: any[]
}

export const TableRowSpreader = ({nsKey, pairs}: TableRowSpreader) => {
    const {t} = useTranslation(nsKey);

    return <>
        {
            pairs.map(([k, v], i) =>
                <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                        {t(k)}
                    </TableCell>

                    <TableCell align='right'>
                        {'boolean' === typeof v
                            ? <BoolChip value={v}/>
                            : toString(v)}
                    </TableCell>
                </TableRow>)
        }
    </>;
};