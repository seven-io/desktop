import {combineReducers} from 'redux';

export const reducers = combineReducers({
    snackbars: (state: any = [], action) => {
        switch (action.type) {
            case 'ADD_SNACKBAR':
                return [
                    ...state,
                    action.message,
                ];

            case 'REMOVE_SNACKBAR':
                state.splice(action.index, 1);

                return [...state];
            default:
                return state;
        }
    },

    nav: (state: number = 0, action) => {
        switch (action.type) {
            case 'SET_NAV':
                state = action.nav;

                return state;
            default:
                return state;
        }
    },
});