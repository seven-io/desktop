import {Route} from './reducers/nav';
import {IOptions} from '../components/Options/types';

export type StoreActionType =
    'ADD_SNACKBAR' |
    'REMOVE_SNACKBAR' |
    'SET_NAV' |
    'SET_OPTIONS' |
    'SET_TO' |
    'SET_BACKDROP'

export type BaseAction<T extends StoreActionType> = {
    type: T
}

export type AddSnackbarAction = BaseAction<'ADD_SNACKBAR'> & { message: string }
export type RemoveSnackbarAction = BaseAction<'REMOVE_SNACKBAR'> & { index: number }
export type SetNavAction = BaseAction<'SET_NAV'> & { nav: Route }
export type SetOptionsAction = BaseAction<'SET_OPTIONS'> & { options: IOptions }
export type SetToAction = BaseAction<'SET_TO'> & { to: string }
export type SetBackdropAction = BaseAction<'SET_BACKDROP'> & { backdrop: boolean }

export const addSnackbar = (message: AddSnackbarAction['message']): AddSnackbarAction => {
    return {
        type: 'ADD_SNACKBAR',
        message,
    };
};

export const removeSnackbar = (index: RemoveSnackbarAction['index']): RemoveSnackbarAction => {
    return {
        type: 'REMOVE_SNACKBAR',
        index,
    };
};

export const setNav = (nav: SetNavAction['nav']): SetNavAction => {
    return {
        type: 'SET_NAV',
        nav,
    };
};

export const setOptions = (options: SetOptionsAction['options']): SetOptionsAction => {
    return {
        type: 'SET_OPTIONS',
        options,
    };
};

export const setTo = (to: SetToAction['to']): SetToAction => {
    return {
        type: 'SET_TO',
        to,
    };
};

export const setBackdrop = (backdrop: SetBackdropAction['backdrop']): SetBackdropAction => {
    return {
        type: 'SET_BACKDROP',
        backdrop,
    };
};