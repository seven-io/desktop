import {LocalStore} from '../../util/LocalStore'
import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../index'

type ToState = {
    value: string
}

const initialState: ToState = {
    value: LocalStore.get('options.to'),
}

export const counterSlice = createSlice({
    initialState,
    name: 'to',
    reducers: {
        SET_TO: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

export const {SET_TO} = counterSlice.actions

export const selectTo = (state: RootState) => state.to.value

export default counterSlice.reducer