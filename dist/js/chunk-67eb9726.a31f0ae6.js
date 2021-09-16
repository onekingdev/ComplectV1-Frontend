(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67eb9726"],{"0238":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Get",{attrs:{project:t.projectUrl,etag:t.etag},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.project;return[s("CommonHeader",{attrs:{title:a.title,sub:a.business.business_name,breadcrumbs:["Projects",a.title]}},[t.showTimesheetBtn(a)?s("router-link",{staticClass:"btn btn-outline-dark float-right",attrs:{to:t.timesheetUrl}},[t._v("My Timesheet")]):t._e()],1),t.isApproved(a)?s("Get",{attrs:{localProject:t.projectUrl+"/local"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.localProject;return[s("b-tabs",{attrs:{"content-class":"mt-0"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[s("b-tab",{attrs:{title:"Overview"}},[s("div",{staticClass:"white-card-body p-y-1"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row p-x-1"},[s("div",{staticClass:"col-sm-12"},[s("ChangeContractAlerts",{attrs:{project:a,for:"Specialist"},on:{saved:t.newEtag}})],1),s("div",{staticClass:"col-md-8 col-sm-12"},[s("PropertiesTable",{attrs:{title:"Project Details",properties:t.acceptedOverviewProps(r)}})],1),s("div",{staticClass:"col-md-4 col-sm-12 pl-0"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header d-flex justify-content-between"},[s("h3",{staticClass:"m-y-0"},[t._v("Collaborators")]),s("a",{staticClass:"link btn",on:{click:function(e){return t.viewContract()}}},[t._v("View All")])]),s("div",{staticClass:"card-body"},[s("table",{staticClass:"rating_table"},[s("thead",[s("tr",[s("th",[t._v("Name"),s("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),s("th")])]),s("tbody",t._l(t.getContractsByLocalProject(r),(function(e){return s("tr",{key:e._key},[s("td",[s("div",{staticClass:"d-flex align-items-center mb-3"},[s("div",[s("UserAvatar",{staticClass:"userpic_small mr-2",attrs:{user:e.specialist}})],1),s("div",{staticClass:"d-flex flex-column"},[s("b",[t._v(t._s(e.specialist.first_name)+" "+t._s(e.specialist.last_name))]),s("span",[t._v(t._s(e.specialist.seat_role))])])])]),s("td",[s("b-dropdown",{staticClass:"float-right",attrs:{text:"...",variant:"default",right:""}},[s("b-dropdown-item",{on:{click:function(s){return t.viewContract(e)}}},[t._v("View Contract")])],1)],1)])})),0)])])])])])]),s("div",{staticClass:"container m-t-1"},[s("div",{staticClass:"row p-x-1"},[s("div",{staticClass:"col-md-12"},[s("DiscussionCard",{attrs:{"project-id":a.local_project_id,token:t.accessToken}})],1)])])])]),s("b-tab",{attrs:{title:"Tasks"}}),s("b-tab",{attrs:{title:"Documents"}},[s("DocumentList",{attrs:{project:a}})],1),s("b-tab",{attrs:{title:"Collaborators"}},[s("div",{staticClass:"white-card-body p-y-1"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row p-x-1"},[s("div",{staticClass:"col-sm-12"},[t.showingContract?s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-12"},[t.isContractComplete(t.showingContract)?t._e():s("button",{directives:[{name:"b-modal",rawName:"v-b-modal.EndContractModal",modifiers:{EndContractModal:!0}}],staticClass:"btn btn-dark float-right"},[t._v("End Contract"),s("b-modal",{staticClass:"fade",attrs:{id:"EndContractModal",title:"End Contract"}},[s("p",[t._v("ℹ️ Ending this contract will remove you as a collaborator to the project, revoke any permissions granted due to the project, and payout the full contract price.")]),s("p",[s("b",[t._v("Do you want to continue?")])]),s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm"},[t.showingContract.specialist.photo?s("img",{staticClass:"m-r-1 userpic_small",attrs:{src:t.showingContract.specialist.photo}}):t._e(),s("h3",[t._v(t._s(t.showingContract.specialist.first_name)+" "+t._s(t.showingContract.specialist.last_name))]),s("p",[t._v("Specialist")])]),s("div",{staticClass:"col-sm"},[s("span",{staticClass:"float-right"},[t._v("Outstanding Due "),s("br"),t._v(" "+t._s(t._f("usdWhole")(500)))])])])]),s("div",{staticClass:"card-body"},[s("p",[s("b",[t._v("Project name")]),s("span",{staticClass:"float-right"},[t._v(t._s(t.showingContract.title))])]),s("p",[s("b",[t._v("Payment method")]),s("span",{staticClass:"float-right"},[t._v(t._s(t.readablePaymentSchedule(t.showingContract.payment_schedule)))])]),s("p",[s("b",[t._v("Date Issued")]),s("span",{staticClass:"float-right"})]),s("p",[s("b",[t._v("Payment Method")]),s("span",{staticClass:"float-right"},[t._v("Transfer to Visa")])])]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"text-right text-muted"},[t._v("*Transactional fees lorem ipsum dolor.")])])]),s("template",{slot:"modal-footer"},[s("button",{staticClass:"btn",on:{click:function(e){return t.$bvModal.hide("EndContractModal")}}},[t._v("Cancel")]),s("Post",{attrs:{action:t.completeUrl(t.showingContract),model:{}},on:{saved:t.completeSuccess,errors:t.completeErrors}},[s("button",{staticClass:"btn btn-dark m-r-1"},[t._v("Confirm")])])],1)],2)],1),s("Breadcrumbs",{staticClass:"m-y-1",attrs:{items:["Collaborators",t.showingContract.specialist.first_name+" "+t.showingContract.specialist.last_name]}})],1)]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-12"},[s("PropertiesTable",{attrs:{title:"Contract Details",properties:t.proposalProps(t.showingContract)}},[t.isContractComplete(t.showingContract)?t._e():s("EditContractModal",{attrs:{project:t.showingContract},on:{saved:function(e){t.newEtag(),t.tab=0}}})],1)],1)])]):s("div",{staticClass:"card"},[s("div",{staticClass:"card-header d-flex justify-content-between"},[s("h3",{staticClass:"m-y-0"},[t._v("Collaborators")])]),s("div",{staticClass:"card-body"},[s("table",{staticClass:"rating_table"},[s("tbody",t._l(t.getContractsByLocalProject(r),(function(e){return s("tr",{key:e._key},[s("td",[s("button",{staticClass:"btn btn-default float-right",on:{click:function(s){t.showingContract=e}}},[t._v("View Contract")]),e.specialist.photo?s("img",{staticClass:"m-r-1 userpic_small",attrs:{src:e.specialist.photo}}):t._e(),s("b",[t._v(t._s(e.specialist.first_name)+" "+t._s(e.specialist.last_name)+",")]),t._v(" Specialist")]),s("td")])})),0)])])])])])])])])],1)]}}],null,!0)}):s("b-tabs",[s("b-tab",{attrs:{title:"Overview"}},[s("div",{staticClass:"white-card-body p-y-1"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row p-x-1"},[s("div",{staticClass:"col-md-12"},[s("PropertiesTable",{attrs:{title:"Post Details",properties:t.overviewProps(a)}})],1)])])])]),s("b-tab",{attrs:{title:"Proposal"}},[s("div",{staticClass:"white-card-body p-y-1"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row p-x-1"},[s("div",{staticClass:"col-md-12"},[s("Get",{attrs:{application:t.applicationUrl(a.id)},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.application;return[s("PropertiesTable",{attrs:{title:"Proposal",properties:t.proposalProps(r)}},[s("EditProposalModal",{attrs:{"project-id":a.id,"application-id":r.id}},[s("button",{staticClass:"btn btn-outline-dark float-right"},[t._v("Edit")])])],1)]}}],null,!0)})],1)])])])])],1)]}}])})},r=[],i=s("9523"),o=s.n(i),l=s("b2a8"),n=s("2ce4"),c=s("0bbd"),d=s("e6d3"),u=s("2814"),p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("button",{directives:[{name:"b-modal",rawName:"v-b-modal",value:"EditProposalModal",expression:"'EditProposalModal'"}],staticClass:"btn btn-outline-dark"},[t._v("Edit")]),s("b-modal",{attrs:{id:"EditProposalModal",title:"Edit Proposal"},scopedSlots:t._u([{key:"modal-footer",fn:function(e){var a=e.hide;return[s("a",{staticClass:"m-r-1 btn",on:{click:a}},[t._v("Cancel")]),s("Post",{attrs:{method:"PUT",action:"/api/specialist/projects/"+t.projectId+"/applications/"+t.applicationId,model:t.form},on:{errors:function(e){t.errors=e},saved:t.saved}},[s("button",{staticClass:"btn btn-dark"},[t._v("Resubmit")])])]}}])},[s("ModelLoader",{attrs:{url:"/api/specialist/projects/"+t.projectId+"/applications/"+t.applicationId,default:t.initialForm},on:{loaded:t.loaded}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("h3",[t._v("Terms")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm"},[s("InputDate",{attrs:{errors:t.errors.starts_on},model:{value:t.form.starts_on,callback:function(e){t.$set(t.form,"starts_on",e)},expression:"form.starts_on"}},[t._v("Start Date")])],1),s("div",{staticClass:"col-sm"},[s("InputDate",{attrs:{errors:t.errors.ends_on},model:{value:t.form.ends_on,callback:function(e){t.$set(t.form,"ends_on",e)},expression:"form.ends_on"}},[t._v("Due Date")])],1)]),s("InputSelect",{staticClass:"m-t-1",attrs:{errors:t.errors.pricing_type,options:t.pricingTypesOptions},model:{value:t.form.pricing_type,callback:function(e){t.$set(t.form,"pricing_type",e)},expression:"form.pricing_type"}},[t._v("Pricing Type")]),t.isFixedBudget?s("div",[s("InputText",{staticClass:"m-t-1",attrs:{errors:t.errors.fixed_budget},model:{value:t.form.fixed_budget,callback:function(e){t.$set(t.form,"fixed_budget",e)},expression:"form.fixed_budget"}},[t._v("Fixed Budget")]),s("InputSelect",{staticClass:"m-t-1",attrs:{errors:t.errors.fixed_payment_schedule,options:t.fixedPaymentScheduleOptions},model:{value:t.form.fixed_payment_schedule,callback:function(e){t.$set(t.form,"fixed_payment_schedule",e)},expression:"form.fixed_payment_schedule"}},[t._v("Payment Schedule")])],1):s("div",[s("InputText",{staticClass:"m-t-1",attrs:{errors:t.errors.hourly_rate},model:{value:t.form.hourly_rate,callback:function(e){t.$set(t.form,"hourly_rate",e)},expression:"form.hourly_rate"}},[t._v("Hourly Rate")]),s("InputText",{staticClass:"m-t-1",attrs:{errors:t.errors.estimated_hours},model:{value:t.form.estimated_hours,callback:function(e){t.$set(t.form,"estimated_hours",e)},expression:"form.estimated_hours"}},[t._v("Estimated Hours")]),s("InputSelect",{staticClass:"m-t-1",attrs:{errors:t.errors.hourly_payment_schedule,options:t.hourlyPaymentScheduleOptions},model:{value:t.form.hourly_payment_schedule,callback:function(e){t.$set(t.form,"hourly_payment_schedule",e)},expression:"form.hourly_payment_schedule"}},[t._v("Payment Schedule")])],1),s("hr"),s("h3",[t._v("Role")]),s("InputTextarea",{staticClass:"m-t-1",attrs:{errors:t.errors.role_details,rows:4},model:{value:t.form.role_details,callback:function(e){t.$set(t.form,"role_details",e)},expression:"form.role_details"}},[t._v("Role Details")]),s("InputTextarea",{staticClass:"m-t-1",attrs:{errors:t.errors.key_deliverables,rows:4},model:{value:t.form.key_deliverables,callback:function(e){t.$set(t.form,"key_deliverables",e)},expression:"form.key_deliverables"}},[t._v("Key Deliverables")]),s("h3",{staticClass:"m-t-1"},[t._v("Attachments")]),s("div",{staticClass:"card m-b-1"},[s("div",{staticClass:"card-body"},[s("p",[t._v("Drop files here or"),s("a",{staticClass:"btn btn-light"},[t._v("Upload Files")])])])])],1)])])],1)],1)},m=[],_=s("19ae"),v=s("07d1");function f(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function b(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?f(Object(s),!0).forEach((function(e){o()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):f(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var C=Object.keys(v["h"])[0],h=Object.keys(v["h"])[1],y=function(t){return{fixed_payment_schedule:t&&"fixed"==t.pricing_type&&t.payment_schedule||null,hourly_payment_schedule:t&&"hourly"==t.pricing_type&&t.payment_schedule||null}},g=function(t){return b({starts_on:t&&t.starts_on||null,ends_on:t&&t.ends_on||null,payment_schedule:t&&t.payment_schedule||null,pricing_type:t&&j(t)||null,hourly_rate:t&&t.hourly_rate||null,fixed_budget:t&&t.fixed_budget||null,estimated_hours:null,key_deliverables:null,role_details:null},y(t))},j=function(t){return"fixed"==t.pricing_type?C:"hourly"==t.pricing_type?h:void 0},w={props:{projectId:{type:Number,required:!0},project:{type:Object},applicationId:{type:Number,required:!0},proposal:{type:Object}},data:function(){return{form:g(this.proposal),errors:{}}},methods:{saved:function(){var t=this.$root;this.$router.push("/specialist/my-projects/",(function(){return t.toast("Proposal sent"," ")}))},loaded:function(t){Object.assign(this.form,b(b({},t),y(t)))},initialForm:g,calcPricingType:j},computed:{pricingTypesOptions:function(){return v["h"]},fixedPaymentScheduleOptions:function(){return v["a"]},hourlyPaymentScheduleOptions:function(){return v["c"]},isFixedBudget:function(){return C===this.form.pricing_type}},components:{ProjectDetails:_["a"]}},P=w,O=s("2877"),x=Object(O["a"])(P,p,m,!1,null,null,null),k=x.exports,D=s("f774"),E=s("2f62");function S(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function T(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?S(Object(s),!0).forEach((function(e){o()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):S(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var I=function(t){return[{name:"Owner",value:t.business&&t.business.business_name},{name:"Title",value:t.title},{name:"Start Date",value:t.starts_on,filter:"asDate"},{name:"Due Date",value:t.ends_on,filter:"asDate"},{name:"Description",value:t.description},{name:"Role Details",value:t.role_details},{name:"Industry",value:t.industries,filter:"names"},{name:"Jurisdiction",value:t.jurisdictions,filter:"names"},{name:"Minimum Experience",value:t.minimum_experience,filter:"capital"},{name:"Former Regulator?",value:t.only_regulators,filter:"yesNo"},{name:"Skills",value:t.skills,filter:"names"},{name:"fixed"===t.pricing_type?"Estimated Budget":"Hourly Rate",value:"fixed"===t.pricing_type?t.est_budget:t.hourly_rate,filter:"usdWhole"},{name:"Payment Schedule",value:Object(l["b"])(t.payment_schedule)}]},M=function(t){return[{name:"Title",value:t.title},{name:"Start Date",value:t.starts_on,filter:"asDate"},{name:"Due Date",value:t.ends_on,filter:"asDate"},{name:"Description",value:t.description},{name:"Role Details",value:t.role_details}]},$=function(t){return"complete"===t.status},U={mixins:[Object(D["a"])()],props:{id:{type:Number,required:!0}},data:function(){return{tab:0,showingContract:null}},methods:{isApproved:function(t){return this.getUser.id===t.specialist_id},overviewProps:I,acceptedOverviewProps:M,readablePaymentSchedule:l["b"],proposalProps:l["a"],isContractComplete:$,applicationUrl:function(t){return"/api/specialist/projects/"+t+"/applications/my"},getContractsByLocalProject:function(t){return t.projects.filter((function(t){return t.specialist})).map((function(t){return T(T({},t),{},{_key:"".concat(t.id,"_").concat(t.specialist.id)})}))},completeUrl:function(t){return"/api/projects/"+t.id+"/end"},completeSuccess:function(){this.$bvModal.hide("EndContractModal"),this.toast("Success","Project End has been requested")},completeErrors:function(t){t.length&&this.toast("Error","Cannot request End project")},viewContract:function(t){this.tab=3,this.showingContract=t||null}},computed:T(T({},Object(E["c"])(["accessToken","getUser"])),{},{projectUrl:function(){return this.$store.getters.url("URL_API_MY_PROJECT",this.id)},timesheetUrl:function(){return this.$store.getters.url("URL_PROJECT_TIMESHEET",this.id)},showTimesheetBtn:function(){return function(t){return"hourly"===t.pricing_type}}}),components:{ChangeContractAlerts:n["a"],DiscussionCard:c["a"],DocumentList:u["a"],EditContractModal:d["a"],EditProposalModal:k}},R=U,B=Object(O["a"])(R,a,r,!1,null,null,null);e["default"]=B.exports},"19ae":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card-body"},[s("h5",[t._v(t._s(t.project.title))]),s("dl",{staticClass:"row m-t-2"},[s("dt",{staticClass:"col-sm-3"},[t._v("Location")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t.project.location))]),s("dt",{staticClass:"col-sm-3"},[t._v("Industry")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t._f("names")(t.project.industries)))]),s("dt",{staticClass:"col-sm-3"},[t._v("Start Date")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t._f("asDate")(t.project.starts_on)))]),s("dt",{staticClass:"col-sm-3"},[t._v("End Date")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t._f("asDate")(t.project.ends_on)))]),s("dt",{staticClass:"col-sm-3"},[t._v("Min. Experience")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t._f("capital")(t.project.minimum_experience)))]),s("dt",{staticClass:"col-sm-3"},[t._v("Description")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t.project.description))])]),s("p",[t._v(t._s(t.project.role_details))]),s("ProjectFigures",{attrs:{project:t.project}})],1),s("div",{staticClass:"card-body"},[s("h4",{staticClass:"m-t-1"},[t._v("Skills")]),s("p"),t._l(t.project.skills,(function(e){return s("div",{staticClass:"badge badge-default m-r-1"},[t._v(t._s(e.name))])})),s("p")],2),s("div",{staticClass:"card-body"},[s("h4",{staticClass:"m-t-1"},[t._v("Client Details")]),s("ClientDetails",{attrs:{business:t.project.business}})],1)])},r=[],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card m-t-1"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"d-flex align-items-center"},[s("UserAvatar",{staticClass:"mr-2",attrs:{business:t.business}}),s("span",{staticClass:"mr-auto"},[t._v(t._s(t.business.business_name)),s("br"),t._v(t._s(t._f("commas")([t.business.city,t.business.state,t.business.country])))])],1)]),s("div",{staticClass:"card-body"},[s("dl",{staticClass:"row"},[s("dt",{staticClass:"col-sm-3"},[t._v("Industry")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t._f("names")(t.business.industries)))]),s("dt",{staticClass:"col-sm-3"},[t._v("Jurisdictions")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t._f("names")(t.business.jurisdictions)))]),s("dt",{staticClass:"col-sm-3"},[t._v("Employees")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t.business.employees))]),s("dt",{staticClass:"col-sm-3"},[t._v("Description")]),s("dd",{staticClass:"col-sm-9"},[t._v(t._s(t.business.description))])])])])},o=[],l={props:{business:{type:Object,required:!0}}},n=l,c=s("2877"),d=Object(c["a"])(n,i,o,!1,null,null,null),u=d.exports,p=s("e0e0"),m={props:{project:{type:Object,required:!0}},components:{ClientDetails:u,ProjectFigures:p["a"]}},_=m,v=Object(c["a"])(_,a,r,!1,null,null,null);e["a"]=v.exports},e0e0:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"list-group list-group-horizontal w-100 project-figures"},["fixed"===t.project.pricing_type?s("li",{staticClass:"list-group-item"},[s("ion-icon",{staticClass:"float-left mt-3 mr-3",attrs:{name:"cash-outline"}}),t._v("Estimated Budget"),s("br"),s("b",[t._v(t._s(t._f("usdWhole")(t.project.est_budget)))])],1):s("li",{staticClass:"list-group-item"},[s("ion-icon",{staticClass:"float-left mt-3 mr-3",attrs:{name:"cash-outline"}}),t._v("Hourly"),s("br"),s("b",[t._v(t._s(t._f("usdWhole")(t.project.hourly_rate))+" - "+t._s(t._f("usdWhole")(t.project.upper_hourly_rate)))])],1),s("li",{staticClass:"list-group-item"},[s("ion-icon",{staticClass:"float-left mt-3 mr-3",attrs:{name:"cash-outline"}}),t._v("Payment Schedule"),s("br"),s("b",[t._v(t._s(t.paymentScheduleReadable))])],1),s("li",{staticClass:"list-group-item"},[s("ion-icon",{staticClass:"float-left mt-3 mr-3",attrs:{name:"earth-outline"}}),t._v("Jurisdiction"),s("br"),s("b",[t._v(t._s(t._f("names")(t.project.jurisdictions)))])],1)])},r=[],i=s("07d1"),o={props:{project:{type:Object,required:!0}},computed:{paymentScheduleReadable:function(){return i["a"][this.project.payment_schedule]}}},l=o,n=s("2877"),c=Object(n["a"])(l,a,r,!1,null,null,null);e["a"]=c.exports},f774:function(t,e,s){"use strict";var a=s("9523"),r=s.n(a),i=function(){return Math.random()},o=function(t){var e=t||"etag",s="new"+e[0].toUpperCase()+e.substring(1);return{data:function(){return r()({},e,i())},methods:r()({},s,(function(){this[e]=i()}))}};e["a"]=o}}]);
//# sourceMappingURL=chunk-67eb9726.a31f0ae6.js.map