import React from 'react';
import {Carrier} from 'sms77-client';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

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