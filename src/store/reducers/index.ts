import {combineReducers} from 'redux';

import snackbars from './snackbars';
import nav from './nav';

export const rootReducer = combineReducers({
    nav,
    snackbars,
});

export type RootState = ReturnType<typeof rootReducer>;