import React from 'react';
import clsx from 'clsx';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import {
    AutoSizer,
    Column,
    Table,
    TableCellRenderer,
    TableHeaderProps
} from 'react-virtualized';
import Paper from '@material-ui/core/Paper';

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

type Row = {
    index: number
}

type VirtualTableProps<T> = WithStyles<typeof styles> & {
    columns: {
        dataKey: keyof T
        label: string
        numeric?: boolean
        width: number
    }[]
    headerHeight?: number
    onRowClick?: () => void
    rowCount: number
    rowGetter: (row: Row) => T
    rowHeight?: number
}

abstract class MuiVirtualizedTable<T> extends React.PureComponent<VirtualTableProps<T>> {
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

    cellRenderer: TableCellRenderer = ({cellData, columnIndex}) => {
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
                    dataKey={dataKey as string}
                    headerRenderer={(p) =>
                        this.headerRenderer({
                            ...p,
                            columnIndex,
                        })
                    }
                    key={dataKey as string}
                    {...other}
                />)}
            </Table>}
        </AutoSizer>;
    }
}

function createVirtualTable<T>() {
    return withStyles(styles)(class VirtualTable extends MuiVirtualizedTable<T> {
    });
}

type BaseVirtualizedTableProps<T> = Pick<VirtualTableProps<T>, 'columns'> & {
    entries: T[]
}

export function BaseVirtualizedTable<T>({
                                            columns,
                                            entries
                                        }: BaseVirtualizedTableProps<T>) {
    const VirtualizedTable = createVirtualTable<T>();

    return <Paper style={{height: 400, width: '100%'}}>
        <VirtualizedTable
            columns={columns}
            rowCount={entries.length}
            rowGetter={({index}) => entries[index]}
        />
    </Paper>;
}