import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../index'
import localStore from '../../util/LocalStore'

type ToState = {
    entries: string[]
}

const initialState: ToState = {
    entries: localStore.get('options.to'),
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
    },
})

export const {ADD_TO, SET_TO} = counterSlice.actions

export const selectRecipients = (state: RootState) => state.to.entries

export default counterSlice.reducer