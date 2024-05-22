import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../index'

export type Route = 'sms' | 'options' | 'contacts' | 'pricing' | 'lookup' | 'voice'

type NavState = {
    route: Route
}

const initialState: NavState = {
    route: 'sms',
}

export const counterSlice = createSlice({
    initialState,
    name: 'nav',
    reducers: {
        SET_NAV: (state, action: PayloadAction<Route>) => {
            state.route = action.payload
        },
    },
})

export const {SET_NAV} = counterSlice.actions

export const selectRoute = (state: RootState) => state.nav.route

export default counterSlice.reducer