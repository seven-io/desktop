import {init} from '@sentry/electron/main'
import {app, BrowserWindow, ipcMain} from 'electron'
import {IS_DEV, SENTRY_DSN} from './util/constants'
import {installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer'
import started from 'electron-squirrel-startup'
import Store from 'electron-store'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

Store.initRenderer();

init({dsn: SENTRY_DSN})

if (started) { // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    app.quit();
}

ipcMain.handle('get-user-data-path', () => {
    return app.getPath('userData')
})

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        autoHideMenuBar: !IS_DEV,
        height: IS_DEV ? 1080 : 600,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        width: IS_DEV ? 1920 : 800,
    })

    if (IS_DEV) {
        installExtension([
            REACT_DEVELOPER_TOOLS, // TODO: not working
            REDUX_DEVTOOLS,
        ])
            .then().catch(console.warn)

        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => 'darwin' !== process.platform && app.quit())

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
app.on('activate', () => 0 === BrowserWindow.getAllWindows().length && createWindow())
