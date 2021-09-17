(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b4d2fad"],{"03be":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page"},[r("div",{staticClass:"page-header"},[t._m(0),r("div",{staticClass:"page-header__actions mt-0 mb-auto"},["basic"!==t.role?r("router-link",{staticClass:"btn btn-default m-r-1",attrs:{to:"/business/projects/new"}},[t._v("Post Project")]):t._e(),r("LocalProjectModal",{on:{saved:t.newEtag}},[r("a",{staticClass:"btn btn-primary"},[t._v("New Project")])])],1)]),r("b-tabs",{staticClass:"special-navs",attrs:{"content-class":"mt-0 h-100"}},[r("b-tab",{attrs:{title:"My Projects",active:""}},[r("div",{staticClass:"card-body white-card-body card-body_full-height"},[r("div",{staticClass:"m-b-20"},[r("b-dropdown",{staticClass:"m-r-1",attrs:{variant:"default"},scopedSlots:t._u([{key:"button-content",fn:function(){return[t._v("Filter by: "+t._s(t.filteredStatus)),r("ion-icon",{staticClass:"ml-2",attrs:{name:"chevron-down-outline",size:"small"}})]},proxy:!0}])},t._l(t.filterStatuses,(function(e,s){return r("b-dropdown-item",{key:s,on:{click:function(e){t.filterStatus=s}}},[t._v(t._s(e))])})),1)],1),r("Get",{attrs:{projects:"/api/local_projects/",etag:t.etag},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.projects;return[r("ProjectTable",{attrs:{projects:t.filterProjects(s)}})]}}])})],1)]),r("b-tab",{attrs:{title:"Contacts"}},[r("div",{staticClass:"card-body white-card-body card-body_full-height"},[r("Get",{attrs:{contacts:"/api/local_projects/",etag:t.etag,callback:t.getContacts},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.contacts;return[r("div",[r("table",{staticClass:"table"},[r("thead",[r("tr",[r("th",[t._v("Name"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),r("th",[t._v("Location"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),r("th",[t._v("Status"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),r("th",{attrs:{width:"140px"}},[t._v("Rating"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1),r("th",{attrs:{width:"40px"}})])]),r("tbody",t._l(s,(function(e){return r("tr",{key:e.id},[r("td",[t._v(t._s(e.name))]),r("td",[t._v(t._s(e.location))]),r("td",[r("div",{staticClass:"badge badge-success"},[t._v(t._s(e.status))])]),r("td",{staticClass:"text-right"},[r("div",{staticClass:"d-flex justify-content-end"},[r("StarsRating",{attrs:{rate:e.rating}})],1)]),r("td",{staticClass:"text-right",attrs:{width:"40px"}},[r("b-dropdown",{staticClass:"m-0 p-0",attrs:{size:"xs",variant:"none",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[r("b-icon",{attrs:{icon:"three-dots"}})]},proxy:!0}],null,!0)},[r("b-dropdown-item",[t._v("Message")]),r("b-dropdown-item",[t._v("Remove Contact")])],1)],1)])})),0)]),!s||s.length||t.loading?t._e():r("div",{staticClass:"row h-100"},[r("div",{staticClass:"col h-100 text-center"},[r("EmptyState",{attrs:{name:"Tasks"}})],1)])])]}}])})],1)]),r("b-tab",{staticClass:"h-100",attrs:{title:"Ratings and Reviews"}},[r("div",{staticClass:"card-body white-card-body card-body_full-height h-100"},[r("Get",{staticClass:"h-100",attrs:{ratings:"/api/project_ratings"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.ratings;return[s.length?r("table",{staticClass:"rating_table"},[r("tbody",t._l(s,(function(e){return r("tr",[r("td",[r("img",{staticClass:"m-r-1 userpic_small",attrs:{src:e.rater_pic}})]),r("td",[r("h3",[t._v(t._s(e.project_title))]),r("p",[t._v(t._s(e.rater_name)+" | "+t._s(t._f("asDate")(e.created_at)))]),r("p",[r("i",[t._v('"'+t._s(e.review)+'"')])])]),r("td",[r("StarRating",{attrs:{stars:e.value}})],1)])})),0)]):t._e(),s.length?t._e():r("div",{staticClass:"d-flex flex-grow-1 justify-content-center align-items-cener h-100"},[r("EmptyState",{attrs:{name:"Tasks"}})],1)]}}])})],1)])],1)],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-header__title"},[r("h2",{staticClass:"m-b-10"},[t._v("Projects")]),r("p",{staticClass:"page-header__subtitle mb-0"},[t._v("Plan projects with employees or hire external specialists to help")])])}],n=r("9523"),o=r.n(n),i=r("2f62"),c=r("90ca"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("table",{staticClass:"table task_table project-table"},[r("thead",[r("tr",[r("th",{staticClass:"project-table__name project-table__name_head"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("title")}}},[t._v("Name"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)]),r("th",{staticClass:"project-table__assignee project-table__assignee_head"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("collaborators_count",!0)}}},[t._v("Collaborators"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)]),r("th",{staticClass:"project-table__left project-table__left_head text-right"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("tasks_left",!0)}}},[t._v("Tasks Left"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)]),r("th",{staticClass:"project-table__coast project-table__coast_head text-right"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("cost_int",!0)}}},[t._v("Cost"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)]),r("th",{staticClass:"project-table__status project-table__status_head"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("status_business")}}},[t._v("Status"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)]),r("th",{staticClass:"project-table__start-date project-table__start-date_head"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("starts_on_int")}}},[t._v("Start Date"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)]),r("th",{staticClass:"project-table__end-date project-table__end-date_head text-right"},[r("span",{staticClass:"pointer",on:{click:function(e){return t.toggleSorting("ends_on_int")}}},[t._v("End Date"),r("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-expand"}})],1)])])]),r("tbody",t._l(t.projectsSorted,(function(e){return r("tr",{key:t.key(e)},[r("td",{staticClass:"project-table__name"},[r("router-link",{staticClass:"link",attrs:{to:""+e.href}},[t._v(t._s(e.title))])],1),r("td",{staticClass:"project-table__assignee"},[r("b-avatar-group",{attrs:{size:"2em"}},t._l(t.projectCollaboratorsAvatars(e),(function(s,a){return r("b-avatar",t._b({key:e.id+"_"+a,attrs:{variant:"light"}},"b-avatar",s,!1))})),1)],1),r("td",{staticClass:"project-table__left text-right"},[t._v(t._s(e.tasks_left||""))]),r("td",{staticClass:"project-table__coast text-right"},[t._v(t._s(t._f("usdWhole")(e.cost)))]),r("td",{staticClass:"project-table__status"},[r("span",{staticClass:"badge",class:t.businessProjectBadgeClass(e)},[t._v(t._s(t._f("underscoreToCapitalized")(e.status_business)))])]),r("td",{staticClass:"project-table__start-date"},[t._v(t._s(t._f("asDate")(e.starts_on)))]),r("td",{staticClass:"project-table__end-date text-right due-date",class:{overdue:t.isOverdue(e)}},[t.isOverdue(e)?r("b-icon",{staticClass:"mr-2",attrs:{icon:"exclamation-triangle-fill",variant:"warning"}}):t._e(),r("span",{staticClass:"end-date"},[t._v(t._s(t._f("asDate")(e.ends_on)))])],1)])})),0)]),t.projectsSorted.length?t._e():r("div",{staticClass:"row h-100"},[r("div",{staticClass:"col h-100 text-center"},[r("EmptyState",{attrs:{name:"Tasks"}})],1)])])},u=[],d=r("05f4");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var _=function(t){return"".concat(t.id).concat(t.type?"-p":"-l")},b=function(t){return t.reminders.filter((function(t){return!t.done_at})).length},h={components:{EmptyState:c["a"]},props:{projects:{type:Array,required:!0}},data:function(){return{sortField:null,sortDirection:1}},methods:{key:_,isOverdue:d["d"],businessProjectBadgeClass:d["b"],toggleSorting:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e?-1:1;this.sortDirection=this.sortField===t?-1*this.sortDirection:r,this.sortField=t},projectCollaboratorsAvatars:function(t){return t.collaborators.map((function(t){return t.photo?{src:t.photo}:{text:"".concat(t.first_name[0]).concat(t.last_name[0])}}))}},computed:{projectsSorted:function(){var t=this;if(this.sortField){var e=function(e,r){var s=[e[t.sortField],r[t.sortField]],a=s[0],n=s[1];return a>n?t.sortDirection:a<n?-1*t.sortDirection:0};return this.projectsPrepared.sort(e)}return this.projectsPrepared},projectsPrepared:function(){var t=this,e=function(t){return t?+t.replace(/\-/g,""):-1};return this.projects.map((function(r){return f(f({},r),{},{href:t.$store.getters.url("URL_PROJECT_SHOW",r.id),tasks_left:b(r),cost_int:e(r.cost),starts_on_int:e(r.starts_on),ends_on_int:e(r.ends_on),collaborators_count:r.collaborators.length})}))}},filters:{underscoreToCapitalized:function(t){return t.replace(/_/g," ").replace(/(?: |\b)(\w)/g,(function(t){return t.toUpperCase()}))}}},v=h,m=r("2877"),g=Object(m["a"])(v,l,u,!1,null,null,null),j=g.exports,y=r("fabf"),C=r("f774"),O=r("0b35");function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var P={all:"All",not_started:"Not Started",draft:"Draft",in_progres:"In Progress",pending:"Pending",complete:"Complete",overdue:"Overdue"},S={mixins:[Object(C["a"])()],data:function(){return{filterStatus:Object.keys(P)[0]}},components:{ProjectTable:j,LocalProjectModal:y["a"],StarsRating:O["a"],EmptyState:c["a"]},methods:{getContacts:function(t){return t.reduce((function(t,e){var r=function(r){var s=e.projects[r].specialist;s&&!t.find((function(t){return t.id===s.id}))&&t.push({id:s.id,name:s.first_name+" "+s.last_name,location:s.location,status:"is_public"===s.visibility?"Available":"Unavailable",rating:5})};for(var s in e.projects)r(s);return t}),[])},filterProjects:function(t){var e=this;return t.filter((function(t){return["all",t.status_business].includes(e.filterStatus)}))}},computed:k(k({},Object(i["c"])({roles:"roles/roles",role:"roles/currentRole",plan:"roles/currentPlan"})),{},{filterStatuses:function(){return P},filteredStatus:function(){return P[this.filterStatus]}})},x=S,D=Object(m["a"])(x,s,a,!1,null,null,null);e["default"]=D.exports},"05f4":function(t,e,r){"use strict";r.d(e,"d",(function(){return p})),r.d(e,"e",(function(){return f})),r.d(e,"i",(function(){return b})),r.d(e,"c",(function(){return h})),r.d(e,"h",(function(){return m})),r.d(e,"a",(function(){return g})),r.d(e,"b",(function(){return j})),r.d(e,"f",(function(){return y})),r.d(e,"g",(function(){return C}));var s=r("448a"),a=r.n(s),n=r("9523"),o=r.n(n),i=r("1315");function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var u=function(t){return t.hasOwnProperty("starts_on")&&t.hasOwnProperty("ends_on")},d=function(t){return t.hasOwnProperty("remindable_type")},p=function(t){return(t.end_date||t.ends_on)&&i["DateTime"].fromISO(t.end_date||t.ends_on)<=i["DateTime"].local().minus({days:1})},f=function(t){return t.repeat_every||t.repeat_on||t.repeats},_=function(t){var e=m(t.id),r=e.oid;return null!==r?t.done_occurencies.hasOwnProperty("".concat(r)):t.completed_at||t.done_at},b=function(t){return l(l(l({},t),m(t.id)),{},{start:t.starts_on||t.remind_at,end:(t.end_date||t.ends_on)+" 20:00:00",title:t.title||t.body,icons:v(t)})},h=function(t){return _(t)?"task-is-complete":p(t)?"task-is-overdue":u(t)?"task-is-project":d(t)?"task-is-task":f(t)?"task-is-repeat":""},v=function(t){return[_(t)?"checkbox-outline":p(t)?"warning":null,u(t)?"list-outline":d(t)?"checkbox-outline":null].filter((function(t){return t})).filter((function(t,e,r){return r.indexOf(t)===e}))},m=function(t){var e=a()("".concat(t).matchAll(/(\d+)_(\d+)/gi));return e&&e[0]?{taskId:+e[0][1],oid:+e[0][2]}:{taskId:t,oid:null}},g=function(t){return"pending"==t.status?"badge-secondary":"inprogress"==t.status?"badge-progress":"complete"==t.status?"badge-success":"draft"==t.status?"badge-secondary":"published"==t.status?"badge-success":p(t)?"badge-warning":""},j=function(t){return"not_started"==t.status_business?"badge-secondary":"in_progress"==t.status_business?"badge-progress":"complete"==t.status_business?"badge-success":"draft"==t.status_business?"badge-secondary":"pending"==t.status_business?"badge-light":""},y=function(t){return"CompliancePolicy"===t.linkable_type?"document-text":"AnnualReport"===t.linkable_type?"reader":"LocalProject"===t.linkable_type||"Exam"===t.linkable_type?"list-circle":""},C=function(t){return"CompliancePolicy"===t.linkable_type?"black":"AnnualReport"===t.linkable_type?"yellow":"LocalProject"===t.linkable_type?"blue":"Exam"===t.linkable_type?"red":""}},"0b35":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"stars-rating"},[r("div",{staticClass:"stars-rating_filled-line",style:t.filledLineStyles}),t._l(t.totalStars,(function(t){return r("div",{key:t,staticClass:"stars-rating_item"})}))],2)},a=[],n={name:"StarsRating",props:{totalStars:{type:Number,default:5},rate:{type:Number,default:0}},data:function(){return{widthOfFilledLine:0}},computed:{transitionDuration:function(){return this.rate/this.totalStars},filledLineStyles:function(){return{width:this.widthOfFilledLine+"%",transitionDuration:this.transitionDuration+"s"}}},mounted:function(){var t=this;window.setTimeout((function(){t.widthOfFilledLine=(t.rate/t.totalStars*100).toFixed(2)}),300)}},o=n,i=(r("671d"),r("2877")),c=Object(i["a"])(o,s,a,!1,null,"91665d90",null);e["a"]=c.exports},"671d":function(t,e,r){"use strict";r("6e21")},"6e21":function(t,e,r){},f774:function(t,e,r){"use strict";var s=r("9523"),a=r.n(s),n=function(){return Math.random()},o=function(t){var e=t||"etag",r="new"+e[0].toUpperCase()+e.substring(1);return{data:function(){return a()({},e,n())},methods:a()({},r,(function(){this[e]=n()}))}};e["a"]=o},fabf:function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:{"d-inline-block":t.inline}},[r("div",{directives:[{name:"b-modal",rawName:"v-b-modal",value:t.modalId,expression:"modalId"}],class:{"d-inline-block":t.inline}},[t._t("default")],2),r("b-modal",{staticClass:"fade",attrs:{id:t.modalId,title:t.projectId?"Edit project":"New project"},on:{show:t.newEtag}},[r("ModelLoader",{attrs:{url:t.projectId?t.submitUrl:void 0,default:t.initialProject,etag:t.etag},on:{loaded:t.loadProject}},[r("label",{staticClass:"form-label"},[t._v("Title")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.project.title,expression:"project.title"}],staticClass:"form-control",attrs:{placeholder:"Enter the name of your project"},domProps:{value:t.project.title},on:{input:function(e){e.target.composing||t.$set(t.project,"title",e.target.value)}}}),r("Errors",{attrs:{errors:t.errors.title}}),r("b-row",{staticClass:"m-t-1",attrs:{"no-gutters":""}},[r("div",{staticClass:"col-sm m-r-1"},[r("label",{staticClass:"form-label"},[t._v("Start Date")]),r("DatePicker",{model:{value:t.project.starts_on,callback:function(e){t.$set(t.project,"starts_on",e)},expression:"project.starts_on"}}),r("Errors",{attrs:{errors:t.errors.starts_on}})],1),r("div",{staticClass:"col-sm"},[r("label",{staticClass:"form-label"},[t._v("Due Date")]),r("DatePicker",{model:{value:t.project.ends_on,callback:function(e){t.$set(t.project,"ends_on",e)},expression:"project.ends_on"}}),r("Errors",{attrs:{errors:t.errors.ends_on}})],1)]),r("label",{staticClass:"m-t-1 form-label"},[t._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.project.description,expression:"project.description"}],staticClass:"form-control",attrs:{rows:"3"},domProps:{value:t.project.description},on:{input:function(e){e.target.composing||t.$set(t.project,"description",e.target.value)}}}),r("Errors",{attrs:{errors:t.errors.description}}),r("div",{staticClass:"form-text text-muted"},[t._v("Optional")])],1),r("template",{slot:"modal-footer"},[r("button",{staticClass:"btn btn-link",on:{click:function(e){return t.$bvModal.hide(t.modalId)}}},[t._v("Cancel")]),r("Post",{attrs:{action:t.submitUrl,model:t.project,method:t.httpMethod},on:{errors:function(e){t.errors=e},saved:t.saved}},[r("button",{staticClass:"btn btn-dark"},[t._v(t._s(t.projectId?"Save":"Create"))])])],1)],2)],1)},a=[],n=r("1315"),o=r("f774"),i=function(){return Math.random().toFixed(10).toString().replace(".","")},c="MM/DD/YYYY",l=function(t,e){return{text:t,value:1+e}},u=function(){return{title:"",starts_on:null,ends_on:null,description:""}},d={mixins:[Object(o["a"])()],props:{projectId:Number,remindAt:String,inline:{type:Boolean,default:!0}},data:function(){return{modalId:"modal_".concat(i()),project:u(),errors:[]}},methods:{loadProject:function(t){this.project=Object.assign({},this.project,t)},saved:function(){this.$emit("saved"),this.toast("Success","The project has been saved"),this.$bvModal.hide(this.modalId),this.newEtag()}},computed:{initialProject:function(){return u},canBeDraft:function(){return!this.projectId||"draft"===this.project.status},submitUrl:function(){var t=this.projectId?"/".concat(this.projectId):"";return"/api/local_projects"+t},httpMethod:function(){return this.projectId?"PUT":"POST"},daysOfWeek:function(){return["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(l)},months:function(){return["January","February","March","April","May","June","July","August","September","October","November","December"].map(l)},dateFormat:function(){return c}},watch:{"project.starts_on":{handler:function(t,e){var r=n["DateTime"].fromSQL(t),s=n["DateTime"].fromSQL(this.project.ends_on);!r.invalid&&(s.invalid||s.startOf("day")<r.startOf("day"))&&(this.project.ends_on=t)}}}},p=d,f=r("2877"),_=Object(f["a"])(p,s,a,!1,null,null,null);e["a"]=_.exports}}]);
//# sourceMappingURL=chunk-5b4d2fad.272bec81.js.map