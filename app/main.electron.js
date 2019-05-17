const { app, autoUpdater, dialog, BrowserWindow } = require('electron')
const ini = require('ini')
const fs = require('fs')

let mainWindow = null

app.on('window-all-closed', () => {
  app.quit()
})

const configFile = (app.getPath('userData') + '/config.ini').replace('Electron', 'C-PAC')

let config = {}
try {
  if (fs.existsSync(configFile)) {
    config = ini.parse(fs.readFileSync(configFile, 'utf-8'));
  }
} catch (error) {
  console.log("Could not open config:", error)
  app.quit()
}

config = { ...{
  url: 'https://fcp-indi.github.io/C-PAC_GUI/versions/{version}/electron',
  version: '0.0.2-rc',
}, ...config }

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    width: 1024,
    height: 728
  })

  mainWindow.setMenu(null)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:1212`);
    mainWindow.toggleDevTools()
  } else {
    mainWindow.loadURL(config.url.replace('{version}', config.version));
  }

  mainWindow.webContents.on("did-fail-load", function() {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(
        () => mainWindow.loadURL(`http://localhost:1212`),
        500
      )
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      return
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
