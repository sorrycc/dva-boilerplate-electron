/* global $dirname */
import { app, BrowserWindow } from 'electron';
import { join } from 'path';

function openMainWindow() {
  let mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${join($dirname, '..', 'pages')}/main.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  openMainWindow();
});
