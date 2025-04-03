import type {CountryNetwork} from '@seven.io/client'
import {useTranslation} from 'react-i18next'
import {getNumberFormatter} from '../../util/numberFormatter'
import {Table} from '../Table/Table'
import {Divider} from '../Divider'
import {Badge} from '../Badge'
import {TableRow} from '../Table/TableRow'
import {TableHeader} from '../Table/TableHeader'
import {TableCell} from '../Table/TableCell'
import {TableBody} from '../Table/TableBody'

type NetworkProps = {
    index: number
    network: CountryNetwork
    networks: CountryNetwork[]
}

export const Network = ({index, network, networks}: NetworkProps) => {
    const {t} = useTranslation('pricing')

    return <>
        <Table className='mb-4'  key={index}  aria-label={t('ariaLabels.network')}>
            <TableBody>
                <TableRow>
                    <TableHeader  scope='row'>{t('mcc')}</TableHeader>
                    <TableCell align='right'>{network.mcc}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeader scope='row'>{t('mncs')}</TableHeader>
                    <TableCell align='right'>{(network.mncs || []).join(',')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeader  scope='row'>{t('networkName')}</TableHeader>
                    <TableCell align='right'>{network.networkName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeader  scope='row'>{t('price')}</TableHeader>
                    <TableCell align='right'>{getNumberFormatter().format(network.price)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHeader  scope='row'>{t('features')}</TableHeader>
                    <TableCell align='right'>{network.features.map((f, i) => <Badge key={i}>{t(f)}</Badge>)}</TableCell>
                </TableRow>

                {
                    network.comment ? <TableRow>
                        <TableHeader  scope='row'>
                            {t('comment')}
                        </TableHeader>

                        <TableCell align='right'>
                            {network.comment}
                        </TableCell>
                    </TableRow> : null
                }
            </TableBody>
        </Table>

        {index === networks.length - 1 ? null : <Divider/>}
    </>
}
