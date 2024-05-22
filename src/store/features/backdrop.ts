import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../index'

type BackdropState = {
    active: boolean
}

const initialState: BackdropState = {
    active: false
}

export const counterSlice = createSlice({
    initialState,
    name: 'backdrop',
    reducers: {
        SET_BACKDROP: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload
        },
    },
})

export const {SET_BACKDROP} = counterSlice.actions
export const selectBackdropActive = (state: RootState) => state.backdrop.active

export default counterSlice.reducer