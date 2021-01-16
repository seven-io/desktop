import React from 'react';
import {useTranslation} from 'react-i18next';
import {VoiceResponseJson} from 'sms77-client';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {BaseHistory} from '../BaseHistory/BaseHistory';
import {SendSmsProps} from '../../util/sendSms';

export type VoiceDump = {
    notification: string,
    options: SendSmsProps
    response: VoiceResponseJson
}

export const VoiceHistory = () => {
    const {t} = useTranslation('history');

    const rowHandler = (row: VoiceDump, i: number) => <React.Fragment key={i}>
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
                {t('code')}
            </TableCell>

            <TableCell align='right'>
                {row.response.code}
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell component='th' scope='row'>
                {t('cost')}
            </TableCell>

            <TableCell align='right'>
                {row.response.cost}
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell component='th' scope='row'>
                {t('id')}
            </TableCell>

            <TableCell align='right'>
                {row.response.id}
            </TableCell>
        </TableRow>
    </React.Fragment>;

    return <BaseHistory
        rowHandler={rowHandler}
        storeKey={'voices'}
    />;
};