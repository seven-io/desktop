import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import {Carrier} from '@seven.io/api'
import React from 'react'

import {TableRowSpreader} from '../TableRowSpreader'

export type CarrierTableProps = {
    carrier: Carrier
}

export const CarrierTable = ({carrier}: CarrierTableProps) => {
    return <TableContainer>
        <Table size='small'>
            <TableBody>
                <TableRowSpreader
                    nsKey={'lookup'} pairs={Object.entries(carrier)} transEditor={(k, v) => {
                    return 'object' === typeof v ? `Carrier.${k}` : 'carrier'
                }}
                />
            </TableBody>
        </Table>
    </TableContainer>
}
