import {app, BrowserWindow, screen} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';
//import {createDevTools}  from 'redux-devtools'; TODO: install?!

app.allowRendererProcessReuse = true;

const isDev = process.env.NODE_ENV.startsWith('dev');

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const createWindow = async () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    const mainWindow = new BrowserWindow({
        height,
        width,

        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
        }
    });

    if (isDev) {
        await installExtension(REACT_DEVELOPER_TOOLS);

        mainWindow.webContents.openDevTools(); // Open the DevTools.
    }

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY); // and load the index.html of the app.
};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process code. You can also put them in separate files and import them here.