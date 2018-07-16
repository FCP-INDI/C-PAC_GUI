/* eslint global-require: 0 */

const parseArgs = require('electron-args')

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
})

// 'http://localhost:' + 1212 + '/dist/renderer.dev.js'

const express = require('express')
const server = express()
server.get('/', (req, res) => res.sendFile(`${__dirname}/app.html`))
server.get('/dist/style.css', (req, res) => res.sendFile(`${__dirname}/dist/style.css`))
server.get('/dist/dll/renderer.dev.dll.js', (req, res) => res.sendFile(`${__dirname}/dist/dll/renderer.dev.dll.js`))
server.get('/dist/renderer.js', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.redirect('http://localhost:1212/dist/renderer.dev.js');
  } else {
    res.sendFile(`${__dirname}/dist/dll/renderer.prod.js`)
  }
})

server.get('/api/files', function(req, res) {
  const fs = require('fs')
  fs.readdir('/tmp', function(err, items) {
    res.json({ files: items })
  })
})

server.listen(cli.flags.port)

const { app, BrowserWindow } = require('electron')

let mainWindow = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  })

  mainWindow.setMenu(null)
  mainWindow.loadURL(`http://localhost:${cli.flags.port}`)

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
