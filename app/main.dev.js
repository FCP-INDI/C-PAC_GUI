/* eslint global-require: 0 */

const parseArgs = require('electron-args');

const cli = parseArgs(`
    cpac

    Usage
      $ cpac server|gui

    Options
      --help         show help
      --port [port]  webapp server port
`, {
    alias: {
        h: 'help',
        p: 'port',
    },
    default: {
        port: 5697
    }
});


if (cli.input[0] === 'server') {

  const express = require('express')
  const app = express()
  app.use('/', express.static(`${__dirname}`))
  // app.get('/', (req, res) => res.sendFile(`${__dirname}/app.html`))
  app.listen(cli.flags.port)

// } else if (cli.input[0] === 'gui') {
} else {

  const { app, BrowserWindow } = require('electron');
  const MenuBuilder = require('./menu');

  let mainWindow = null;

  if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    require('electron-debug')();
    const path = require('path');
    const p = path.join(__dirname, '..', 'app', 'node_modules');
    require('module').globalPaths.push(p);
  }

  const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];

    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log);
  };

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      await installExtensions();
    }

    mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728
    });

    mainWindow.loadURL(`file://${__dirname}/app.desktop.html`);

    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      mainWindow.show();
      mainWindow.focus();
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();
  });

}
