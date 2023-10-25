import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import {HLR} from '@seven.io/api'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {toString} from '../util/toString'
import {BoolChip} from './BoolChip'
import {CarrierTable} from './Lookup/CarrierTable'

export type TableRowSpreader = {
    nsKey: string
    pairs: any[]
    transEditor?: (k: string, v: any) => string
}

const carrierKeys: (keyof HLR)[] = [
    'current_carrier',
    'original_carrier',
]

export const TableRowSpreader = ({nsKey, pairs, transEditor}: TableRowSpreader) => {
    const {t} = useTranslation(nsKey)

    return <>
        {
            pairs.map(([k, v], i) =>
                <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                        {t(transEditor ? transEditor(k, v) : k)}
                    </TableCell>

                    <TableCell align='right'>
                        {'boolean' === typeof v
                            ? <BoolChip value={v}/>
                            : carrierKeys.includes(k)
                                ? 'object' === typeof v ? <CarrierTable carrier={v}/> : {v}
                                : toString(v)}
                    </TableCell>
                </TableRow>)
        }
    </>
}
