(function(t){function e(e){for(var r,a,i=e[0],l=e[1],c=e[2],u=0,p=[];u<i.length;u++)a=i[u],s[a]&&p.push(s[a][0]),s[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);d&&d(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,i=1;i<n.length;i++){var l=n[i];0!==s[l]&&(r=!1)}r&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},s={app:0},o=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="app://./";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),s=n.n(r);s.a},"34bb":function(t,e){t.exports=require("electron")},"56d7":function(t,e,n){"use strict";n.r(e);n("55dd"),n("fca0"),n("ee1d"),n("4504"),n("fee7"),n("b9a1"),n("64d5"),n("db97"),n("097d"),n("3b2b"),n("3846"),n("4917"),n("a481"),n("28a5"),n("386d"),n("6b54"),n("8a81"),n("ac4d"),n("8449"),n("9c86"),n("fa83"),n("48c0"),n("d263"),n("6c37"),n("9ec8"),n("d0b0"),n("b54a"),n("f386"),n("1448"),n("673e"),n("242a"),n("4795"),n("130f"),n("ac6a"),n("0cdd");var r=n("2b0e"),s=n("5f5b");n("ab8b"),n("2dd8");r["default"].use(s["a"]);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"p-0 m-0 text-center",attrs:{fluid:"",id:"app"}},[n("div",{staticClass:"text-left"},[n("b-button",{attrs:{size:"sm"},on:{click:function(e){return t.$bvModal.show("LoginWindow")}}},[t._v("+")]),n("b-button",{attrs:{size:"sm"},on:{click:function(e){return t.disconnect()}}},[t._v("x")]),t._l(t.terminals,function(e){return n("b-button-group",{key:e.terminalId+(new Date).toString()},[n("b-button",{attrs:{size:"sm"},on:{click:function(n){return t.activate(e.terminalId)}}},[t._v(t._s(e.host))]),n("b-button",{attrs:{size:"sm"},on:{click:function(e){return t.console.log("About to close")}}},[t._v("X")])],1)})],2),t._l(t.terminals,function(t){return n("SSHTerminal",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"terminal.active"}],key:t.terminalId,attrs:{terminalId:t.terminalId,host:t.host,username:t.username,password:t.password}})}),n("b-modal",{staticClass:"text-center",attrs:{id:"LoginWindow",title:"SSH Login"}},[n("b-container",[n("b-row",{attrs:{"align-h":"center"}},[n("b-col",{staticClass:"col-4 text-right"},[n("label",{staticClass:"m-0",attrs:{for:"host"}},[t._v("host")])]),n("b-col",[n("b-input",{attrs:{id:"host"},model:{value:t.host,callback:function(e){t.host=e},expression:"host"}})],1)],1),n("b-row",{attrs:{"align-h":"center"}},[n("b-col",{staticClass:"col-4 text-right"},[n("label",{staticClass:"m-0",attrs:{for:"username"}},[t._v("username")])]),n("b-col",[n("b-input",{attrs:{id:"username"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1)],1),n("b-row",{attrs:{"align-h":"center"}},[n("b-col",{staticClass:"col-4 text-right"},[n("label",{staticClass:"m-0",attrs:{for:"password"}},[t._v("password")])]),n("b-col",[n("b-input",{attrs:{type:"password",id:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1)],1),n("div",{staticClass:"w-100",attrs:{slot:"modal-footer"},slot:"modal-footer"},[n("p",{staticClass:"float-left text-danger"},[t._v(t._s(t.loginError))]),n("p",{staticClass:"float-left"}),n("b-button",{staticClass:"float-right",attrs:{variant:"primary",size:"sm"},on:{click:t.login}},[t._v("Login")])],1)],1)],2)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("div",[n("div",{attrs:{id:t.terminalId+"-container"}})])])},l=[],c=n("34bb"),d=(n("9368"),n("59bf")),u=n("c554");d["Terminal"].applyAddon(u);var p={name:"SSHTerminal",props:{host:String,username:String,password:String,terminalId:String},data(){return{term:null,connected:!1}},methods:{connect:function(){console.log(`Connecting ${this.terminalId}`),c["ipcRenderer"].send("TerminalOpen",this.host,this.username,this.password,this.terminalId)}},mounted(){this.term=new d["Terminal"]({cursorBlink:!0}),this.term.open(document.getElementById(this.terminalId+"-container")),this.term.fit(),this.term.on("data",t=>{this.connected?c["ipcRenderer"].send(this.terminalId,t):console.log(`Cannot send to ${this.terminalId} because connection is closed!`)}),c["ipcRenderer"].on(this.terminalId,(t,e)=>{this.term.write(e)}),c["ipcRenderer"].on(this.terminalId+"OpenAck",(t,e)=>{console.log(e),this.connected=!0}),c["ipcRenderer"].on(this.terminalId+"Close",(t,e)=>{console.log(e),this.connected=!1}),c["ipcRenderer"].on(this.terminalId+"Error",(t,e)=>{console.log(e),this.connected=!1}),this.connect()},beforeDestroy(){console.log("COMPONENT DESTROYED",this.terminalId),c["ipcRenderer"].send(this.terminalId+"Close")}},m=p,f=n("2877"),h=Object(f["a"])(m,i,l,!1,null,"9b09979a",null),b=h.exports,v={name:"app",components:{SSHTerminal:b},data(){return{terminals:[],host:"",username:"",password:"",loginError:"",test:!0}},methods:{login:function(){console.log(this.host,this.username,this.password);let t={terminalId:(new Date).toString(),host:this.host,username:this.username,password:this.password,active:!0};this.terminals.forEach(t=>{t.active=!1}),this.terminals.push(t),this.$bvModal.hide("LoginWindow")},disconnect:function(){this.terminals.pop()},activate:function(t){console.log(t),this.terminals.forEach(e=>{t==e.terminalId?e.active=!0:e.active=!1})}}},g=v,w=(n("034f"),Object(f["a"])(g,o,a,!1,null,null,null)),_=w.exports;r["default"].config.productionTip=!1,new r["default"]({render:t=>t(_)}).$mount("#app")},"64a9":function(t,e,n){}});
//# sourceMappingURL=app.d8735972.js.map