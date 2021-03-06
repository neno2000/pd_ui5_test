var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;


app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 2000,
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindow.loadURL('file://' + __dirname + '/frontend/index.html');
  mainWindow.openDevTools();
});
