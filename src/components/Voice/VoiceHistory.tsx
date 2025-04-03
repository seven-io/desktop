import type {VoiceParams, VoiceResponse} from '@seven.io/client'
import {Fragment} from 'react'
import {useTranslation} from 'react-i18next'
import {BaseHistory} from '../BaseHistory/BaseHistory'
import {TableRow} from '../Table/TableRow'
import {TableHeader} from '../Table/TableHeader'
import {TableCell} from '../Table/TableCell'

export type VoiceDump = {
    notification: string,
    options: VoiceParams
    response: VoiceResponse
}

export const VoiceHistory = () => {
    const {t} = useTranslation([
        'history',
        'voice',
    ])

    const rowHandler = (row: VoiceDump, i: number) => {
        return <Fragment key={i}>
            <TableRow>
                <TableHeader scope='row'>{t('to')}</TableHeader>
                <TableCell align='right'>{row.options.to}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader scope='row'>{t('text')}</TableHeader>
                <TableCell align='right'>{row.options.text}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader scope='row'>{t('from')}</TableHeader>
                <TableCell align='right'>{row.options.from}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader scope='row'>{t('voice:code')}</TableHeader>
                <TableCell align='right'>{row.response.success}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader scope='row'>{t('voice:cost')}</TableHeader>
                <TableCell align='right'>{row.response.total_price}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader scope='row'>{t('id')}</TableHeader>
                <TableCell align='right'>{row.response.messages[0].id}</TableCell>
            </TableRow>
        </Fragment>
    }

    return <BaseHistory<VoiceDump>
        rowHandler={rowHandler}
        storeKey={'voices'}
    />
}
