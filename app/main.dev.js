/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

// import { ArgumentParser } from 'argparse';

// var parser = new ArgumentParser({
//   version: '0.0.1',
//   addHelp:true,
//   description: 'Argparse example'
// });

// var subparsers = parser.addSubparsers({
//   dest: 'command',
//   required: false
// });

// var server = subparsers.addParser('server', { addHelp: true });
// server.addArgument(
//   [ '-p', '--port' ],
//   {
//     action: 'store',
//     type: 'int',
//     default: 5697,
//     help: 'Server port'
//   }
// );

// var gui = subparsers.addParser('gui', { addHelp: true });
// var args = parser.parseArgs();

// if (args.command === 'server') {

//   const express = require('express')
//   const app = express()
//   app.use('/', express.static(`${__dirname}`))
//   // app.get('/', (req, res) => res.sendFile(`${__dirname}/app.html`))
//   app.listen(args.port)

// } else {

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

// }
