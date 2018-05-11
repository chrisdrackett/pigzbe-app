const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, shell, BrowserWindow} = electron;

const width = 1024;
const height = 768;

let mainWindow;

function createGameWindow() {
    mainWindow = new BrowserWindow({
        width: width * 1.5,
        height
    });

    mainWindow.on('error', error => console.log(error));
    mainWindow.loadURL(`http://localhost:${process.env.PORT || '8080'}`);
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createWindow() {
    const icon = path.join(__dirname, 'desktop', 'icon.png');

    mainWindow = new BrowserWindow({
        width,
        height,
        icon,
        show: false
    });

    const splash = new BrowserWindow({
        width,
        height,
        icon
    });

    splash.loadURL(url.format({
        pathname: path.join(__dirname, 'splash.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.once('ready-to-show', () => {
        splash.destroy();
        mainWindow.show();
        mainWindow.webContents.openDevTools();
    });

    if (process.env.NODE_ENV !== 'production') {
        mainWindow.on('error', error => console.log(error));
        mainWindow.loadURL(`http://localhost:${process.env.PORT || '8080'}`);
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

if (process.env.GAME_DEV === '1') {
    app.on('ready', createGameWindow);
} else {
    app.on('ready', createWindow);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //     app.quit();
    // }
    app.quit();
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

exports.openURL = pageURL => shell.openExternal(pageURL);

// FIXME: current version of keytar not working current version of electron
// exports.keytar = require('keytar');
