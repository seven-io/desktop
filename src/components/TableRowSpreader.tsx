import type {HLR} from '@seven.io/client'
import {useTranslation} from 'react-i18next'
import {toString} from '../util/toString'
import {BoolChip} from './BoolChip'
import {CarrierTable} from './Lookup/CarrierTable'
import {TableRow} from './Table/TableRow'
import {TableHeader} from './Table/TableHeader'
import {TableCell} from './Table/TableCell'

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
                    <TableHeader  scope='row'>
                        {t(transEditor ? transEditor(k, v) : k)}
                    </TableHeader>

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
