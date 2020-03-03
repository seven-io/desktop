import React from 'react';

import {BaseHistory} from '../History/BaseHistory';
import {LookupResponse} from './Lookup';
import {TableRowSpreader} from '../TableRowSpreader';

export const History = () => <BaseHistory
    nsKey={'lookup'}
    rowHandler={(row: LookupResponse, i: number) => <React.Fragment key={i}>
        <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(row)}/>
    </React.Fragment>}
    storeKey={'lookups'}
/>;