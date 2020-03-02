import React, {useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {useTranslation} from 'react-i18next';

import {LocalStore} from '../util/LocalStore';
import {SmsDump} from '../util/sendSms';
import {numberFormatter} from '../util/numberFormatter';
import {PreviousListItemButton} from './PreviousListItemButton';
import {NextListItemButton} from './NextListItemButton';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

export const History = () => {
    const histories = LocalStore.get('history') as SmsDump[];
    const {t} = useTranslation('history');
    const [index, setIndex] = useState(histories.length - 1);

    const history = histories[index];

    const handleNavigation = (math: '+' | '-') => {
        let newIndex = eval(`${index} ${math} 1`);

        if (!histories[newIndex]) {
            newIndex = eval(`${newIndex} ${'+' === math ? '-' : '+'} 1`);
        }

        setIndex(newIndex);
    };

    return <>
        <h1>{t('history')}</h1>

        {
            history && <>
                <PreviousListItemButton index={index} list={histories}
                                        IconButtonProps={{onClick: () => handleNavigation('-')}}/>

                <NextListItemButton index={index} list={histories}
                                    IconButtonProps={{onClick: () => handleNavigation('+')}}/>
            </>
        }

        <TableContainer>
            <Table>
                <TableBody>
                    {
                        history ? history.res.messages.map(
                            (row, i) => <React.Fragment key={i}>
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
                                        <Chip style={{backgroundColor: row.success ? 'green' : 'red', color: '#fff'}}
                                              label={t(row.success ? 'true' : 'false')}/>
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
                                        {numberFormatter.format(row.price)}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        <Tooltip title={t('tooltips.message')}>
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
                        ) : <TableRow>
                            <TableCell component='th' scope='row'>
                                {t('noEntries')}
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>;
};