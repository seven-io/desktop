import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import {VoiceJsonResponse} from '@seven.io/api'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {SendSmsProps} from '../../util/sendSms'
import {BaseHistory} from '../BaseHistory/BaseHistory'

export type VoiceDump = {
    notification: string,
    options: SendSmsProps
    response: VoiceJsonResponse
}

export const VoiceHistory = () => {
    const {t} = useTranslation([
        'history',
        'voice',
    ])

    const rowHandler = (row: VoiceDump, i: number) => {
        return <React.Fragment key={i}>
            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('to')}
                </TableCell>

                <TableCell align='right'>
                    {row.options.to}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('text')}
                </TableCell>

                <TableCell align='right'>
                    {row.options.text}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('from')}
                </TableCell>

                <TableCell align='right'>
                    {row.options.from}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('voice:code')}
                </TableCell>

                <TableCell align='right'>
                    {row.response.success}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('voice:cost')}
                </TableCell>

                <TableCell align='right'>
                    {row.response.total_price}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell component='th' scope='row'>
                    {t('id')}
                </TableCell>

                <TableCell align='right'>
                    {row.response.messages[0].id}
                </TableCell>
            </TableRow>
        </React.Fragment>
    }

    return <BaseHistory<VoiceDump>
        rowHandler={rowHandler}
        storeKey={'voices'}
    />
}
