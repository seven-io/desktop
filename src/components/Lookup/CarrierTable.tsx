import React from 'react';
import {Carrier} from 'sms77-client';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import {TableRowSpreader} from '../TableRowSpreader';

export type CarrierTableProps = {
    carrier: Carrier
}

export const CarrierTable = ({carrier}: CarrierTableProps) => {
    return <TableContainer>
        <Table size='small'>
            <TableBody>
                <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(carrier)} transEditor={(k, v) => {
                    return 'object' === typeof v ? `Carrier.${k}` : 'carrier';
                }}/>
            </TableBody>
        </Table>
    </TableContainer>;
};
