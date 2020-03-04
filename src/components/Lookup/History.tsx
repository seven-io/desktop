import React from 'react';
import {useTranslation} from 'react-i18next';

import {TableRowSpreader} from '../TableRowSpreader';
import {BaseHistory} from '../BaseHistory/BaseHistory';
import {LookupResponse} from './types';

export const History = () => {
    const {t} = useTranslation('lookup');

    return <>
        <h1>{t('lookups')}</h1>

        <BaseHistory
            rowHandler={(row: LookupResponse, i: number) => <React.Fragment key={i}>
                <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(row)}/>
            </React.Fragment>}
            storeKey={'lookups'}
        />
    </>;
};