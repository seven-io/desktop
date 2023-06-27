import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {CountryNetwork} from 'sms77-client'
import {getNumberFormatter} from '../../util/numberFormatter'

type NetworkProps = {
    index: number
    network: CountryNetwork
    networks: CountryNetwork[]
}

export const Network = ({index, network, networks}: NetworkProps) => {
    const {t} = useTranslation('pricing')

    return <TableContainer key={index} style={{marginBottom: '1em'}}>
        <Table size='small' aria-label={t('ariaLabels.network')}>
            <TableBody>
                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('mcc')}
                    </TableCell>

                    <TableCell align='right'>
                        {network.mcc}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('mncs')}
                    </TableCell>

                    <TableCell align='right'>
                        {(network.mncs || []).join(',')}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('networkName')}
                    </TableCell>

                    <TableCell align='right'>
                        {network.networkName}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('price')}
                    </TableCell>

                    <TableCell align='right'>
                        {getNumberFormatter().format(network.price)}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('features')}
                    </TableCell>

                    <TableCell align='right'>
                        {network.features.map((f, i) => <Chip key={i} label={t(f)}/>)}
                    </TableCell>
                </TableRow>

                {
                    network.comment ? <TableRow>
                        <TableCell component='th' scope='row'>
                            {t('comment')}
                        </TableCell>

                        <TableCell align='right'>
                            {network.comment}
                        </TableCell>
                    </TableRow> : null
                }
            </TableBody>
        </Table>

        {index === networks.length - 1 ? null : <Divider/>}
    </TableContainer>
}
