<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="terminal-container">
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import 'xterm/dist/xterm.css'
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
Terminal.applyAddon(fit);
 
// setInterval(() => {
//   ipcRenderer.send('form-data', "AAAAAAAAAAAAAAAAAAAAA" )
// }, 1000);

ipcRenderer.on('server-reply', (e, item)=>{
  console.log("SERVER REPLY",item)
})




var term = new Terminal({ cursorBlink: true });  // Instantiate the terminal
term.open(document.getElementById('terminal-container'));
term.fit();                 // Use the `fit` method, provided by the `fit` addon

function runFakeTerminal() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };

    term.writeln('Welcome to Admin Console!');
    term.prompt();

    term.on('key', function(key, ev) {
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

        if (ev.keyCode === 13) {
            term.prompt();
        } else if (ev.keyCode === 8) {
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
                term.write('\b \b');
            }
        } else if (printable) {
            term.write(key);
            ipcRenderer.send('terminal-data', key)

        }
    });

    term.on('paste', function(data) {
        term.write(data);
    });
}
runFakeTerminal();

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
