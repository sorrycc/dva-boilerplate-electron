import is from 'electron-is';
import { join } from 'path';
import { create } from './window';

export function init() {
  const win = create({ width: 800, height: 600 });
  let path = `file://${join($dirname, '..', 'pages')}/main.html`;
  if (is.dev()) {
    const { serverIp, serverPort } = require('../../../webpack.config.dev.babel.js'); // eslint-disable-line global-require
    path = `http://${serverIp}:${serverPort}/main-dev.html`;
  }

  win.loadURL(path);
}
