const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        resizable: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // preload: path.join(__dirname, 'preload.js')
        },
        show: false,
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Electron ready
app.on('ready', createWindow);

// macOS: Fenster neu erstellen, wenn App wieder geöffnet wird
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Alle Fenster schließen
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});