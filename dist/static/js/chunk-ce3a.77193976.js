(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ce3a"],{c11S:function(e,t,o){"use strict";var n=o("gTgX");o.n(n).a},gTgX:function(e,t,o){},ko6W:function(e,t,o){"use strict";e.exports={code:[{value:"86",label:"+86"},{value:"852",label:"+852"},{value:"853",label:"+853"},{value:"886",label:"+886"},{value:"1",label:"+1"},{value:"81",label:"+81"},{value:"82",label:"+82"},{value:"65",label:"+65"},{value:"60",label:"+60"},{value:"9714",label:"+9714"},{value:"44",label:"+44"},{value:"33",label:"+33"},{value:"63",label:"+63"}]}},ntYl:function(e,t,o){"use strict";o.r(t);var n=o("ko6W"),a=o.n(n),r={name:"Login",data:function(){return{options:a.a.code,loginForm:{username:"",password:"",areaCode:"86",authcode:""},loginRules:{username:[{required:!0,trigger:"blur",validator:function(e,t,o){t.length<8?o(new Error("Please enter correct username")):o()}}],password:[{required:!0,trigger:"blur",validator:function(e,t,o){t.length<6?o(new Error("Password greater than 6 digits")):o()}}],authcode:[{required:!0,trigger:"blur",validator:function(e,t,o){""==t.length?o(new Error("Password enter verification code")):o()}}]},loading:!1,pwdType:"password",redirect:void 0,rerefresh:!1}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},computed:{codeUrl:function(){return this.rerefresh?"":this.$codeURL+"/user/login/image"}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("Login",e.loginForm).then(function(){e.loading=!1,e.$router.push({path:e.redirect||"/"})}).catch(function(){e.loading=!1})})},refreshCode:function(){var e=this;this.rerefresh=!0,setTimeout(function(){e.rerefresh=!1},50)}}},l=(o("c11S"),o("u9bD"),o("KHd+")),s=Object(l.a)(r,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[o("h3",{staticClass:"title"},[e._v("Merchant - admin")]),e._v(" "),o("el-form-item",{attrs:{prop:"username"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),o("el-input",{staticClass:"input-with-select login-input",attrs:{name:"username",type:"text",maxlength:"11","auto-complete":"on",placeholder:"Username"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}}),e._v(" "),o("span",[o("el-select",{staticClass:"select-code",staticStyle:{width:"85px","text-align":"right"},attrs:{slot:"prepend",placeholder:e.$t("order.code")},slot:"prepend",model:{value:e.loginForm.areaCode,callback:function(t){e.$set(e.loginForm,"areaCode",t)},expression:"loginForm.areaCode"}},e._l(e.options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),o("el-input",{attrs:{type:e.pwdType,name:"password","auto-complete":"on",placeholder:"Password"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleLogin(t):null}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),o("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===e.pwdType?"eye":"eye-open"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{prop:"code"}},[o("div",{staticClass:"code"},[o("div",{staticStyle:{width:"75%"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"code"}})],1),e._v(" "),o("el-input",{attrs:{name:"authcode",maxlength:"11","auto-complete":"on",placeholder:"Verification code"},model:{value:e.loginForm.authcode,callback:function(t){e.$set(e.loginForm,"authcode",t)},expression:"loginForm.authcode"}})],1),e._v(" "),o("img",{attrs:{src:e.codeUrl},on:{click:e.refreshCode}})])]),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{width:"100%"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("\n        Login\n      ")])],1)],1)],1)},[],!1,null,"29b037bc",null);s.options.__file="index.vue";t.default=s.exports},u9bD:function(e,t,o){"use strict";var n=o("w7xO");o.n(n).a},w7xO:function(e,t,o){}}]);