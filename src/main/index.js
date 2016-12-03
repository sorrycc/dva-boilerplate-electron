/* global $dirname */
import { app } from 'electron';
import isDev from 'electron-is-dev';
import * as application from './services/application';

if (isDev) {
  require('electron-debug')();
}

app.on('ready', () => {
  application.init();
});
