(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47fee32e"],{"0935":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page review"},[n("div",{staticClass:"page-header bg-white"},[n("div",[n("h2",{staticClass:"page-header__breadcrumbs"},[e._v("Internal Review")]),n("h2",{staticClass:"page-header__title"},[n("b",[e._v(e._s(e.review?e.review.year:"")+" "+e._s(e.review?e.review.name:""))])])]),n("div",{staticClass:"page-header__actions"},[n("div",[n("button",{staticClass:"btn btn-default mr-3 d-none"},[e._v("Download")]),n("button",{staticClass:"btn btn-dark mr-3",on:{click:function(t){return e.saveAndExit()}}},[e._v("Save and Exit")]),n("button",{staticClass:"btn btn__close",on:{click:e.backToList}},[n("b-icon",{attrs:{icon:"x"}})],1)])])]),n("b-tabs",{staticClass:"reviews__tabs",attrs:{"content-class":"mt-0"},scopedSlots:e._u([{key:"tabs-end",fn:function(){return[n("b-dropdown",{staticClass:"actions",attrs:{text:"Actions",variant:"default",right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v("Actions"),n("b-icon",{staticClass:"m-l-1",attrs:{icon:"chevron-down","font-scale":"1"}})]},proxy:!0}])},[n("AnnualModalEdit",{attrs:{review:e.review||{},inline:!1}},[n("b-dropdown-item",[e._v("Edit")])],1),n("AnnualModalDelete",{attrs:{inline:!1},on:{deleteConfirmed:function(t){return e.deleteReview(e.review.id)}}},[n("b-dropdown-item",{staticClass:"delete"},[e._v("Delete")])],1)],1)]},proxy:!0}])},[n("b-tab",{attrs:{title:"Detail",active:""}},[e.review?n("div",{staticClass:"p-x-40"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-3"},[n("ReviewsList",{attrs:{"annual-id":e.annualId,"current-id":e.revcatId,"reviews-categories":e.review.review_categories}})],1),n("div",{staticClass:"col-md-9 m-b-40"},[n("div",{staticClass:"card-body white-card-body reviews__card"},[n("div",{staticClass:"reviews__card--internal pt-0"},[n("div",{staticClass:"d-flex justify-content-between align-items-center"},[n("h3",[e._v(e._s(e.currentCategory.name))]),n("CommonDeleteModal",{staticClass:"ml-auto",attrs:{title:"Delete Category",content:"This will remove the category from this internal review and all of its associated content.",inline:!1},on:{deleteConfirmed:function(t){return e.deleteCategory(e.currentCategory.id)}}},[n("b-button",{staticClass:"btn btn-default",attrs:{variant:"light"}},[e._v("Delete")])],1)],1)]),e.currentCategory.review_topics?n("div",{staticClass:"reviews__topiclist"},[e._l(e.currentCategory.review_topics,(function(t,i){return[n("div",{key:e.currentCategory.name+"-"+i,staticClass:"reviews__card--internal"},[n("div",{staticClass:"row m-b-2"},[n("div",{staticClass:"col-md-9 col-lg-9 col-xl-10"},[n("textarea-autosize",{staticClass:"reviews__input reviews__topic-name",attrs:{"min-height":30,placeholder:"New Topic"},model:{value:t.name,callback:function(n){e.$set(t,"name",n)},expression:"currentTopic.name"}})],1),n("div",{staticClass:"col-md-3 col-lg-3 col-xl-2 text-right reviews__card--actions"},[n("b-dropdown",{staticClass:"m-0 p-0",attrs:{size:"xs",variant:"light",right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v("Actions"),n("b-icon",{staticClass:"ml-2",attrs:{icon:"chevron-down"}})]},proxy:!0}],null,!0)},[n("b-dropdown-item",{on:{click:function(t){return e.addTopicItem(i)}}},[e._v("New Item")]),n("TaskFormModal",{attrs:{inline:!1},on:{saved:function(t){return e.createTask(i)}}},[n("b-dropdown-item",[e._v("New Task")])],1),n("CommonDeleteModal",{staticClass:"ml-auto",attrs:{title:"Delete Topic",content:"This will remove the topic from this internal review and all of its associated content.",inline:!1},on:{deleteConfirmed:function(t){return e.deleteTopic(i)}}},[n("b-dropdown-item",{staticClass:"delete"},[e._v("Delete")])],1)],1)],1)]),e._l(t.items,(function(a,s){return[n("div",{key:e.currentCategory.name+"-"+i+"-"+s,staticClass:"row mb-2"},[n("div",{staticClass:"col-md-2 col-lg-2 col-xl-1"},[n("div",{staticClass:"reviews__checkbox d-flex justify-content-between"},[n("div",{staticClass:"reviews__checkbox-item reviews__checkbox-item--true",class:{checked:a.checked},on:{click:function(e){a.checked=!0}}},[n("b-icon",{attrs:{icon:"check2"}})],1),n("div",{staticClass:"reviews__checkbox-item reviews__checkbox-item--false",class:{checked:!a.checked},on:{click:function(e){a.checked=!1}}},[n("b-icon",{attrs:{icon:"x"}})],1)])]),n("div",{staticClass:"col-md-7 col-lg-7 col-xl-9 new-item-text"},[n("textarea-autosize",{staticClass:"reviews__input reviews__topic-body",attrs:{placeholder:"New Item"},model:{value:a.body,callback:function(t){e.$set(a,"body",t)},expression:"topicItem.body"}})],1),n("div",{staticClass:"col-md-3 col-lg-3 col-xl-2 text-right reviews__card--dropdown"},[n("b-dropdown",{staticClass:"m-0 p-0",attrs:{size:"xs",variant:"light",right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[n("b-icon",{attrs:{icon:"three-dots"}})]},proxy:!0}],null,!0)},[n("b-dropdown-item",{on:{click:function(t){return e.addFindings(i,s)}}},[e._v("Log Finding")]),n("CommonDeleteModal",{staticClass:"ml-auto",attrs:{title:"Delete Item",content:"This will remove the item from this internal review and all of its associated content.",inline:!1},on:{deleteConfirmed:function(t){return e.deleteTopicItem(i,s)}}},[n("b-dropdown-item",{staticClass:"delete"},[e._v("Delete")])],1)],1)],1),a.findings.length?n("div",{staticClass:"col-md-11 offset-md-1"},[n("label",{staticClass:"form-label"},[e._v("Finding")])]):e._e(),e._l(a.findings,(function(a,r){return[n("div",{key:t.name+"-"+i+"-"+s+"-"+r,staticClass:"col-md-10 offset-md-1"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.currentCategory.review_topics[i].items[s].findings[r],expression:"currentCategory.review_topics[i].items[topicItemIndex].findings[findingIndex]"}],staticClass:"finding-area form-control m-b-1",attrs:{type:"text"},domProps:{value:e.currentCategory.review_topics[i].items[s].findings[r]},on:{input:function(t){t.target.composing||e.$set(e.currentCategory.review_topics[i].items[s].findings,r,t.target.value)}}}),n("button",{staticClass:"btn btn__close float-right",on:{click:function(t){return e.removeFinding(i,s,r)}}},[n("b-icon",{attrs:{icon:"x","font-scale":"1"}})],1)])]}))],2)]}))],2)]}))],2):e._e(),n("div",{staticClass:"reviews__card--internal borderless p-t-20"},[n("div",{staticClass:"d-flex justify-content-between align-items-center"},[n("button",{staticClass:"btn btn-default",on:{click:e.addTopic}},[n("b-icon",{staticClass:"mr-2",attrs:{icon:"plus-circle-fill"}}),e._v("New Topic")],1),n("div",{staticClass:"d-flex justify-content-end"},[n("button",{staticClass:"btn btn-default mr-2",on:{click:e.saveCategory}},[e._v("Save")]),e.currentCategory.complete?n("button",{staticClass:"btn",class:"btn-dark",on:{click:e.markComplete}},[e._v("Mark as Incomplete")]):n("AnnualModalComplite",{attrs:{completedStatus:e.currentCategory.complete,name:e.currentCategory.name,inline:!1},on:{compliteConfirmed:e.markComplete}},[n("button",{staticClass:"btn",class:"btn-dark"},[e._v("Mark as Complete")])])],1)])])])])])]):e._e()]),n("b-tab",{attrs:{title:"Tasks"}},[n("PageTasks")],1),n("b-tab",{attrs:{title:"Documents"}},[n("PageDocuments")],1),n("b-tab",{attrs:{title:"Activity"}},[n("PageActivity")],1)],1)],1)},a=[],s=n("c973"),r=n.n(s),o=n("9523"),c=n.n(o),l=n("a34a"),d=n.n(l),u=n("2f62"),v=n("80cc"),m=n("5f04"),p=n("2cf0"),b=n("5a64"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"d-inline-block":e.inline}},[n("div",{directives:[{name:"b-modal",rawName:"v-b-modal",value:e.modalId,expression:"modalId"}],class:{"d-inline-block":e.inline}},[e._t("default")],2),n("b-modal",{staticClass:"fade",attrs:{id:e.modalId,title:e.title}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-1 text-center px-0"},[n("b-icon",{staticClass:"mt-1 ml-3",attrs:{icon:"dash-circle-fill",width:"25",height:"25",variant:"danger"}})],1),n("div",{staticClass:"col"},[n("p",{staticClass:"paragraph m-b-10"},[e._v(e._s(e.content))]),n("p",{staticClass:"paragraph mb-0"},[n("b",[e._v("Do you want to continue?")])])])]),n("template",{slot:"modal-footer"},[n("button",{staticClass:"btn btn-link",on:{click:function(t){return e.$bvModal.hide(e.modalId)}}},[e._v("Cancel")]),n("button",{staticClass:"btn btn-dark",on:{click:e.submit}},[e._v("Confirm")])])],2)],1)},w=[],g=function(){return Math.random().toFixed(10).toString().replace(".","")},C={props:{inline:{type:Boolean,default:!0},title:{type:String,default:"",required:!0},content:{type:String,default:"",required:!0}},data:function(){return{modalId:"modal_".concat(g())}},methods:{submit:function(e){e.preventDefault(),this.$emit("deleteConfirmed"),this.$bvModal.hide(this.modalId)}}},h=C,_=n("2877"),y=Object(_["a"])(h,f,w,!1,null,null,null),k=y.exports,x=n("6f33"),I=n("05b9"),T=n("1614"),D=n("f245");function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j={props:["annualId","revcatId"],components:{ReviewsList:v["a"],AnnualModalComplite:m["a"],AnnualModalEdit:p["a"],AnnualModalDelete:b["a"],CommonDeleteModal:k,TaskFormModal:x["a"],PageTasks:I["a"],PageDocuments:T["a"],PageActivity:D["a"]},data:function(){return{customToolbar:[["bold","italic","underline"],["blockquote"],[{list:"bullet"}],["link"]]}},computed:R(R({},Object(u["c"])({review:"annual/currentReview"})),{},{currentCategory:function(){var e=this;return this.review.review_categories.find((function(t){return t.id===e.revcatId}))}}),methods:R(R({},Object(u["b"])({updateReviewCategory:"annual/updateReviewCategory",getCurrentReviewReview:"annual/getCurrentReview"})),{},{saveCategory:function(){var e=this;return r()(d.a.mark((function t(){var n,i;return d.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.currentCategory,i=R({annualId:e.annualId},n),t.prev=2,t.next=5,e.updateReviewCategory(i);case 5:return e.toast("Success","Internal review has been saved."),t.next=8,e.getCurrentReviewReview(e.annualId);case 8:t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](2),e.toast("Error",t.t0.message,!0);case 13:case"end":return t.stop()}}),t,null,[[2,10]])})))()},markComplete:function(){var e=this;return r()(d.a.mark((function t(){var n,i,a;return d.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.currentCategory,i=R(R({annualId:e.annualId},n),{},{complete:!n.complete}),t.prev=2,t.next=5,e.updateReviewCategory(i);case 5:return a=i.complete?"complete":"incomplete",e.toast("Success","Category has been marked as ".concat(a,".")),t.next=9,e.getCurrentReviewReview(e.annualId);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](2),e.toast("Error",t.t0.message,!0);case 14:case"end":return t.stop()}}),t,null,[[2,11]])})))()},addTopic:function(){var e=this.currentCategory;e.review_topics?this.currentCategory.review_topics.push({items:[],name:""}):this.currentCategory.review_topics=[{items:[],name:""}]},addTopicItem:function(e){this.currentCategory.review_topics[e].items.push({findings:[],body:"",checked:!1})},addFindings:function(e,t){this.currentCategory.review_topics[e].items[t].findings.push("")},removeFinding:function(e,t,n){var i=this.currentCategory.review_topics[e].items[t].findings[n];i&&i.id?(i["_destroy"]=!0,this.$set(this.currentCategory.review_topics[e].items[t].findings,n,i)):this.currentCategory.review_topics[e].items[t].findings.splice(n,1)},deleteTopicItem:function(e,t){this.currentCategory.review_topics[e].items.splice(t,1)},deleteTopic:function(e){this.currentCategory.review_topics.splice(e,1)},deleteCategory:function(e){var t=this;console.log("currentCategory id: ",e),this.$store.dispatch("annual/deleteReviewCategory",{annualId:this.review.id,id:e}).then((function(e){t.toast("Success","The annual review category has been deleted! ".concat(e.id)),t.$router.push("/business/annual_reviews/".concat(e.annual_report_id))}))["catch"]((function(e){return t.toast("Error","Something wrong! ".concat(e.message),!0)}))},createTask:function(e){console.log("createTask: ",e)},saveAndExit:function(){var e=this;this.saveCategory(),setTimeout((function(){e.$router.push("/business/annual_reviews")}),3e3)},deleteReview:function(e){var t=this;this.$store.dispatch("annual/deleteReview",{id:e}).then((function(e){t.toast("Success","The annual review has been deleted! ".concat(e.id,", true")),t.$router.push("/business/annual_reviews")}))["catch"]((function(e){return t.toast("Error","Something wrong! ".concat(e.message),!0)}))},backToList:function(){this.$router.push({name:"annual-reviews"})}}),mounted:function(){var e=this;return r()(d.a.mark((function t(){return d.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.getCurrentReviewReview(e.annualId);case 3:t.next=8;break;case 5:t.prev=5,t.t0=t["catch"](0),e.toast("Error",t.t0.message,!0);case 8:case"end":return t.stop()}}),t,null,[[0,5]])})))()}},S=j,M=(n("ccd8"),Object(_["a"])(S,i,a,!1,null,"14bd813d",null));t["default"]=M.exports},"0fe3":function(e,t,n){},ccd8:function(e,t,n){"use strict";n("0fe3")}}]);
//# sourceMappingURL=chunk-47fee32e.43ae0013.js.map