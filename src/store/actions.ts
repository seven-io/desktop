export const addSnackbar = (message: string) => ({
    type: 'ADD_SNACKBAR',
    message,
});

export const removeSnackbar = (index: number) => ({
    type: 'REMOVE_SNACKBAR',
    index,
});

export const setNav = (nav: number) => ({
    type: 'SET_NAV',
    nav,
});