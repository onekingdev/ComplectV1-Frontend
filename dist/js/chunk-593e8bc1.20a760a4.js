(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-593e8bc1"],{"1d8f":function(t,e,n){},"3ee0":function(t,e,n){},"64e0":function(t,e,n){!function(e,n){t.exports=n()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="dist/",n(n.s=4)}([function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e.default=i.a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"PlaidLink",props:{plaidUrl:{type:String,default:"https://cdn.plaid.com/link/v2/stable/link-initialize.js"},env:{type:String,default:"sandbox"},institution:String,selectAccount:Boolean,token:String,product:{type:[String,Array],default:function(){return["transactions"]}},language:String,countryCodes:Array,isWebView:Boolean,clientName:String,publicKey:String,webhook:String,onLoad:Function,onSuccess:Function,onExit:Function,onEvent:Function},created:function(){this.loadScript(this.plaidUrl).then(this.onScriptLoaded).catch(this.onScriptError)},beforeDestroy:function(){window.linkHandler&&window.linkHandler.exit()},methods:{onScriptError:function(t){console.error("There was an issue loading the link-initialize.js script")},onScriptLoaded:function(){window.linkHandler=window.Plaid.create({clientName:this.clientName,env:this.env,key:this.publicKey,onExit:this.onExit,onEvent:this.onEvent,onSuccess:this.onSuccess,product:this.product,selectAccount:this.selectAccount,token:this.token,webhook:this.webhook})},handleOnClick:function(){var t=this.institution||null;window.linkHandler&&window.linkHandler.open(t)},loadScript:function(t){return new Promise((function(e,n){if(document.querySelector('script[src="'+t+'"]'))e();else{var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src=t,r.addEventListener("load",e),r.addEventListener("error",n),r.addEventListener("abort",n),document.head.appendChild(r)}}))}},watch:{$props:{handler:function(){this.onScriptLoaded()},deep:!0}}}},function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"plaid-link-wrapper"},[this._t("button",[e("button",{staticClass:"plaid-link-button",on:{click:this.handleOnClick}},[this._t("default")],2)],{onClick:this.handleOnClick})],2)},i=[];n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}))},function(t,e,n){"use strict";function r(t,e,n,r,i,o,s,a){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=c):i&&(c=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),c)if(l.functional){l._injectStyles=c;var d=l.render;l.render=function(t,e){return c.call(e),d(t,e)}}else{var u=l.beforeCreate;l.beforeCreate=u?[].concat(u,c):[c]}return{exports:t,options:l}}n.d(e,"a",(function(){return r}))},function(t,e,n){"use strict";var r,i=n(5),o=(r=i)&&r.__esModule?r:{default:r};t.exports=o.default},function(t,e,n){"use strict";n.r(e);var r=n(2),i=n(0);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var s=n(3),a=Object(s.a)(i.default,r.a,r.b,!1,null,null,null);e.default=a.exports}])}))},"6cee":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-form-group",{staticClass:"mb-0",attrs:{id:"inputCoupon-group-1",label:"Promo Code","label-for":"inputCoupon"}},[n("div",{staticClass:"d-flex coupon"},[n("b-form-input",{staticClass:"coupon__input",class:{"is-invalid":t.errors.coupon},attrs:{id:"inputCoupon",type:"text",placeholder:"Enter promo code",required:""},on:{keyup:t.onKeyUp},model:{value:t.coupon,callback:function(e){t.coupon=e},expression:"coupon"}}),t.loading?t._e():n("button",{staticClass:"btn btn-secondary coupon__btn",attrs:{type:"button",disabled:t.disabled},on:{click:t.activatePromoCode}},[t._v("Apply")]),t.loading?n("button",{staticClass:"btn btn-secondary coupon__btn"},[n("div",{staticClass:"lds-ring lds-ring-small"},[n("div"),n("div"),n("div"),n("div")])]):t._e()],1),t.message?n("div",{staticClass:"valid-feedback d-block"},[t._v(t._s(t.message))]):t._e(),t.errors.coupon?n("div",{staticClass:"invalid-feedback d-block"},[t._v(t._s(t.errors.coupon))]):t._e()])},i=[],o={data:function(){return{coupon:"",message:"",errors:{},loading:!1,disabled:!1}},methods:{onKeyUp:function(t){13===t.keyCode&&this.activatePromoCode()},clearErrorsAndMessages:function(){for(var t in this.errors)delete this.errors[t];this.message=""},activatePromoCode:function(){var t=this;this.clearErrorsAndMessages(),this.loading=!0;var e={coupon:this.coupon};this.$store.dispatch("applyCoupon",e).then((function(e){e.errors||(t.message=e.message,t.$emit("couponApplied",e))}))["catch"]((function(e){t.errors.coupon=e.data.errors.message}))["finally"]((function(){return t.loading=!1}))}},watch:{coupon:function(t){t&&this.clearErrorsAndMessages()}}},s=o,a=n("2877"),c=Object(a["a"])(s,r,i,!1,null,"3d62f87f",null);e["a"]=c.exports},9065:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"steps"},t._l(t.steps,(function(e,r){return n("div",{key:e,staticClass:"step",class:r+1<=t.currentStep?"active":""},[n("h4",{staticClass:"step__name"},[t._v(t._s(r+1)+". "+t._s(e))])])})),0)},i=[],o={props:["currentStep","steps"],computed:{currentStepComp:function(){var t=this.currentStep;return t}}},s=o,a=n("2877"),c=Object(a["a"])(s,r,i,!1,null,"34cb2f2c",null);e["a"]=c.exports},"99d8":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{type:"animation",name:"ma"}},[n("div",{staticClass:"overlay"},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xl-3 m-x-auto"},[n("div",{staticClass:"overlay-block"},[n("h2",{staticClass:"overlay-text m-b-2"},[t._v(t._s(t.overlay.message))]),t.loading?n("div",{staticClass:"overlay-status"},[n("div",{staticClass:"lds-ring"},[n("div"),n("div"),n("div"),n("div")])]):t._e(),t.loading||"success"!==t.overlay.status?t._e():n("div",{staticClass:"overlay-status"},[n("div",{staticClass:"lds-ring lds-ring-stop"},[n("div"),n("div"),n("div"),n("div")]),n("ion-icon",{staticClass:"overlay-icon",attrs:{name:"checkmark-outline"}})],1),t.loading||"error"!==t.overlay.status?t._e():n("div",{staticClass:"overlay-status"},[n("b-icon",{attrs:{icon:"x-circle-fill",variant:"danger","font-scale":"7.5"}})],1)])])])])])])},i=[],o={computed:{loading:function(){return this.$store.getters.loading},overlay:function(){return this.$store.getters.overlay}}},s=o,a=(n("e5c3"),n("2877")),c=Object(a["a"])(s,r,i,!1,null,"8694fbd2",null);e["a"]=c.exports},b9f4:function(t,e,n){t.exports=n.p+"img/primary.70f6fdd7.svg"},ba78:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"topbar"},[r("div",{staticClass:"logo"},[r("router-link",{staticClass:"link",attrs:{to:"/"}},[r("img",{staticClass:"logo__img logo__img_full",attrs:{src:n("b9f4")}}),r("svg",{staticClass:"logo__text",attrs:{width:"200",height:"30",xmlns:"http://www.w3.org/2000/svg"}},[r("text",{attrs:{x:"0",y:"25","font-family":"Varela"}},[t._v("complect")])])])],1),r("div",{staticClass:"navbar-nav mr-0"},[t.loggedIn&&t.userName?r("div",{staticClass:"dropdown dropdown-profile"},[t.userName?r("div",{staticClass:"dropdown-profile__btn",attrs:{"aria-expanded":t.isProfileMenuOpen},on:{click:function(e){t.isProfileMenuOpen=!t.isProfileMenuOpen}}},[r("span",[t._v(t._s(t.userName))]),r("b-icon",{staticClass:"m-l-1",attrs:{icon:"chevron-down"}})],1):t._e(),r("ul",{staticClass:"dropdown-menu",class:{show:t.isProfileMenuOpen},attrs:{"aria-labelledby":"profile_dropdown_btn"}},[r("li",{staticClass:"dropdown-item",on:{click:t.signOut}},[t._v("Sign Out")])])]):r("div",{staticClass:"ml-auto mr-3 mt-auto mb-auto"},[r("router-link",{staticClass:"btn btn btn-dark",attrs:{to:"/users/sign_in"}},[t._v("Sign in")])],1)])])},i=[],o={props:["userInfo"],data:function(){return{isProfileMenuOpen:!1}},methods:{removeCurrentUser:function(){localStorage.removeItem("app.currentUser"),localStorage.removeItem("app.currentUser.token"),localStorage.removeItem("app.currentUser.userType"),localStorage.removeItem("app.currentUser.paymentMethod"),window.location.href="".concat(window.location.origin)},signOut:function(){var t=this,e=localStorage.getItem("app.currentUser.token")?localStorage.getItem("app.currentUser.token"):"";fetch(this.$store.getters.backendUrl+"/api/users/sign_out",{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:JSON.parse(e)}}).then((function(e){return e.ok||404!==e.status||t.removeCurrentUser(),e.json()})).then((function(e){t.removeCurrentUser()}))["catch"]((function(t){return console.error(t)}))}},computed:{loggedIn:function(){return this.$store.getters.loggedIn},currentUser:function(){return this.$store.getters.getUser},userName:function(){var t=this.currentUser.contact_first_name?"".concat(this.currentUser.contact_first_name," ").concat(this.currentUser.contact_last_name):"".concat(this.currentUser.first_name," ").concat(this.currentUser.last_name);return"undefined undefined"!==t?t:""},mainUrl:function(){return window.location.origin}}},s=o,a=(n("c94f"),n("2877")),c=Object(a["a"])(s,r,i,!1,null,"4d594f10",null);e["a"]=c.exports},c94f:function(t,e,n){"use strict";n("1d8f")},d0a0:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"registration-card-header borderless p-y-20 px-0"},[n("div",{staticClass:"d-flex justify-content-between align-items-center"},[n("h4",{staticClass:"registration-card-header__title mb-0"},[t._v("Payment Method")]),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.cardOptions.length,expression:"!cardOptions.length"}]},[n("plaid-link",t._b({attrs:{env:"sandbox",publicKey:t.plaidPK,clientName:"Test App",product:"auth"},scopedSlots:t._u([{key:"button",fn:function(e){return[n("a",{staticClass:"btn btn-default",on:{click:e.onClick}},[t._v("Add Bank Account")])]}}])},"plaid-link",{onSuccess:t.onSuccess},!1))],1)])]),t.cardOptions.length?n("div",{staticClass:"registration-card-header borderless p-y-20 px-0"},t._l(t.cardOptions,(function(e,r){return n("div",[n("div",{staticClass:"d-flex justify-content-between align-items-center"},[n("div",{staticClass:"paragraph"},[t._v(t._s(e.text))]),n("div",{staticClass:"d-flex align-items-center"},[n("div",{staticClass:"paragraph font-weight-bold"},[t._v(t._s(e.number)+" "+t._s(e.type))]),n("a",{staticClass:"btn btn-link ml-2",on:{click:function(n){return n.stopPropagation(),t.deletePaymentMethod(e.id)}}},[t._v("Remove")])])])])})),0):t._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.cardOptions.length,expression:"!cardOptions.length"}],staticClass:"registration-card-header borderless p-t-20 px-0"},[n("stripe-element-card",{ref:"elementRef",attrs:{pk:t.pk},on:{token:t.tokenCreated}}),n("div",{staticClass:"row"},[n("div",{staticClass:"col text-right"},[n("b-button",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],attrs:{type:"button",variant:"dark",disabled:t.disabled},on:{click:t.submit}},[t._v("Add")]),n("b-button",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{type:"button",variant:"none"}},[n("div",{staticClass:"lds-ring lds-ring-small"},[n("div"),n("div"),n("div"),n("div")])])],1)])],1)])},i=[],o=n("9523"),s=n.n(o),a=n("acaf"),c=n("64e0"),l=n.n(c);function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){s()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var p={props:["billingTypeSelected","billingTypeOptions","plan","userType"],components:{StripeCheckout:a["StripeCheckout"],StripeElementCard:a["StripeElementCard"],PlaidLink:l.a},created:function(){var t=JSON.parse(localStorage.getItem("app.currentUser.paymentMethod"));t&&(this.cardSelected=t.id,this.onPaymentMethodChange(t.id),this.cardOptions.push(u({},t)),this.$emit("complitedPaymentMethod",t.id))},data:function(){return{token:null,cardDetail:{nameOnCard:"",cardNumber:"",expDate:"",expDateYear:"",CVV:"",country:"",zip:""},cards:[],cardSelected:null,cardOptions:[],errors:[],additionalUsersCount:0,disabled:!1}},methods:{submit:function(){this.$refs.elementRef.submit()},tokenCreated:function(t){var e=this,n={userType:this.userType,stripeToken:t.id};this.$store.dispatch("generatePaymentMethod",n).then((function(t){e.$refs.elementRef.clear();var n={text:"Credit Card".concat(0===e.cardOptions.length?" (primary)":""),value:t.id,number:"**** **** **** ".concat(t.last4),type:t.brand,id:t.id};e.cardOptions.push(n),e.cardSelected=t.id,e.onPaymentMethodChange(t.id),localStorage.setItem("app.currentUser.paymentMethod",JSON.stringify(n)),e.$emit("complitedPaymentMethod",t)}))["catch"]((function(t){console.error(t)}))},deletePaymentMethod:function(t){var e=this,n={userType:this.userType,id:t};this.$store.dispatch("deletePaymentMethod",n).then((function(n){var r=e.cardOptions.findIndex((function(e){return e.id===t}));e.cardOptions.splice(r,1)}))["catch"]((function(t){return console.error(t)}))},addBankAccount:function(){},onBiliingChange:function(t){this.$emit("updateBiliing",t)},onChangeUserCount:function(){var t=this.additionalUsersCount;this.$emit("updateAdditionalUsers",t)},onPaymentMethodChange:function(t){this.$emit("complitedPaymentMethod",{id:t})},onSuccess:function(t,e){var n=this,r={userType:this.userType,plaid:{payment_source_ach:{plaid_token:t,plaid_account_id:e.account_id,plaid_institution:e.institution.name}}};this.$store.dispatch("generatePaymentMethod",r).then((function(t){n.$refs.elementRef.clear();var e={text:"".concat(t.brand).concat(0===n.cardOptions.length?" (primary)":""),value:t.id,number:"**** **** **** ".concat(t.last4),type:"",id:t.id};n.cardOptions.push(e),n.cardSelected=t.id,n.onPaymentMethodChange(t.id),localStorage.setItem("app.currentUser.paymentMethod",JSON.stringify(e)),n.$emit("complitedPaymentMethod",t)}))["catch"]((function(t){console.error(t)}))}},computed:{loading:function(){return this.$store.getters.loading},planComputed:function(){return this.plan},pk:function(){return this.$store.getters.staticCollection.STRIPE_PUBLISHABLE_KEY},plaidPK:function(){return this.$store.getters.staticCollection.PLAID_PUBLIC_KEY}}},f=p,h=n("2877"),v=Object(h["a"])(f,r,i,!1,null,"fdd9116c",null);e["a"]=v.exports},e5c3:function(t,e,n){"use strict";n("3ee0")}}]);
//# sourceMappingURL=chunk-593e8bc1.20a760a4.js.map