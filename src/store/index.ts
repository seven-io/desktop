import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, useStore} from 'react-redux'
import backdrop from './features/backdrop'
import nav from './features/nav'
import snackbars from './features/snackbars'
import to from './features/to'

export const store = configureStore({
    reducer: {
        backdrop,
        nav,
        snackbars,
        to,
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<typeof store>()