import {app, BrowserWindow} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';
import {IS_DEV} from './util/constants';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
app.allowRendererProcessReuse = true;
//app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors'); // TODO: add back if cors failure in production?

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        height: IS_DEV ? 1080 : 600,
        webPreferences: {
            allowRunningInsecureContent: false,
            nodeIntegration: true,
            webSecurity: !IS_DEV,
        },
        width: IS_DEV ? 1920 : 800,
    });

    if (IS_DEV) {
        try {
            await installExtension([
                REACT_DEVELOPER_TOOLS,
                //REDUX_DEVTOOLS, // TODO: extension says redux could not be found
            ]);
        } finally {
        }

        mainWindow.webContents.on('did-frame-finish-load', () => {
            mainWindow.webContents.once(
                'devtools-opened', () => mainWindow.focus());

            mainWindow.webContents.openDevTools();
        });
    }

    await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY); // load index.html
};

// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed',
    () => 'darwin' !== process.platform && app.quit());

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
app.on('activate',
    () => 0 === BrowserWindow.getAllWindows().length && createWindow());