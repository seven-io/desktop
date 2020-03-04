import React from 'react';
import {useTranslation} from 'react-i18next';
import {Contact as IContact} from 'sms77-client/dist/types';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export type ContactProps = {
    contact: IContact
}

export const Contact = ({contact}: ContactProps) => {
    const {t} = useTranslation('contacts');

    return <TableContainer style={{marginBottom: '1em'}}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('nick')}
                    </TableCell>

                    <TableCell align='right'>
                        {contact.nick}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('email')}
                    </TableCell>

                    <TableCell align='right'>
                        {contact.email}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('id')}
                    </TableCell>

                    <TableCell align='right'>
                        {contact.id}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('number')}
                    </TableCell>

                    <TableCell align='right'>
                        {contact.number}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>;
};