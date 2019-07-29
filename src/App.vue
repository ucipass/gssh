<template>
  <div fluid id="app" class="disp-flex-vertical m-0">
    <b-row class="flex-fix text-left m-0">
      <b-button size="sm" @click='$bvModal.show("LoginWindow")'>Connect</b-button>
      <b-button size="sm" @click='sendCommands()'>SendCommands</b-button>      
      <b-button size="sm" @click='sendJob()'>SendJob</b-button>      
    </b-row>
    <b-row v-if='true' class="flex-auto m-0">
        <b-textarea v-model="commands"  @dblclick="testdbl($event)" rows=5 class="flex-auto"></b-textarea> 
    </b-row>
    <div v-if='false' class="flex-auto" style="overflow-y: scroll;" >
      <b-table class="flex-auto" dark small striped hover :items="items"></b-table>      
    </div>

    <b-row class="flex-fix m-0">
      <b-button-group         
        v-for="button in terminals"
        :key="button.terminalId+(new Date()).toString()">
        <b-button size="sm" @click="activate(button.terminalId)">{{button.host}}</b-button>
        <b-button size="sm" @click="disconnect(button.terminalId)">X</b-button>
      </b-button-group>
    </b-row>
    <b-row class="flex-fix m-0">
      <SSHTerminal
        v-for="terminal in terminals"
        v-show='terminal.active'
        :key="terminal.terminalId"
        :terminalId = 'terminal.terminalId'
        :host = 'terminal.host'
        :username = 'terminal.username'
        :password = 'terminal.password'
      />
    </b-row>
    <b-modal id="LoginWindow" class="text-center" title="SSH Login">
        <b-container>
          <b-row align-h="center">
            <b-col class="col-4 text-right"><label for="host" class="m-0" >host</label></b-col>
            <b-col><b-input v-model='host' id='host'></b-input></b-col>
          </b-row>
          <b-row align-h="center">
            <b-col class="col-4 text-right"><label for="username" class="m-0" >username</label></b-col>
            <b-col><b-input v-model='username' id='username'></b-input></b-col>
          </b-row>
          <b-row align-h="center">
            <b-col class="col-4 text-right"><label for="password" class="m-0" >password</label></b-col>
            <b-col><b-input type="password" v-model='password' id='password'></b-input></b-col>
          </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <p class="float-left text-danger">{{loginError}}</p>
          <p class="float-left"></p>
          <b-button variant="primary" size="sm" class="float-right" @click="login">Login</b-button>
        </div>
    </b-modal>  
  </div>
</template>

<script>
import SSHTerminal from './components/SSHTerminal.vue'

export default {
  name: 'app',
  components: {
    SSHTerminal
  },
  data() {
    return {
      commands: "",
      terminals: [ ],
      host: "",
      username: "",
      password: "",
      loginError: "",
      test: true,
      items: [
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      job:{
        default:{
          maxWait: 60,
          minWait: 0,
          abortOnFailure: true
        },
        commands: [
          { 
            send: "ping 8.8.8.8",
            expect: "#",
            maxWait: 10,
            minWait: 0,
          },
          { 
            send: "ping 4.2.2.2",
            expect: "#",
            maxWait: 10,
            minWait: 0,
          }          
        ]
      }
    }
  },
  methods: {
    testdbl: function(event){
      console.log("selectionStart",event.target.selectionStart,"selectionEnd",event.target.selectionEnd)
    },
    login: function () {
      console.log(this.host,this.username,this.password)
      let param = {
        terminalId: (new Date()).toString(),
        host: this.host,
        username: this.username,
        password: this.password,
        active: true  // New window is always active
      }
      // make the other windows inactive
      this.terminals.forEach((terminal)=>{ terminal.active = false})
      this.terminals.push(param)
      this.$bvModal.hide("LoginWindow")
    },
    disconnect: function (terminalId) {
        console.log(terminalId)
        // delete closed terminal windows from active sessions
        this.terminals = this.terminals.filter((terminal) => { return terminal.terminalId != terminalId  })
        // make sure that at least one terminal is active
        let activeTerminal = this.terminals.filter((terminal) => { return terminal.active })
        if ( !activeTerminal.length && this.terminals.length ) this.terminals[0].active = true
    },
    sendCommands: function () {
      let activeTerminal = this.terminals.filter((terminal) => { return terminal.active })
      console.log( activeTerminal.length ? activeTerminal[0].terminalId : "No active terminal")
      // console.log("sending",this.commands)
      this.$root.$emit('sendCommands', this.commands )
    },
    sendJob: function () {
      let activeTerminal = this.terminals.filter((terminal) => { return terminal.active })
      console.log( activeTerminal.length ? activeTerminal[0].terminalId : "No active terminal")
      // console.log("sending",this.commands)
      this.$root.$emit('sendJob', this.job )
    },
    activate: function(terminalId){
      console.log(terminalId)
      this.terminals.forEach((terminal)=>{
        if (terminalId == terminal.terminalId) terminal.active = true
        else terminal.active = false
      })
    }
  }
}
</script>

<style>
html,
body {
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.disp-flex-vertical {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.disp-flex-horizontal {
  display: flex;
  flex-flow: row;
  height: 100%;
}

.flex-fix {
  /* border: 1px dotted grey; */
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}

.flex-auto {
  /* border: 1px dotted grey; */
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
</style>
