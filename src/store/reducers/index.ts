import {combineReducers} from 'redux';

import snackbars from './snackbars';
import nav from './nav';
import to from './to';
import backdrop from './backdrop';

export const rootReducer = combineReducers({
    backdrop,
    nav,
    snackbars,
    to,
});

export type RootState = ReturnType<typeof rootReducer>;