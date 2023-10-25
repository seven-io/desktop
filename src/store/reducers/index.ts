import {configureStore} from '@reduxjs/toolkit'
import backdrop from './backdrop'
import nav from './nav'

import snackbars from './snackbars'
import to from './to'

export const rootReducer = configureStore({
    reducer: {
        backdrop,
        nav,
        snackbars,
        to,
    },
})

export type RootState = ReturnType<typeof rootReducer.getState>;
