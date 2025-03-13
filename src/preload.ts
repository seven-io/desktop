// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

/*
import {contextBridge, ipcRenderer} from 'electron'

const storeSend = (action: 'get' | 'set' | 'onDidChange', key: string, value?: any) => ipcRenderer.sendSync('store-send', {
    action,
    key,
    value
})

contextBridge.exposeInMainWorld('electron', {
    store: {
        get: (key: string) => storeSend('get', key),
        onDidChange: (key: string, value: any) => storeSend('onDidChange', key, value),
        set: (key: string, value: any) => storeSend('set', key, value),
    }
})*/
