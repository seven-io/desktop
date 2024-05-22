import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../index'

type SnackbarsState = {
    entries: string[]
}

const initialState: SnackbarsState = {
    entries: []
}

export const counterSlice = createSlice({
    initialState,
    name: 'snackbars',
    reducers: {
        ADD_SNACKBAR: (state, action: PayloadAction<string>) => {
            state.entries.push(action.payload)
        },
        REMOVE_SNACKBAR: (state, action: PayloadAction<number>) => {
            state.entries.splice(action.payload, 1)
        },
    },
})

export const {ADD_SNACKBAR, REMOVE_SNACKBAR} = counterSlice.actions

export const selectSnackbars = (state: RootState) => state.snackbars.entries

export default counterSlice.reducer