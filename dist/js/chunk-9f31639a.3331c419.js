(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9f31639a"],{4724:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:{"d-inline-block":t.inline}},[s("div",{directives:[{name:"b-modal",rawName:"v-b-modal",value:t.modalId,expression:"modalId"}],class:{"d-inline-block":t.inline}},[t._t("default")],2),s("b-modal",{staticClass:"fade",attrs:{id:t.modalId,title:t.riskId?"Edit risk":"New risk"},on:{close:t.hideModal,show:t.newEtag}},[s("ModelLoader",{attrs:{url:t.riskId?t.submitUrl:void 0,default:t.initialrisk,etag:t.etag},on:{loaded:t.loadrisk}},[t.showRiskOption?s("b-form-group",{staticClass:"form-label mb-3",attrs:{id:"input-group-1",label:"Risk","label-for":"select-1"}},[s("b-form-select",{attrs:{id:"select-1",options:t.options,required:""},on:{change:t.onChange},model:{value:t.risk.risks,callback:function(e){t.$set(t.risk,"risks",e)},expression:"risk.risks"}}),s("Errors",{attrs:{errors:t.errors.risk}})],1):t._e(),s("b-row",{attrs:{"no-gutters":""}},[s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("Risk Name")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.risk.name,expression:"risk.name"}],staticClass:"form-control",domProps:{value:t.risk.name},on:{input:function(e){e.target.composing||t.$set(t.risk,"name",e.target.value)}}}),s("Errors",{attrs:{errors:t.errors.name}})],1)]),s("b-row",{staticClass:"m-t-1",attrs:{"no-gutters":""}},[s("div",{staticClass:"col-sm m-r-1"},[s("b-form-group",{staticClass:"form-label",attrs:{id:"input-group-2",label:"Impact","label-for":"select-2"}},[s("b-form-select",{attrs:{id:"select-2",errors:t.errors.impact,options:t.levelOptions},on:{change:t.onRiskChange},model:{value:t.risk.impact,callback:function(e){t.$set(t.risk,"impact",e)},expression:"risk.impact"}}),s("Errors",{attrs:{errors:t.errors.impact}})],1)],1),s("div",{staticClass:"col-sm"},[s("b-form-group",{staticClass:"form-label",attrs:{id:"input-group-3",label:"Likelihood","label-for":"select-3"}},[s("b-form-select",{attrs:{id:"select-3",errors:t.errors.likelihood,options:t.levelOptions},on:{change:t.onRiskChange},model:{value:t.risk.likelihood,callback:function(e){t.$set(t.risk,"likelihood",e)},expression:"risk.likelihood"}}),s("Errors",{attrs:{errors:t.errors.likelihood}})],1)],1)]),s("b-row",{staticClass:"mt-2",attrs:{"no-gutters":""}},[s("div",{staticClass:"col"},[s("label",{staticClass:"form-label"},[t._v("Risk Level")]),s("div",[s("b-icon",{staticClass:"mr-3",attrs:{icon:"exclamation-triangle-fill",scale:"1",variant:t.badgeVariant}}),t._v(t._s(t.riskLevelName))],1)])])],1),s("template",{slot:"modal-footer"},[s("button",{staticClass:"btn btn-link",on:{click:function(e){return t.hideModal()}}},[t._v("Cancel")]),s("button",{staticClass:"btn btn-dark",on:{click:t.submit}},[t._v(t._s(t.riskId?"Save":"Add"))])])],2)],1)},r=[],a=s("9523"),o=s.n(a),n=s("f774");function l(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function c(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?l(Object(s),!0).forEach((function(e){o()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var d=function(){return Math.random().toFixed(10).toString().replace(".","")},u=function(){return{name:"",id:null,impact:0,likelihood:0,compliance_policies:[],compliance_policy_ids:[]}},p={mixins:[Object(n["a"])()],props:{id:String,risks:Array,riskId:Number,remindAt:String,inline:{type:Boolean,default:!0},risksList:Array,policyId:Number,showRiskOption:{type:Boolean,default:!1}},data:function(){return{modalId:this.id||"modal_".concat(d()),risk:u(),isActive:!1,options:[{value:null,text:"New Risk"}],levelOptions:[{value:0,text:"Low"},{value:1,text:"Medium"},{value:2,text:"High"}],badgeVariant:"secondary",riskLevelName:"---",errors:{}}},methods:{hideModal:function(){this.errors={},this.$bvModal.hide(this.modalId)},loadrisk:function(t){this.risk=Object.assign({},this.risk,t),this.onRiskChange(),this.options=[{value:null,text:"New Risk"}],this.options=this.options.concat(this.risksComputedAsOptions)},submit:function(t){var e,s=this;(t.preventDefault(),this.errors={},this.risk.name)?(this.risk.compliance_policy_ids=this.risk.compliance_policies.map((function(t){return t.id})),this.risk.compliance_policy_ids.includes(this.policyId)||this.risk.compliance_policy_ids.push(this.policyId),e=this.riskId||this.risk.id?"updateRisk":"createRisk",this.$store.dispatch(e,c({},this.risk)).then((function(t){if(t.errors){var i="createRisk"===e?"Risk has not been created. Please try again.":"Risk has not been updated. Please try again.";s.toast("Error",i)}else"createRisk"==e?s.toast("Success","Risk has been created."):s.toast("Success","Risk has been updated."),s.$emit("saved",t),s.$bvModal.hide(s.modalId),s.newEtag()}))["catch"]((function(t){console.error(t),s.toast("Error","Risk has not been created. Please try again. ".concat(t),!0)}))):this.$set(this.errors,"name",["Required field"])},onChange:function(t){if(null===t)return this.isActive=!0,this.risk=u(),this.badgeVariant="secondary",void(this.riskLevelName="---");this.isActive=!1;var e=this.risks.find((function(e){return e.id===t}));this.risk=e,this.onRiskChange()},onRiskChange:function(){var t=this.riskLevel(this.risk.likelihood,this.risk.impact);this.riskLevelColor(t),this.getRiskLevelName(t)},getRiskLevelName:function(t){this.riskLevelName=this.levelOptions[t].text},riskLevel:function(t,e){return t>0&&2===e?2:t<2&&0===e?0:1},riskLevelColor:function(t){0===t&&(this.badgeVariant="success"),1===t&&(this.badgeVariant="warning"),2===t&&(this.badgeVariant="danger")}},computed:{initialrisk:function(){return u},canBeDraft:function(){return!this.riskId||"draft"===this.risk.status},submitUrl:function(){var t=this.riskId?"/".concat(this.riskId):"";return"/api/business/risks"+t},httpMethod:function(){return this.riskId?"PUT":"POST"},risksComputedAsOptions:function(){return this.risks.map((function(t){return{value:t.id,text:t.name}}))}},watch:{}},h=p,m=s("2877"),b=Object(m["a"])(h,i,r,!1,null,null,null);e["a"]=b.exports},"528e":function(t,e,s){"use strict";s("7fb9")},6346:function(t,e,s){t.exports=s.p+"img/policy.4cd572ac.svg"},"671a":function(t,e,s){"use strict";s("6e65")},"6e65":function(t,e,s){},"7fb9":function(t,e,s){},cd7e:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page"},[t.loading?s("div",[s("Loading")],1):t._e(),t.loading?t._e():s("div",{staticClass:"page-header"},[s("div",{staticClass:"page-header__title"},[s("h2",[t._v(t._s(t.pageTitle)),s("span",{staticClass:"separator mx-2"},[t._v("/")]),s("b",[t._v(t._s(t.riskComputed.name))])]),s("h2",{staticClass:"mt-1"},[s("b-badge",{staticClass:"badge-risk custom-badge mr-1",attrs:{variant:t.badgeVariant(t.riskComputed.risk_level)}},[s("b-icon-exclamation-triangle-fill",{staticClass:"mr-2"}),t._v(t._s(t.showLevel(t.riskComputed.risk_level)))],1),s("b",{staticClass:"risk-name"},[t._v(t._s(t.riskComputed.name))])],1)]),s("div",{staticClass:"page-header__actions"},[s("b-dropdown",{staticClass:"actions__dropdown actions__dropdown_tasks",attrs:{variant:"default",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[t._v("Actions"),s("ion-icon",{staticClass:"ml-2",attrs:{name:"chevron-down-outline",size:"small"}})]},proxy:!0}],null,!1,3535397629)},[s("RiskModalDelete",{attrs:{riskId:t.riskComputed.id,inline:!1},on:{deleteConfirmed:t.deleteRisk}},[s("b-dropdown-item",{staticClass:"delete"},[t._v("Delete risk")])],1)],1)],1)]),t.loading?t._e():s("div",{staticClass:"card-body white-card-body card-body_full-height"},[s("div",{staticClass:"mb-3"},[s("b-card-group",{attrs:{deck:""}},[s("b-card",{attrs:{"header-tag":"header","header-class":"d-flex"},scopedSlots:t._u([{key:"header",fn:function(){return[s("h3",{staticClass:"mb-0 font-weight-bold"},[t._v("Risk Details")]),s("RisksAddEditModal",{staticClass:"ml-auto",attrs:{riskId:t.riskComputed.id,inline:!1}},[s("button",{staticClass:"btn btn-secondary"},[t._v("Edit")])])]},proxy:!0}],null,!1,2711817094)},[s("b-card-text",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-2 col-md-3 col-4 pr-0"},[s("b-list-group",{staticClass:"text-secondary"},[s("b-list-group-item",{staticClass:"border border-white pb-0 pt-0"},[t._v("Title")]),s("b-list-group-item",{staticClass:"border border-white pb-0"},[t._v("Impact")]),s("b-list-group-item",{staticClass:"border border-white pb-0"},[t._v("Likelihood")])],1)],1),s("div",{staticClass:"col pl-0"},[s("b-list-group",[s("b-list-group-item",{staticClass:"border border-white pb-0 pt-0"},[t._v(t._s(t.riskComputed.name))]),s("b-list-group-item",{staticClass:"border border-white pb-0"},[t._v(t._s(t.showLevel(t.riskComputed.impact)))]),s("b-list-group-item",{staticClass:"border border-white pb-0"},[t._v(t._s(t.showLevel(t.riskComputed.likelihood)))])],1)],1)])])],1)],1)],1),s("div",[s("b-card-group",{attrs:{deck:""}},[s("b-card",{attrs:{"header-tag":"header","header-class":"d-flex"},scopedSlots:t._u([{key:"header",fn:function(){return[s("h3",{staticClass:"mb-0 font-weight-bold"},[t._v("Controls")]),s("RiskContols",{staticClass:"ml-auto",attrs:{riskId:t.riskComputed.id,inline:!1}},[s("button",{staticClass:"btn btn-secondary"},[t._v(t._s(t.riskComputed.compliance_policies||t.riskComputed.compliance_policies.length?"Edit":"Add")+" Control")])])]},proxy:!0}],null,!1,1678955335)},[s("b-card-text",[s("PoliciesTable",{attrs:{riskPolicies:t.riskComputed.compliance_policies},on:{deleteControl:t.updateRisk}})],1),t.riskComputed.compliance_policies||t.riskComputed.compliance_policies.length?t._e():s("b-card-text",[s("div",{staticClass:"no-results text-center"},[s("b-icon",{attrs:{icon:"files",scale:"5",variant:"dark"}}),s("p",{staticClass:"no-results__title"},[s("b",[t._v("No results found")])]),s("p",[t._v("Add a policy as a control to get started")]),s("RiskContols",{attrs:{riskId:t.riskComputed.id,inline:!1}},[s("button",{staticClass:"btn btn-dark"},[t._v("Add Control")])])],1)])],1)],1)],1)])])},r=[],a=s("9523"),o=s.n(a),n=s("e829"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:{"d-inline-block":t.inline}},[i("div",{directives:[{name:"b-modal",rawName:"v-b-modal",value:t.modalId,expression:"modalId"}],class:{"d-inline-block":t.inline}},[t._t("default")],2),i("b-modal",{staticClass:"fade",attrs:{id:t.modalId,title:"Delete risk"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-1 text-center px-0"},[i("img",{attrs:{src:s("d1db"),width:"25",height:"25"}})]),i("div",{staticClass:"col"},[i("p",{staticClass:"paragraph m-b-10"},[t._v("You are about to delete the risk and romove any connections to its related controls.")]),i("p",{staticClass:"paragraph mb-0"},[i("b",[t._v("Do you want to continue?")])])])]),i("Errors",{attrs:{errors:t.errors.title}}),i("template",{slot:"modal-footer"},[i("button",{staticClass:"btn btn-link mr-2",on:{click:function(e){return t.$bvModal.hide(t.modalId)}}},[t._v("Cancel")]),i("button",{staticClass:"btn btn-dark",on:{click:t.submit}},[t._v("Confirm")])])],2)],1)},c=[],d=function(){return Math.random().toFixed(10).toString().replace(".","")},u={props:{inline:{type:Boolean,default:!0},riskId:{type:Number,default:!0}},data:function(){return{modalId:"modal_".concat(d()),risk:{name:"",description:"N/A",sections:[]},errors:[]}},methods:{submit:function(t){t.preventDefault(),this.errors=[],this.$emit("deleteConfirmed"),this.$bvModal.hide(this.modalId),window.location.href==="".concat(window.location.origin,"/business/risks/").concat(this.riskId)&&(window.location.href="".concat(window.location.origin,"/business/risks/"))}},computed:{},watch:{},components:{}},p=u,h=s("2877"),m=Object(h["a"])(p,l,c,!1,null,null,null),b=m.exports,k=s("4724"),f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:{"d-inline-block":t.inline}},[i("div",{directives:[{name:"b-modal",rawName:"v-b-modal",value:t.modalId,expression:"modalId"}],class:{"d-inline-block":t.inline}},[t._t("default")],2),i("b-modal",{staticClass:"fade",attrs:{id:t.modalId,"modal-class":"modal-select-control",title:"Select Control(s)"},on:{show:t.newEtag}},[i("ModelLoader",{attrs:{url:t.riskId?t.submitUrl:void 0,default:t.initialrisk,etag:t.etag},on:{loaded:t.loadrisk}},[i("b-row",{staticClass:"m-t-1",attrs:{"no-gutters":""}},[i("b-card",{staticStyle:{width:"100%"}},[i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{attrs:{width:"10"}},[t._v("Policy")]),i("th",{attrs:{width:"55%"}}),i("th",[t._v("Status"),i("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),i("th",{staticClass:"text-right"},[t._v("Last modified"),i("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),i("th",{staticClass:"text-right"},[t._v("Date created"),i("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),i("th",{attrs:{width:"10%"}})])]),i("tbody",[t._l(t.policiesComputed,(function(e,r){return i("tr",{key:e.id},[i("td",[i("b-form-checkbox",{on:{change:t.onChange},model:{value:t.form.checked[r],callback:function(e){t.$set(t.form.checked,r,e)},expression:"form.checked[index]"}})],1),i("td",[i("a",{staticClass:"link custom-text",attrs:{href:"/business/compliance_policies/"+e.id}},[i("img",{staticClass:"icon-policy",attrs:{src:s("6346")}}),t._v(t._s(e.name))])]),i("td",[i("b-badge",{staticClass:"status",class:{status__published:"published"===e.status},attrs:{variant:t.statusVariant}},[t._v(t._s(e.status))])],1),i("td",{staticClass:"text-right"},[t._v(t._s(t.dateToHuman(e.updated_at)))]),i("td",{staticClass:"text-right"},[t._v(t._s(t.dateToHuman(e.created_at)))]),i("td",[i("div",{staticClass:"actions"},[i("b-dropdown",{staticClass:"m-0 p-0",attrs:{size:"sm",variant:"none",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[i("b-icon",{staticClass:"three-dots",attrs:{icon:"three-dots"}})]},proxy:!0}],null,!0)},[i("b-dropdown-item",{attrs:{href:"/business/compliance_policies/"+e.id}},[t._v("Edit")])],1)],1)])])})),t.policiesComputed.length?t._e():i("tr",[i("td",{staticClass:"text-center",attrs:{colspan:"5"}},[i("h4",{staticClass:"py-2"},[t._v("No policy")])])])],2)])])],1)],1),i("template",{slot:"modal-footer"},[i("div",{staticClass:"col"},[i("label",{staticClass:"m-t-1 form-label font-weight-bold"},[t._v(t._s(t.countSelected)+" Items Selected")])]),i("div",{staticClass:"col-justify-content-end"},[i("button",{staticClass:"btn btn-link custom-text",on:{click:function(e){return t.$bvModal.hide(t.modalId)}}},[t._v("Cancel")]),i("button",{staticClass:"btn btn-dark",on:{click:t.submit}},[t._v("Add")])])])],2)],1)},v=[],g=s("1315"),C=s("f774");function _(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function y(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?_(Object(s),!0).forEach((function(e){o()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):_(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var w=function(){return Math.random().toFixed(10).toString().replace(".","")},O=function(){return{name:"",id:null,impact:0,likelihood:0,compliance_policies:[],compliance_policy_ids:[]}},x={mixins:[Object(C["a"])()],props:{risks:Array,riskId:Number,remindAt:String,inline:{type:Boolean,default:!0},risksList:Array,policyId:Number},data:function(){return{modalId:"modal_".concat(w()),risk:O(),errors:[],isActive:!1,options:[{value:null,text:"New Risk"}],levelOptions:[{value:0,text:"Low"},{value:1,text:"Medium"},{value:2,text:"High"}],badgeVariant:"secondary",riskLevelName:"---",form:{checked:[]},statusVariant:"light",countSelected:0}},methods:{loadrisk:function(t){this.risk=Object.assign({},this.risk,t),this.form.checked=this.policiesComputed.map((function(e,s){var i;return t.compliance_policies.forEach((function(t){i=t.id===e.id})),i})),this.countingSelected()},submit:function(t){var e=this;t.preventDefault(),this.errors=[],this.$store.dispatch("updateRisk",y({},this.risk)).then((function(t){t.errors||(e.toast("Success","Risk has been created."),e.$bvModal.hide(e.modalId),e.newEtag())}))["catch"]((function(t){console.error(t),e.toast("Error","Couldn't submit form! ".concat(t),!0)}))},countingSelected:function(){var t=this;this.countSelected=0,this.form.checked.forEach((function(e){!0===e&&t.countSelected++}))},onChange:function(t){var e=this;this.risk.compliance_policy_ids=[],this.policiesComputed.forEach((function(t,s){e.form.checked[s]&&e.risk.compliance_policy_ids.push(t.id)})),this.countingSelected()},onRiskChange:function(){var t=this.riskLevel(this.risk.likelihood,this.risk.impact);this.riskLevelColor(t),this.getRiskLevelName(t)},getRiskLevelName:function(t){this.riskLevelName=this.levelOptions[t].text},riskLevel:function(t,e){return t>0&&2===e?2:t<2&&0===e?0:1},riskLevelColor:function(t){0===t&&(this.badgeVariant="success"),1===t&&(this.badgeVariant="warning"),2===t&&(this.badgeVariant="danger")},dateToHuman:function(t){var e=g["DateTime"].fromJSDate(new Date(t));return e.invalid?e.invalid?t:void 0:e.toFormat("dd/MM/yyyy")}},computed:{initialrisk:function(){return O},canBeDraft:function(){return!this.riskId||"draft"===this.risk.status},submitUrl:function(){var t=this.riskId?"/".concat(this.riskId):"";return"/api/business/risks"+t},httpMethod:function(){return this.riskId?"PUT":"POST"},risksComputedAsOptions:function(){return this.risks.map((function(t){return{value:t.id,text:t.name}}))},policiesComputed:function(){return this.$store.getters.policiesList}},watch:{},mounted:function(){}},I=x,R=(s("671a"),Object(h["a"])(I,f,v,!1,null,null,null)),j=R.exports,P=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[0!==t.riskPolicies.length?i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{attrs:{width:"55%"}},[t._v("Policy")]),i("th",[t._v("Status"),i("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),i("th",{staticClass:"text-right"},[t._v("Last modified"),i("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),i("th",{staticClass:"text-right"},[t._v("Date created"),i("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),i("th",{attrs:{width:"10%"}})])]),i("tbody",t._l(t.riskPolicies,(function(e){return i("tr",{key:e.id},[i("td",[i("a",{staticClass:"link custom-text",attrs:{href:"/business/compliance_policies/"+e.id}},[i("img",{staticClass:"icon-policy",attrs:{src:s("6346")}}),t._v(t._s(e.name))])]),i("td",[i("b-badge",{staticClass:"status",class:{status__published:"published"===e.status},attrs:{variant:t.statusVariant}},[t._v(t._s(e.status))])],1),i("td",{staticClass:"text-right"},[t._v(t._s(t.dateToHuman(e.updated_at)))]),i("td",{staticClass:"text-right"},[t._v(t._s(t.dateToHuman(e.created_at)))]),i("td",{staticClass:"text-right"},[i("div",{staticClass:"actions"},[i("b-dropdown",{staticClass:"m-0 p-0",attrs:{size:"sm",variant:"none",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[i("b-icon",{staticClass:"three-dots",attrs:{icon:"three-dots"}})]},proxy:!0}],null,!0)},[i("b-dropdown-item-button",{staticClass:"delete",on:{click:function(s){return t.deleteControl(e.id)}}},[t._v("Delete")])],1)],1)])])})),0)]):t._e()])},S=[],L={props:["riskPolicies"],data:function(){return{statusVariant:"light"}},methods:{dateToHuman:function(t){var e=g["DateTime"].fromJSDate(new Date(t));return e.invalid?e.invalid?t:void 0:e.toFormat("dd/MM/yyyy")},deleteControl:function(t){this.$emit("deleteControl",t)}},computed:{},watch:{}},E=L,D=Object(h["a"])(E,P,S,!1,null,null,null),M=D.exports;function $(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function N(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?$(Object(s),!0).forEach((function(e){o()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):$(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var A={props:["riskId"],components:{Loading:n["a"],RiskModalDelete:b,RisksAddEditModal:k["a"],RiskContols:j,PoliciesTable:M},data:function(){return{pageTitle:"Risk Register",levelOptions:["Low","Medium","High"],risk:{compliance_policies:[],created_at:"",id:null,impact:null,likelihood:null,name:"",risk_level:null,updated_at:""}}},methods:{deleteRisk:function(){console.log("delete risk",this.riskId)},badgeVariant:function(t){return 0===t?"success":1===t?"warning":2===t?"danger":void 0},showLevel:function(t){return this.levelOptions[t]},updateRisk:function(t){var e=this,s=this.risk.compliance_policies.findIndex((function(e){return e.id===t}));this.riskComputed.compliance_policies.splice(s,1),this.riskComputed.compliance_policy_ids=this.riskComputed.compliance_policies.map((function(t){return t.id})),this.$store.dispatch("updateRisk",N({},this.riskComputed)).then((function(t){console.log("response",t),e.toast("Success","Risk has been updated.")}))["catch"]((function(t){console.error(t),e.toast("Error","Risk has not been updated. Please try again. ".concat(t))}))}},computed:{loading:function(){return this.$store.getters.loading},riskComputed:function(){return this.$store.getters.getCurrentRisk}},watch:{},mounted:function(){var t=this;this.$store.dispatch("getRiskById",{riskId:this.riskId}).then((function(t){console.log("response mounted getRiskById",t)}))["catch"]((function(e){console.error(e),t.toast("Error",e.message)}))["finally"]((function(){t.$store.dispatch("getPolicies").then((function(t){console.log("response mounted getPolicies",t)}))["catch"]((function(e){console.error(e),t.toast("Error",e.message)}))}))}},T=A,V=(s("528e"),Object(h["a"])(T,i,r,!1,null,"00fa8504",null));e["default"]=V.exports},d1db:function(t,e,s){t.exports=s.p+"img/error_20.5080af0b.svg"},f774:function(t,e,s){"use strict";var i=s("9523"),r=s.n(i),a=function(){return Math.random()},o=function(t){var e=t||"etag",s="new"+e[0].toUpperCase()+e.substring(1);return{data:function(){return r()({},e,a())},methods:r()({},s,(function(){this[e]=a()}))}};e["a"]=o}}]);
//# sourceMappingURL=chunk-9f31639a.3331c419.js.map