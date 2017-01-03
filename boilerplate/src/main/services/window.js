import is from 'electron-is';
import { join } from 'path';
import { BrowserWindow } from 'electron';

let count = 0;

export function create(opts) {
  count += 1;
  let win = new BrowserWindow(opts);
  win.on('close', () => {
    count -= 1;
    win = null;
  });
  return win;
}

export function getCount() {
  return count;
}

export function getPath() {
  let path = `file://${join($dirname, '..', 'pages')}/main.html`;
  if (is.dev()) {
    const { serverIp, serverPort } = require('../../../webpack.config.dev.babel.js'); // eslint-disable-line global-require
    path = `http://${serverIp}:${serverPort}/main-dev.html`;
  }
  return path;
}
