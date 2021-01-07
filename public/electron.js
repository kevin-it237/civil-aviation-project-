const { app, BrowserWindow, Tray, nativeImage, Menu, session } = require('electron')
const path = require("path");
const isDev = require("electron-is-dev");

let win, tray

let trayMenu = Menu.buildFromTemplate([
  { label: 'Open Application', click: () => win.show()},
  { role: 'quit'},
])

function setSession() {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Chrome';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
}

function createTray() {
  const imgPath = `${path.join(__dirname, "./assets/trayIcon.ico")}`
  const image = nativeImage.createFromPath(imgPath)
  tray = new Tray(image)
  tray.setToolTip('Civil Aviation KPIs')

  tray.on('click', e => {
    if(e.shiftKey) {
      app.quit()
    } else {
      win.isVisible() ? win.hide() : win.show()
    }
  })
  tray.setContextMenu(trayMenu)
}

function createWindow () {

  win = new BrowserWindow({
    title: 'Civil Aviation',
    width: 1024,
    height: 768,
    resizable: true,
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    fullscreenable: true,
  })

  win.loadURL(isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`, {userAgent: 'Chrome'})
  
  win.webContents.openDevTools()
  // win.removeMenu()
}

app.on('open-url', (event, data) => {
  console.log('Response from frontend', data)
  // Send data to render process
  win.webContents.send('login-sucess', {
    data
  })
})

app.setAsDefaultProtocolClient('mistermind')
app.setName('Civil Aviation')

app.whenReady()
.then(createWindow)
.then(createTray)
.then(setSession)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})