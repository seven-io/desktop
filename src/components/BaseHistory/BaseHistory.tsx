import React, {useEffect, useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import {ILocalStore, LocalStore} from '../../util/LocalStore';
import {usePrevious} from '../../util/usePrevious';
import {Navigation} from './Navigation';

export type BaseHistoryProps = {
    path?: string
    rowHandler: (row: any, i: number) => any
    storeKey: keyof ILocalStore
}

export const BaseHistory = ({path, storeKey, rowHandler}: BaseHistoryProps) => {
    const list = LocalStore.get(storeKey) as any;
    const previousList = usePrevious<any>(list);
    const getLastIndex = () => list.length - 1;
    const [index, setIndex] = useState(getLastIndex());
    const entry = list[index];

    useEffect(() => {
        if (previousList && previousList.length !== list.length) {
            setIndex(getLastIndex());
        }
    }, [list]);

    return <>
        {entry && <Navigation index={index} list={list} onNavigation={(n) => setIndex(n)}/>}

        <TableContainer>
            <Table size='small'>
                <TableBody>
                    {entry && (path ? eval(`entry${path}`) : [entry].flat()).map(rowHandler)}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
};