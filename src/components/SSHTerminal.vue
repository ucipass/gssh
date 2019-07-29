<template>
  <div class="hello" >
    <!-- <b-button size="sm" @click="connect()">+</b-button> -->
    <div >
      <div :id="terminalId+'-container'">
      </div>
    </div>

  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import 'xterm/dist/xterm.css'
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import { setTimeout } from 'timers';
Terminal.applyAddon(fit);
const waitSec = require('util').promisify(setTimeout)
 

export default {
  name: 'SSHTerminal',
  props: {
    host: String,
    username: String,
    password: String,
    terminalId: String
  },
  data() {
    return {
      term: null,         //Terminal object
      connected: false    //Keep track if terminal is connected
    }
  },
  methods: {
    connect: function() {
      console.log(`Connecting ${this.terminalId}`)
      // Atempt to start SSH Session
      ipcRenderer.send("TerminalOpen", this.host,this.username,this.password,this.terminalId)
    }
  },
  mounted(){
    this.term = new Terminal({ cursorBlink: true });  // Instantiate the terminal
    this.term.open(document.getElementById(this.terminalId+'-container'));
    this.term.fit();                 // Use the `fit` method, provided by the `fit` addon
    // Send to SSH Clinet
    this.term.on('data', (data)=> {
      if(this.connected) ipcRenderer.send(this.terminalId, data  )
      else console.log(`Cannot send to ${this.terminalId} because connection is closed!`)
    }) 
    // Receive from SSH Client
    ipcRenderer.on(this.terminalId, (event,data)=>{
      this.term.write(data);
    })
    // Acknowledgement that SSH Session os Open
    ipcRenderer.on(this.terminalId+'OpenAck', (event,message)=>{
      this.term.write(message);
      console.log(message)
      this.connected = true
    }) 
    // Received SSH Client Close
    ipcRenderer.on(this.terminalId+'Close', (event,message)=>{
      this.term.write(message);
      console.log(message)
      this.connected = false
    }) 
    ipcRenderer.on(this.terminalId+'Error', (event,message)=>{
      this.term.write(message);
      console.log(message)
      this.connected = false
    })
    this.$root.$on('sendCommands', (msg) => {
      console.log("sendCommands", msg)
      // this.term.write(msg)
      if(this.connected) {
        ipcRenderer.send(this.terminalId, msg  )
      }  
    })
    this.$root.$on('sendJob', async (job) => {
      console.log("sendJob Received:", job)
      for (let cmd of job.commands) {
        ipcRenderer.send(this.terminalId, cmd.send+"\n"  )
        console.log("sent",cmd.send,"waiting",(new Date()).toString())
        await waitSec(2000)        
      }

    })
    this.connect()
  },
  beforeDestroy(){
    console.log("COMPONENT DESTROYED",this.terminalId)
    ipcRenderer.send(this.terminalId+"Close")
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
