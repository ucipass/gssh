'use strict'

import { app, protocol, BrowserWindow,ipcMain  } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1200, height: 800, webPreferences: {
    nodeIntegration: true
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      // eslint-disable-next-line
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('TerminalOpen', (event, host,username,password,terminalId) => {
  // console.log( "Open terminal Id", terminalId );
  // console.log( "host", host );
  // console.log( "username", username );
  // console.log( "password", password );
  SSHClient(host,username,password,terminalId)
})

function SSHClient(host,username,password,terminalId){
  var SSHClient = require('ssh2').Client;
  var conn = new SSHClient();
  conn.on('ready', ()=>{
    let ackString = terminalId+'OpenAck'
    console.log(`SSH Connection to ${host} with terminalID ${ackString} acknowledged!`)
    win.webContents.send(ackString, '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n')
    
    conn.shell(function(err, stream) {
      if (err){
        win.webContents.send(terminalId, '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
        return false;
      }
      ipcMain.on(terminalId, (event,data) => {
        console.log(`Received ${data} from terminal ${terminalId}`)
        stream.write(data);
      })
      ipcMain.on(terminalId+"Close", (event,data) => {
        console.log(`Received Close Connection from terminal ${terminalId}`)
        conn.end()
      })
      stream.on('data', function(d) {
        win.webContents.send(terminalId, d.toString('binary'));
      }).on('close', function() {
        conn.end();
      });
    });
  })
  .on('close', function() {
    win.webContents.send(terminalId+"Close", '\r\n*** SSH CONNECTION CLOSED ***\r\n');
    conn.end();
  })
  .on('error', function(err) {
    win.webContents.send(terminalId+"Error", '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
    conn.end();
  })
  .on('keyboard-interactive',
  function(name, instructions, instructionsLang, prompts, finish) {
    // Pass answers to `prompts` to `finish()`. Typically `prompts.length === 1`
    // with `prompts[0] === "Password: "`
    //console.log('pass before finish is ', password);
    finish([password]);
  })
  .connect({
    host: host,
    username: username,
    password: password,
    algorithms: { 
      kex: ["ecdh-sha2-nistp256","ecdh-sha2-nistp384","ecdh-sha2-nistp521","diffie-hellman-group-exchange-sha256","diffie-hellman-group14-sha1","diffie-hellman-group-exchange-sha1","diffie-hellman-group1-sha1"],
      cipher: [ "aes128-ctr","aes192-ctr","aes256-ctr","aes128-gcm","aes256-gcm","aes256-cbc","aes192-cbc","aes128-cbc","blowfish-cbc","3des-cbc","arcfour256","arcfour128","cast128-cbc","arcfour" ],
      hmac: ["hmac-sha2-256","hmac-sha2-512","hmac-sha1","hmac-md5","hmac-sha2-256-96","hmac-sha2-512-96","hmac-ripemd160","hmac-sha1-96","hmac-md5-96"],
      serverHostKey: ["ssh-rsa","ecdsa-sha2-nistp256","ecdsa-sha2-nistp384","ecdsa-sha2-nistp521","ssh-dss"]
    },
    tryKeyboard: true // this attempts keyboard-interactive auth
  });  
}