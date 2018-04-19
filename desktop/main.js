const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    const width = 1024;
    const height = 768;
    const icon = path.join(__dirname, 'desktop', 'icon.png');

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width,
        height,
        icon,
        show: false
    });

    console.log('process.env.NODE_ENV', process.env.NODE_ENV);

    // create a new `splash`-Window
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

    // if main window is ready to show, then destroy the splash window and show up the main window
    mainWindow.once('ready-to-show', () => {
        splash.destroy();
        mainWindow.show();
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    });

    if (process.env.NODE_ENV !== 'production') {
        // mainWindow.loadURL(`http://localhost:${process.env.PORT || '8000'}`);
        mainWindow.on('error', error => console.log(error));
        mainWindow.loadURL(`http://localhost:${process.env.PORT || '8080'}`);
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }));
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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


// return new Promise((resolve, reject) => {
//     dialog.showOpenDialog({
//         filters: [
//             {name: 'Image Files', extensions: ['jpg', 'png']}
//         ]
//     }, fileNames => {
//         if (!fileNames) {
//             // cancelled
//             resolve({});
//             return;
//         }
//
//         fs.readFile(fileNames[0], 'utf-8', (error, data) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//
//             resolve(data);
//         });
//     });
// });
