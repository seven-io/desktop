import React from 'react';
import {useTranslation} from 'react-i18next';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Carrier} from 'sms77-client';

export type CarrierTableProps = {
    carrier: Carrier
}

export const CarrierTable = ({carrier}: CarrierTableProps) => {
    const {t} = useTranslation('lookup');

    return <TableContainer>
        <Table>
            <TableBody>{Object.entries(carrier).map(([k, v], i) =>
                <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                        {t(`carrier.${k}`)}
                    </TableCell>

                    <TableCell align='right'>
                        {v}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>;
};