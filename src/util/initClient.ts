import {Client} from '@seven.io/client'
import localStore from './LocalStore'

export const initClient = (apiKey: string = localStore.get('options.apiKey')) => {
    return new Client({apiKey, sentWith: 'Desktop'})
}
