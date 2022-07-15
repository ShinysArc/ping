const path = require('path');
const url = require('url');
const electron = require('electron');
const exec = require('child_process').exec;
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const childProcess = exec('java -jar ' + path.join(__dirname, 'src/IDE.jar'),
    function (error, stdout, stderr){
        console.log('Output -> ' + stdout);
        if(error !== null){
            console.log("Error -> "+error);
        }
    });

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: path.join(__dirname, "build/icon.png"),
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function () {
        mainWindow = null
    })}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
        childProcess.kill();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
