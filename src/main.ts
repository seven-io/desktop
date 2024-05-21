import {init} from '@sentry/electron/main'
import electron, {app, BrowserWindow, ipcMain} from 'electron'
import {IS_DEV, SENTRY_DSN} from './util/constants'
import path from 'node:path'
//import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer'

init({dsn: SENTRY_DSN})

if (require('electron-squirrel-startup')) app.quit() // Handle creating/removing shortcuts on Windows when installing/uninstalling.

ipcMain.handle('get-user-data-path', async _event => {
    console.log('get-user-data-path', _event)
    return electron.app.getPath('userData')
})

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        autoHideMenuBar: !IS_DEV,
        height: IS_DEV ? 1080 : 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: !IS_DEV,
        },
        width: IS_DEV ? 1920 : 800,
    })

    /*    if (IS_DEV) {
            try {
                await installExtension([
                    REACT_DEVELOPER_TOOLS, // TODO: not working
                    REDUX_DEVTOOLS,
                ])
            } catch (e) {
                console.warn(e)
            }

            mainWindow.webContents.on('did-frame-finish-load', () => {
                mainWindow.webContents.once('devtools-opened', () => mainWindow.focus())

                mainWindow.webContents.openDevTools()
            })
        }*/

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }

    mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow) // Some APIs can only be used after this event occurs.

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => 'darwin' !== process.platform && app.quit())

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
app.on('activate', () => 0 === BrowserWindow.getAllWindows().length && createWindow())
