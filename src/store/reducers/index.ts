import {combineReducers} from 'redux';

import snackbars from './snackbars';
import nav from './nav';
import to from './to';

export const rootReducer = combineReducers({
    nav,
    snackbars,
    to,
});

export type RootState = ReturnType<typeof rootReducer>;