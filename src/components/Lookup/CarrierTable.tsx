import type {Carrier} from '@seven.io/client'
import {TableRowSpreader} from '../TableRowSpreader'
import {Table, TableBody} from '../catalyst/table'

type CarrierTableProps = {
    carrier: Carrier
}

export const CarrierTable = ({carrier}: CarrierTableProps) => {
    return <Table>
        <TableBody>
            <TableRowSpreader
                nsKey={'lookup'} pairs={Object.entries(carrier)} transEditor={(k, v) => {
                return 'object' === typeof v ? `Carrier.${k}` : 'carrier'
            }}
            />
        </TableBody>
    </Table>
}
