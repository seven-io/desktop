import React, {ReactElement, useEffect, useState} from 'react';
import clsx from 'clsx';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import {ContactsAction} from 'sms77-client/dist/constants/byEndpoint/contacts/ContactsAction';
import {Contact as Sms77Contact} from 'sms77-client';
import {useDispatch} from 'react-redux';
import {
    AutoSizer,
    Column,
    Table,
    TableCellRenderer,
    TableHeaderProps
} from 'react-virtualized';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {LocalStore} from '../util/LocalStore';
import {setBackdrop, setNav, setTo} from '../store/actions';
import {notify} from '../util/notify';
import {initClient} from '../util/initClient';
import {cleanPhone} from '../util/cleanPhone';

const styles = (theme: Theme) => {
    return createStyles({
        flexContainer: {
            alignItems: 'center',
            boxSizing: 'border-box',
            display: 'flex',
        },
        tableRow: {
            cursor: 'pointer',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
        },
        tableCell: {
            flex: 1,
        },
        noClick: {
            cursor: 'initial',
        },
    });
};

type Contact = Pick<Sms77Contact, 'ID' | 'Name' | 'Number'> & {
    action?: ReactElement
}

type Row = {
    index: number
}

class MuiVirtualizedTable extends React.PureComponent<WithStyles<typeof styles> & {
    columns: {
        dataKey: keyof Contact
        label: string
        numeric?: boolean
        width: number
    }[]
    headerHeight?: number
    onRowClick?: () => void
    rowCount: number
    rowGetter: (row: Row) => Contact
    rowHeight?: number
}> {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({index}: Row) => {
        const {classes} = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && this.props.onRowClick != null,
        });
    };

    cellRenderer: TableCellRenderer = ({cellData, columnIndex, ...propz}) => {
        const {classes: {flexContainer, noClick, tableCell}} = this.props;
        const column = this.props.columns[columnIndex];

        return <TableCell
            align={(columnIndex != null && column.numeric)
            || false ? 'right' : 'left'}
            className={clsx(tableCell, flexContainer, {
                [noClick]: this.props.onRowClick == null,
            })}
            component='div'
            style={{height: this.props.rowHeight}}
            variant='body'
        >
            {cellData}
        </TableCell>;
    };

    headerRenderer = ({
                          columnIndex,
                          label
                      }: TableHeaderProps & { columnIndex: number }) => {
        const {flexContainer, noClick, tableCell} = this.props.classes;

        return <TableCell
            align={this.props.columns[columnIndex].numeric || false ? 'right' : 'left'}
            className={clsx(tableCell, flexContainer, noClick)}
            component='div'
            style={{height: this.props.headerHeight}}
            variant='head'
        >
            <span>{label}</span>
        </TableCell>;
    };

    render() {
        const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props;

        return <AutoSizer>
            {({height, width}) => <Table
                gridStyle={{direction: 'inherit'}}
                headerHeight={headerHeight!}
                height={height}

                rowClassName={this.getRowClassName}
                rowHeight={rowHeight!}
                width={width}
                {...tableProps}
            >
                {columns.map(({dataKey, ...other}, columnIndex) => <Column
                    cellRenderer={this.cellRenderer}
                    className={classes.flexContainer}
                    dataKey={dataKey}
                    headerRenderer={(p) =>
                        this.headerRenderer({
                            ...p,
                            columnIndex,
                        })
                    }
                    key={dataKey}
                    {...other}
                />)}
            </Table>}
        </AutoSizer>;
    }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export const Contacts = () => {
    const {t} = useTranslation('contacts');
    const dispatch = useDispatch();

    const cleanContacts = (contacts: Sms77Contact[]) => {
        return contacts
            .filter(c => '' !== c.Number)
            .map(c => ({
                action: <Button
                    fullWidth
                    onClick={() => handleClickSms(c)}
                    size='small'
                    variant='outlined'
                >
                    {t('sms')}
                </Button>,
                ID: c.ID,
                Name: c.Name,
                Number: cleanPhone(c.Number!),
            }));
    };

    const [contacts, setContacts] =
        useState(cleanContacts(LocalStore.get('contacts', [])));

    useEffect(() => {
        if (!contacts.length) {
            getAndStore()
                .then()
                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)));
        }
    }, []);

    const handleClickSms = (c: Contact) => {
        dispatch(setTo(c.Number!));

        dispatch(setNav('sms'));
    };

    const getAndStore = async () => {
        dispatch(setBackdrop(true));

        const contacts = await initClient(LocalStore.get('options.apiKey'))
            .contacts({action: ContactsAction.Read, json: true}) as Contact[];

        LocalStore.set('contacts', contacts);

        setContacts(cleanContacts(contacts));

        dispatch(setBackdrop(false));
    };

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={getAndStore}>
                {t('reload')}
            </Button>
        </div>

        {
            contacts.length
                ? <Paper style={{height: 400, width: '100%'}}>
                    <VirtualizedTable
                        rowCount={contacts.length}
                        rowGetter={({index}) => contacts[index]}
                        columns={[
                            {
                                dataKey: 'ID',
                                label: t('id'),
                                numeric: true,
                                width: 100,
                            },
                            {
                                dataKey: 'Number',
                                label: t('number'),
                                numeric: true,
                                width: 170,
                            },
                            {
                                dataKey: 'Name',
                                label: t('nick'),
                                width: 170,
                            },
                            {
                                dataKey: 'action',
                                label: t('sms'),
                                width: 170,
                            },
                        ]}
                    />
                </Paper>
                : <p>{t('noEntries')}</p>
        }
    </>;
};