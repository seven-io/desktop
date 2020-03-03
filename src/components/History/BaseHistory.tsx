import React, {useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {useTranslation} from 'react-i18next';

import {ILocalStore, LocalStore} from '../../util/LocalStore';
import {Navigation} from './Navigation';

export type BaseHistoryProps = {
    nsKey: string
    path?: string
    rowHandler: (row: any, i: number) => any
    storeKey: keyof ILocalStore
}

export const BaseHistory = ({path, nsKey, storeKey, rowHandler}: BaseHistoryProps) => {
    const {t} = useTranslation(nsKey);
    const list = LocalStore.get(storeKey) as any[];
    const [index, setIndex] = useState(list.length - 1);
    const entry = list[index];

    return <>
        <h1>{t(storeKey)}</h1>

        {entry && <Navigation index={index} list={list} onNavigation={setIndex}/>}

        <TableContainer>
            <Table>
                <TableBody>
                    {entry && (path ? eval(`entry${path}`) : [entry].flat()).map(rowHandler)}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
};