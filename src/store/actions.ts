import {Route} from './reducers/nav';

export const addSnackbar = (message: string) => ({
    type: 'ADD_SNACKBAR',
    message,
});

export const removeSnackbar = (index: number) => ({
    type: 'REMOVE_SNACKBAR',
    index,
});

export const setNav = (nav: Route) => ({
    type: 'SET_NAV',
    nav,
});


export const setTo = (to: string) => ({
    type: 'SET_TO',
    to,
});

export const setBackdrop = (backdrop: boolean) => ({
    type: 'SET_BACKDROP',
    backdrop,
});