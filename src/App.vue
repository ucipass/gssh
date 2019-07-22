<template>
  <b-container fluid id="app" class="p-0 m-0 text-center">
      <div class='text-left'>
        <b-button size="sm" @click='$bvModal.show("LoginWindow")'>+</b-button>
        <b-button size="sm" @click="disconnect()">x</b-button>
        <b-button-group         
          v-for="button in terminals"
          :key="button.terminalId+(new Date()).toString()">
          <b-button size="sm" @click="activate(button.terminalId)">{{button.host}}</b-button>
          <b-button size="sm" @click="console.log('About to close')">X</b-button>
        </b-button-group>
      </div>
      <SSHTerminal
        v-for="terminal in terminals"
        v-show='terminal.active'
        :key="terminal.terminalId"
        :terminalId = 'terminal.terminalId'
        :host = 'terminal.host'
        :username = 'terminal.username'
        :password = 'terminal.password'
      />
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
  </b-container>
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
      terminals: [ ],
      host: "",
      username: "",
      password: "",
      loginError: "",
      test: true
    }
  },
  methods: {
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
    disconnect: function () {
        this.terminals.pop()
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
body {
  background-color: black;
}
</style>
