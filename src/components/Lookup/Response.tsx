import React from 'react';
import {useTranslation} from 'react-i18next';
import {HLR} from 'sms77-client';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';

import {BoolChip} from '../BoolChip';
import {CarrierTable} from './CarrierTable';
import {toString} from '../../util/toString';

export type ResponseProps = {
    pairs: any[]
}

export const Response = ({pairs}: ResponseProps) => {
    const {t} = useTranslation('lookup');
    const carrierKeys: string[] = ['current_carrier' as keyof HLR, 'original_carrier' as keyof HLR];

    return <TableContainer>
        <Table>
            <caption>{t('response')}</caption>

            <TableBody>{pairs.map(([k, v], i) =>
                <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                        {t(k)}
                    </TableCell>

                    <TableCell align='right'>
                        {'boolean' === typeof v
                            ? <BoolChip value={v}/>
                            : carrierKeys.includes(k)
                                ? <CarrierTable carrier={v}/>
                                : toString(v)}
                    </TableCell>
                </TableRow>
            )}</TableBody>
        </Table>
    </TableContainer>;
};