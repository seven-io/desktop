import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import {SmsMessage} from '@seven.io/api'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {getNumberFormatter} from '../../util/numberFormatter'
import {SmsDump} from '../../util/sendSms'
import {BaseHistory} from '../BaseHistory/BaseHistory'
import {BoolChip} from '../BoolChip'

export const History = () => {
    const {t} = useTranslation('history')

    const rowHandler = (row: SmsMessage, i: number) => {
        return <React.Fragment key={i}>
            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('to')}
                </TableCell>

                <TableCell align='right'>
                    {row.recipient}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('text')}
                </TableCell>

                <TableCell align='right'>
                    {row.text}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('success')}
                </TableCell>

                <TableCell align='right'>
                    <BoolChip value={row.success}/>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('from')}
                </TableCell>

                <TableCell align='right'>
                    {row.sender}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('encoding')}
                </TableCell>

                <TableCell align='right'>
                    {row.encoding}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('parts')}
                </TableCell>

                <TableCell align='right'>
                    {row.parts}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('price')}
                </TableCell>

                <TableCell align='right'>
                    {getNumberFormatter().format(row.price)}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    <Tooltip title={t('tooltips.message') as string}>
                        <span>{t('messages')}</span>
                    </Tooltip>
                </TableCell>

                <TableCell align='right'>
                    {
                        Array.isArray(row.messages)
                            ? row.messages.join(' ')
                            : JSON.stringify(row.messages)
                    }
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('id')}
                </TableCell>

                <TableCell align='right'>
                    {row.id}
                </TableCell>
            </TableRow>
        </React.Fragment>
    }

    return <BaseHistory<SmsDump>
        path='res.messages'
        rowHandler={rowHandler}
        storeKey={'history'}
    />
}
