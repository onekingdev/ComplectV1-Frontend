(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0eca2209"],{b9f4:function(e,t,s){e.exports=s.p+"img/primary.70f6fdd7.svg"},d81b:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-fluid p-0"},[s("Topbar"),s("div",{staticClass:"wrapper"},[s("Sidebar"),s("main",{staticClass:"main-content"},[s("router-view")],1)],1)],1)},i=[],a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return"settings"!==e.leftSidebar||"builder"!==e.leftSidebar?s("nav",{staticClass:"sidebar-menu",class:[{menuClosed:e.toggleClosedMenu},"builder"===e.leftSidebar?"d-none":""]},["default"===e.leftSidebar||"specialist"===e.userType?s("div",{staticClass:"sidebar-menu__central"},[s("h3",{staticClass:"sidebar-menu__title",class:e.overview_collapse?null:"collapsed",attrs:{"aria-expanded":e.overview_collapse?"true":"false","aria-controls":"overview_collapse"},on:{click:function(t){return e.menuToggle("overview_collapse")}}},[s("ion-icon",{attrs:{name:"list-outline"}}),s("span",[e._v("Overview")]),s("ion-icon",{staticClass:"ml-auto",attrs:{name:"chevron-down-outline"}})],1),s("b-collapse",{attrs:{id:"overview_collapse"},model:{value:e.overview_collapse,callback:function(t){e.overview_collapse=t},expression:"overview_collapse"}},[s("ul",{staticClass:"sidebar-menu__list"},e._l(e.menuLinksOverview,(function(t,n){return s("li",{key:n,staticClass:"nav-item sidebar-menu__item",on:{click:function(t){return t.stopPropagation(),e.openLink("default")}}},[s("router-link",{staticClass:"sidebar-menu__link",attrs:{to:t.to,"active-class":"active",exact:t.exact||!1}},[e._v(e._s(t.label))])],1)})),0)]),"specialist"!==e.userType?s("div",[s("h3",{staticClass:"sidebar-menu__title",class:e.program_management_collapse?null:"collapsed",attrs:{"aria-expanded":e.program_management_collapse?"true":"false","aria-controls":"program_management_collapse"},on:{click:function(t){return e.menuToggle("program_management_collapse")}}},[s("ion-icon",{attrs:{name:"document-text-outline"}}),s("span",[e._v("Program Management")]),s("ion-icon",{staticClass:"ml-auto",attrs:{name:"chevron-down-outline"}})],1),s("b-collapse",{attrs:{id:"program_management_collapse"},model:{value:e.program_management_collapse,callback:function(t){e.program_management_collapse=t},expression:"program_management_collapse"}},[s("ul",{staticClass:"sidebar-menu__list"},e._l(e.menuLinksProgramManagement,(function(t,n){return s("li",{key:n,staticClass:"nav-item sidebar-menu__item",on:{click:function(t){return t.stopPropagation(),e.openLink("default")}}},[s("router-link",{staticClass:"sidebar-menu__link",attrs:{to:t.to,"active-class":"active",exact:t.exact||!1}},[e._v(e._s(t.label))])],1)})),0)])],1):e._e(),s("div",{staticClass:"dropdown-divider"}),s("router-link",{staticClass:"sidebar-menu__link sidebar-menu__link_settings",attrs:{to:"/"+e.userType+"/settings","active-class":"active"}},[s("h3",{staticClass:"sidebar-menu__title sidebar-menu__title_settings"},[s("ion-icon",{attrs:{name:"settings-outline"},on:{click:function(t){return t.stopPropagation(),e.openLink("settings")}}}),s("span",[e._v("Settings")])],1)])],1):e._e(),"specialist"!==e.userType&&"documents"===e.leftSidebar?s("div",{staticClass:"sidebar-menu__central"},[s("h3",{staticClass:"sidebar-menu__title",class:e.files?null:"collapsed",attrs:{"aria-expanded":e.files?"true":"false","aria-controls":"files"},on:{click:function(t){return e.menuToggle("files")}}},[s("ion-icon",{attrs:{name:"document-text-outline"}}),s("span",[e._v("Files")]),s("ion-icon",{staticClass:"ml-auto",attrs:{name:"chevron-down-outline"}})],1),s("b-collapse",{attrs:{id:"files"},model:{value:e.files,callback:function(t){e.files=t},expression:"files"}},[s("ul",{staticClass:"sidebar-menu__list"},e._l(e.menuLinksFiles,(function(t,n){return s("li",{key:n,staticClass:"nav-item sidebar-menu__item",on:{click:function(t){return t.stopPropagation(),e.openLink("documents")}}},[s("router-link",{staticClass:"sidebar-menu__link",attrs:{to:t.to,"active-class":"active",exact:t.exact||!1}},[e._v(e._s(t.label))])],1)})),0)]),s("div",{staticClass:"dropdown-divider"}),s("router-link",{staticClass:"sidebar-menu__link sidebar-menu__link_settings",attrs:{to:"/"+e.userType+"/settings","active-class":"active"}},[s("h3",{staticClass:"sidebar-menu__title sidebar-menu__title_settings"},[s("ion-icon",{attrs:{name:"settings-outline"},on:{click:function(t){return t.stopPropagation(),e.openLink("settings")}}}),s("span",[e._v("Settings")])],1)])],1):e._e(),"business"===e.userType&&"reports"===e.leftSidebar?s("div",{staticClass:"sidebar-menu__central"},[s("h3",{staticClass:"sidebar-menu__title",class:e.reports?null:"collapsed",attrs:{"aria-expanded":e.reports?"true":"false","aria-controls":"reports"},on:{click:function(t){return e.menuToggle("reports")}}},[s("ion-icon",{attrs:{name:"document-text-outline"}}),s("span",[e._v("Reports")]),s("ion-icon",{staticClass:"ml-auto",attrs:{name:"chevron-down-outline"}})],1),s("b-collapse",{attrs:{id:"reports"},model:{value:e.reports,callback:function(t){e.reports=t},expression:"reports"}},[s("ul",{staticClass:"sidebar-menu__list"},e._l(e.menuLinksReports,(function(t,n){return s("li",{key:n,staticClass:"nav-item sidebar-menu__item",on:{click:function(t){return t.stopPropagation(),e.openLink("reports")}}},[s("router-link",{staticClass:"sidebar-menu__link",attrs:{to:t.to,"active-class":"active",exact:t.exact||!1}},[e._v(e._s(t.label))])],1)})),0)]),s("div",{staticClass:"dropdown-divider"}),s("router-link",{staticClass:"sidebar-menu__link sidebar-menu__link_settings",attrs:{to:"/"+e.userType+"/settings","active-class":"active"}},[s("h3",{staticClass:"sidebar-menu__title sidebar-menu__title_settings"},[s("ion-icon",{attrs:{name:"settings-outline"},on:{click:function(t){return t.stopPropagation(),e.openLink("settings")}}}),s("span",[e._v("Settings")])],1)])],1):e._e(),s("div",{staticClass:"dropdown-divider"}),s("button",{staticClass:"sidebar-menu__btn",on:{click:function(t){e.toggleClosedMenu=!e.toggleClosedMenu}}},[s("span",[e._v("Collapse menu")]),s("div",{class:e.toggleClosedMenu?"":"flip-horizontal"},[s("ion-icon",{attrs:{name:"log-in-outline"}})],1)])]):e._e()},r=[],o=s("9523"),l=s.n(o),c=s("2f62");function u(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function p(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?u(Object(s),!0).forEach((function(t){l()(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var m={data:function(){return{overview_collapse:!0,program_management_collapse:!0,files:!0,reports:!0,toggleClosedMenu:!1}},methods:{openLink:function(e){window.innerWidth<576&&(this.overview_collapse=!0,this.program_management_collapse=!0,this.files=!0,this.toggleClosedMenu=!1),"settings"!==e?"reports"!==e?("documents"===e&&this.$store.commit("changeSidebar","documents"),"documents"!==e&&this.$store.commit("changeSidebar","default")):this.$store.commit("changeSidebar","reports"):this.$store.commit("changeSidebar","settings")},menuToggle:function(e){if(window.innerWidth<576)return this.toggleClosedMenu=!this.toggleClosedMenu,void(this[e]=!0);this[e]=!this[e]},checkRouteAndChangeSidebar:function(){window.innerWidth<576&&(this.overview_collapse=!1,this.program_management_collapse=!1,this.files=!1);var e=this.$route.name;"settings-general"!==e&&"settings-users"!==e&&"settings-roles"!==e&&"settings-security"!==e&&"settings-subscriptions"!==e&&"settings-billings"!==e&&"settings-notifications"!==e&&"settings-notification-center"!==e&&"specialists-marketplace"!==e&&"profile"!==e&&"settings-specialist"!==e&&"settings-general-specialist"!==e&&"settings-users-specialist"!==e&&"settings-roles-specialist"!==e&&"settings-security-specialist"!==e&&"settings-subscriptions-specialist"!==e&&"settings-billings-specialist"!==e&&"settings-notifications-specialist"!==e&&"annual-reviews-general"!==e&&"annual-reviews-review-category"!==e&&"exam-management-current-review"!==e&&"policy-current"!==e&&"settings"!==e?"reports"!==e&&"reports-risks"!==e&&"reports-organizations"!==e&&"reports-financials"!==e?("file-folders"!==e&&"exam-management"!==e&&"exam-management-current-review"!==e&&"settings"!==e&&"settings-notification-center"!==e||this.$store.commit("changeSidebar","documents"),"policies"!==e&&"annual-reviews"!==e||this.$store.commit("changeSidebar","default")):this.$store.commit("changeSidebar","reports"):this.$store.commit("changeSidebar","builder")}},computed:p(p({},Object(c["c"])({leftSidebar:"leftSidebar",role:"roles/currentRole",plan:"roles/currentPlan",userType:"userType",appModule:"appModule"})),{},{menuLinksOverview:function(){return"business"===this.appModule?this.menuLinksOverviewBusiness:this.menuLinksOverviewSpecialist},menuLinksOverviewBusiness:function(){return[{to:"/business",label:"Dashboard",exact:!0},{to:"/business/reminders",label:"Tasks"},{to:"/business/projects",label:"Projects"}]},menuLinksOverviewSpecialist:function(){return[{to:"/specialist",label:"Dashboard",exact:!0},{to:"/specialist/reminders",label:"Tasks"},{to:"/specialist/my-projects",label:"Projects"}]},menuLinksProgramManagement:function(){var e=this,t="business"===this.appModule?this.menuLinksProgramManagementBusiness:this.menuLinksProgramManagementSpecialist;return this.role?t.filter((function(t){return-1!==t.access.indexOf(e.role)})):t},menuLinksProgramManagementBusiness:function(){return[{to:"/business/compliance_policies",label:"Policies and Procedures",exact:!0,access:["basic","trusted","admin"]},{to:"/business/annual_reviews",label:"Internal Reviews",access:["trusted","admin"]},{to:"/business/risks",label:"Risk Register",access:["basic","trusted","admin"]}]},menuLinksProgramManagementSpecialist:function(){return[{to:"/specialist/compliance_policies",label:"Policies and Procedures",exact:!0},{to:"/specialist/annual_reviews",label:"Internal Reviews"},{to:"/specialist/risks",label:"Risk Register"}]},menuLinksFiles:function(){var e=this,t="business"===this.appModule?this.menuLinksFilesBusiness:this.menuLinksFilesSpecialist;return this.role?t.filter((function(t){return-1!==t.access.indexOf(e.role)})):t},menuLinksFilesBusiness:function(){return[{to:"/business/file_folders",label:"Book and Records",exact:!0,access:["basic","trusted","admin"]},{to:"/business/exam_management",label:"Exam Management",access:["trusted","admin"]}]},menuLinksFilesSpecialist:function(){return[]},menuLinksReports:function(){var e=this,t="business"===this.appModule?this.menuLinksReportsBusiness:this.menuLinksReportsSpecialist;return this.role?t.filter((function(t){return-1!==t.access.indexOf(e.role)})):t},menuLinksReportsBusiness:function(){return[{to:"/business/reports/organizations",label:"Organization",exact:!0,access:["basic","trusted","admin"]},{to:"/business/reports/risks",label:"Risks",access:["trusted","admin"]},{to:"/business/reports/financials",label:"Financials",access:["admin"]}]},menuLinksReportsSpecialist:function(){return[]}}),mounted:function(){this.checkRouteAndChangeSidebar()},watch:{$route:function(){this.checkRouteAndChangeSidebar()}}},d=m,_=s("2877"),b=Object(_["a"])(d,a,r,!1,null,"6154f401",null),g=b.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"topbar"},[n("div",{staticClass:"logo",on:{click:function(t){return e.openLink("default")}}},[n("router-link",{staticClass:"logo__link",attrs:{to:"/"+e.appModule}},[n("img",{staticClass:"logo__img logo__img_small",attrs:{src:s("b9f4"),width:"24",height:"24"}})])],1),n("b-navbar",{staticClass:"p-0",attrs:{toggleable:"lg"}},[n("b-navbar-toggle",{staticClass:"justify-content-center",attrs:{target:"nav-collapse"}},[e._v("Menu"),n("ion-icon",{staticClass:"ml-2",attrs:{name:"chevron-down-outline"}})],1),n("b-collapse",{staticClass:"topbar-menu",attrs:{id:"nav-collapse"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[n("ul",{staticClass:"topbar-menu__list"},[n("li",{staticClass:"nav-item topbar-menu__item",on:{click:function(t){return e.openLink("default")}}},[n("router-link",{staticClass:"topbar-menu__link",attrs:{to:"/"+e.appModule,"active-class":"active",exact:""}},[e._v("Home")])],1),"business"===e.appModule?n("li",{staticClass:"nav-item topbar-menu__item",on:{click:function(t){return e.openLink("documents")}}},[n("router-link",{staticClass:"topbar-menu__link",attrs:{to:"/"+e.appModule+"/file_folders","active-class":"active"}},[e._v("Documents")])],1):e._e(),"basic"!==e.role?n("li",{staticClass:"nav-item topbar-menu__item",on:{click:function(t){return e.openLink("reports")}}},[n("router-link",{staticClass:"topbar-menu__link",attrs:{to:"/"+e.appModule+"/reports/organizations","active-class":"active"}},[e._v("Reports")])],1):e._e(),n("li",{staticClass:"nav-item topbar-menu__item d-none"},[n("a",{staticClass:"topbar-menu__link",attrs:{"aria-current":"page",href:"#"}},[e._v("Community")])]),"specialist"!==e.appModule&&"basic"!==e.role?n("li",{staticClass:"nav-item topbar-menu__item d-sm-none",on:{click:function(t){return e.openLink("default")}}},[n("router-link",{staticClass:"topbar-menu__link",attrs:{to:"/specialistmarketplace","active-class":"active"}},[e._v("Find an Expert")])],1):e._e(),"specialist"===e.appModule?n("li",{staticClass:"nav-item topbar-menu__item d-sm-none",on:{click:function(t){return e.openLink("default")}}},[n("router-link",{staticClass:"topbar-menu__link",attrs:{to:"/job_board","active-class":"active"}},[e._v("Browse Projects")])],1):e._e()])])],1),n("b-navbar-nav",{staticClass:"flex-row align-items-center ml-auto"},["specialist"!==e.appModule&&"basic"!==e.role?n("router-link",{staticClass:"btn btn-warning btn-topbar btn-topbar_find",attrs:{to:"/specialistmarketplace"}},[e._v("Find an Expert")]):e._e(),"specialist"===e.appModule?n("router-link",{staticClass:"btn btn-warning btn-topbar btn-topbar_find",attrs:{to:"/job_board"}},[e._v("Browse Projects")]):e._e(),n("router-link",{staticClass:"btn btn-topbar btn-topbar_notify",attrs:{to:"/"+e.appModule+"/settings/notification-center"}},[n("ion-icon",{attrs:{name:"notifications-outline"}})],1),n("b-nav-item-dropdown",{staticClass:"topbar-right-dropdown actions",attrs:{right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[n("UserAvatar",{staticClass:"topbar-right-dropdown__avatar",attrs:{user:e.account,sm:!0}}),n("span",{staticClass:"topbar-right-dropdown__name"},[e._v(e._s(e.account.first_name)+" "+e._s(e.account.last_name))]),n("ion-icon",{staticClass:"topbar-right-dropdown__icon",attrs:{name:"chevron-down-outline"}})]},proxy:!0}])},[e.activeContracts&&e.activeContracts.length?n("li",[n("div",{staticClass:"dropdown-item",on:{click:function(t){return e.openSelectedBusiness(null)}}},[e._v("Back")])]):e._e(),e._l(e.activeContracts,(function(t,s){return e.activeContracts?n("li",{key:s},[n("div",{staticClass:"dropdown-item",on:{click:function(s){return e.openSelectedBusiness(t)}}},[e._v(e._s(t.business_name))])]):e._e()})),n("li",{on:{click:function(t){return e.openLink("documents")}}},[n("router-link",{staticClass:"dropdown-item",attrs:{to:"/"+e.appModule+"/profile","active-class":"active"}},[e._v("Profile")])],1),n("b-dropdown-item",{on:{click:e.signOut}},[e._v("Sign Out")])],2)],1)],1)},f=[],h=s("5fcc");function k(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function w(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?k(Object(s),!0).forEach((function(t){l()(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):k(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var C={name:"index",components:{UserAvatar:h["a"]},data:function(){return{visible:!0,account:{first_name:"",last_name:""}}},computed:w(w({},Object(c["c"])({appModule:"appModule",roles:"roles/roles",role:"roles/currentRole"})),{},{activeContracts:function(){return this.roles}}),created:function(){window.addEventListener("resize",this.screenWidthChangeHandler),window.innerWidth<1e3&&(this.visible=!1);var e=JSON.parse(localStorage.getItem("app.currentUser"));this.account={first_name:e.contact_first_name?"".concat(e.contact_first_name):"".concat(e.first_name),last_name:e.contact_last_name?"".concat(e.contact_last_name):"".concat(e.last_name)}},destroyed:function(){window.removeEventListener("resize",this.screenWidthChangeHandler)},methods:{screenWidthChangeHandler:function(e){window.innerWidth<=991.98&&(this.visible=!1),window.innerWidth>991.98&&(this.visible=!0)},signOut:function(){fetch(this.$store.getters.backendUrl+"/api/users/sign_out",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:JSON.parse(localStorage.getItem("app.currentUser.token"))}}).then((function(e){return e.json()})).then((function(e){localStorage.clear(),window.location.href="".concat(window.location.origin)}))["catch"]((function(e){return console.error(e)}))},openLink:function(e){"reports"!==e?("documents"===e&&this.$store.commit("changeSidebar","documents"),"documents"!==e&&this.$store.commit("changeSidebar","default")):this.$store.commit("changeSidebar","reports")},openSelectedBusiness:function(e){e&&(localStorage.setItem("app.business_id",e.business_id),localStorage.setItem("app.currentUser.role",e.role),window.location.href="/business"),e||(localStorage.removeItem("app.business_id"),localStorage.removeItem("app.currentUser.role"),window.location.href="/specialist")}},watch:{$route:function(){window.innerWidth<992&&(this.visible=!1)}}},y=C,S=Object(_["a"])(y,v,f,!1,null,null,null),O=S.exports,x={components:{Sidebar:g,Topbar:O},data:function(){return{userType:localStorage.getItem("app.currentUser.userType")?JSON.parse(localStorage.getItem("app.currentUser.userType")):""}},mounted:function(){this.$store.dispatch("roles/getRoles"),this.userType||(this.userType=window.location.pathname.split("/")[1]),"business"===this.userType&&(this.userType="".concat(this.userType,"es")),"specialist"===this.userType&&(this.userType="".concat(this.userType,"s")),localStorage.setItem("app.currentUser.userType",JSON.stringify(this.userType)),this.$store.dispatch("roles/getCurrentAccount",{userType:this.userType})}},L=x,P=Object(_["a"])(L,n,i,!1,null,null,null);t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-0eca2209.61d3b187.js.map