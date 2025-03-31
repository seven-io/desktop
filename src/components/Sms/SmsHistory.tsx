import type {SmsMessage} from '@seven.io/client'
import {Fragment} from 'react'
import {useTranslation} from 'react-i18next'
import {getNumberFormatter} from '../../util/numberFormatter'
import type {SmsDump} from '../../util/sendSms'
import {BaseHistory} from '../BaseHistory/BaseHistory'
import {BoolChip} from '../BoolChip'
import {TableCell, TableHeader, TableRow} from '../Table'
import Tooltip from '../Tooltip'

export const SmsHistory = () => {
    const {t} = useTranslation('history')

    const rowHandler = (row: SmsMessage, i: number) => {
        return <Fragment key={i}>
            <TableRow>
                <TableHeader  scope='row'>{t('to')}</TableHeader>
                <TableCell align='right'>{row.recipient}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('text')}</TableHeader>
                <TableCell align='right'>{row.text}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('success')}</TableHeader>
                <TableCell align='right'><BoolChip value={row.success}/></TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('from')}</TableHeader>
                <TableCell align='right'>{row.sender}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('encoding')}</TableHeader>
                <TableCell align='right'>{row.encoding}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('parts')}</TableHeader>
                <TableCell align='right'>{row.parts}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('price')}</TableHeader>
                <TableCell align='right'>{getNumberFormatter().format(row.price)}</TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>
                    <Tooltip title={t('tooltips.message') as string}>
                        <span>{t('messages')}</span>
                    </Tooltip>
                </TableHeader>

                <TableCell align='right'>
                    {
                        Array.isArray(row.messages)
                            ? row.messages.join(' ')
                            : JSON.stringify(row.messages)
                    }
                </TableCell>
            </TableRow>

            <TableRow>
                <TableHeader  scope='row'>{t('id')}</TableHeader>
                <TableCell align='right'>{row.id}</TableCell>
            </TableRow>
        </Fragment>
    }

    return <BaseHistory<SmsDump>
        path='res.messages'
        rowHandler={rowHandler}
        storeKey={'history'}
    />
}
