import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../index'
import localStore from '../../util/LocalStore'

type ToState = {
    entries: string[]
    rcs: string
}

const initialState: ToState = {
    entries: localStore.get('options.to'),
    rcs: '',
}

export const counterSlice = createSlice({
    initialState,
    name: 'to',
    reducers: {
        ADD_TO: (state, action: PayloadAction<string | string[]>) => {
            const arr = typeof action.payload === 'string' ? [action.payload] : action.payload

            arr.forEach(s => {
                if (state.entries.includes(s)) return
                state.entries.push(s)
            })

            /*         state.entries.push(
                         ...(typeof action.payload === 'string' ? [action.payload] : action.payload)
                     )*/
        },
        SET_TO: (state, action: PayloadAction<string[]>) => {
            state.entries = [...new Set(action.payload)]
        },
        SET_TO_RCS: (state, action: PayloadAction<string>) => {
            state.rcs = action.payload
        },
    },
})

export const {ADD_TO, SET_TO, SET_TO_RCS} = counterSlice.actions

export const selectRecipients = (state: RootState) => state.to.entries
export const selectRcsRecipient = (state: RootState) => state.to.rcs

export default counterSlice.reducer