/* global $dirname */
import { app, BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';
import * as application from './services/application';

if (is.dev()) {
  require('electron-debug')();
}

app.on('ready', () => {
  application.init();

  // 加载 devtools extension
  if (is.dev()) {
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/redux-devtools/2.11.1_0'),
    );
    BrowserWindow.addDevToolsExtension(
      join($dirname, '../../extensions/react-developer-tools/0.15.4_0'),
    );
  }
});
