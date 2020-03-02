import React, {useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {useTranslation} from 'react-i18next';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';

import {LocalStore} from '../util/LocalStore';
import {SmsDump} from '../util/sendSms';

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
            history && <IconButton style={{position: 'absolute', left: '0px'}} onClick={() => handleNavigation('-')}>
                <ArrowLeftIcon fontSize='large' style={{fontSize: '3rem'}}/>
            </IconButton>
        }

        {
            history && <IconButton style={{position: 'absolute', right: '0px'}} onClick={() => handleNavigation('+')}>
                <ArrowRightIcon fontSize='large' style={{fontSize: '3rem'}}/>
            </IconButton>
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
                                        {t(row.success ? 'true' : 'false')}
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
                                        {
                                            new Intl.NumberFormat('en-US', {
                                                currency: 'EUR',
                                                style: 'currency',
                                            }).format(row.price)
                                        }
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component='th' scope='row'>
                                        {t('messages')}
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