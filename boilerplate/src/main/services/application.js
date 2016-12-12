import { join } from 'path';
import { create } from './window';

export function init() {
  const win = create({ width: 800, height: 600 });
  win.loadURL(`file://${join($dirname, '..', 'pages')}/main.html`);
}
