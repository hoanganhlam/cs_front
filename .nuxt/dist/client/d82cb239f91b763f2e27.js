(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{246:function(t,e,n){var content=n(248);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(65).default)("bc62b418",content,!0,{sourceMap:!1})},247:function(t,e,n){"use strict";var r=n(246);n.n(r).a},248:function(t,e,n){(e=n(64)(!1)).push([t.i,".upload{width:100%;height:100%}.upload .upload-draggable{width:100%;height:100%}.avatar,.upload .upload-draggable{display:flex;flex-direction:column;align-items:center;justify-content:center}.avatar{position:relative}.initials{border:1px solid #ddd}.relative{position:relative}.relative .delete{bottom:.5rem;background-color:red}.medal,.relative .delete{position:absolute;right:.5rem}.medal{top:.5rem;cursor:pointer}",""]),t.exports=e},250:function(t,e,n){var content=n(269);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(65).default)("09db08c2",content,!0,{sourceMap:!1})},251:function(t,e,n){var content=n(271);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(65).default)("57820884",content,!0,{sourceMap:!1})},252:function(t,e,n){"use strict";n(105),n(82),n(27),n(15);var r=n(2),o={props:{text:{},multiple:{type:Boolean,default:!1}},data:function(){return{dropFiles:[],isLoading:!1}},name:"upload",methods:{handleInput:function(data){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,i,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=[],t.isLoading=!0,!t.multiple){e.next=14;break}i=0;case 4:if(!(i<data.length)){e.next=12;break}return e.next=7,t.beforeUpload(data[i]);case 7:r=e.sent,n.push(r);case 9:i++,e.next=4;break;case 12:e.next=18;break;case 14:return e.next=16,t.beforeUpload(data);case 16:o=e.sent,n.push(o);case 18:t.$emit("done",n),t.dropFiles=[],t.isLoading=!1;case 21:case"end":return e.stop()}}),e)})))()},beforeUpload:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(r=new FormData).append("path",t),r.append("title",t.name),n.next=5,e.$axios.$post("/media/medias/",r);case 5:return n.abrupt("return",n.sent);case 6:case"end":return n.stop()}}),n)})))()}}},l=n(18),c={name:"Avatar",components:{Upload:Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-upload",{attrs:{multiple:t.multiple,"drag-drop":""},on:{input:t.handleInput},model:{value:t.dropFiles,callback:function(e){t.dropFiles=e},expression:"dropFiles"}},[n("div",{staticClass:"content has-text-centered"},[n("p",[n("b-icon",{attrs:{icon:"cloud-upload",size:"is-large"}})],1),t._v(" "),t.text?n("p",[t._v(t._s(t.text))]):t._e()]),t._v(" "),n("b-loading",{attrs:{"is-full-page":!1,active:t.isLoading,"can-cancel":!0},on:{"update:active":function(e){t.isLoading=e}}})],1)}),[],!1,null,null,null).exports},props:{canUpdate:{type:Boolean,default:!1},value:{default:null,type:Object},name:{default:null},icon:{default:"account-circle-outline",type:String},size:{default:"thumb_128_128"}},data:function(){return{data:this.value,isUpdating:!1}},methods:{handleUpload:function(t){t.length&&(this.data=t[0],this.isUpdating=!1)},cleanURI:function(t){return t?t.split("?")[0].split("#")[0]:null},avatarName:function(t,e){var n=t.match(/\b(\w)/g);return e?n.join("").substr(0,e):n.join("")}},watch:{data:function(){this.$emit("input",this.data)},value:function(){this.data=this.value}}},d=(n(247),Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"image avatar relative",class:{initials:!(t.isUpdating||t.data&&t.data.sizes)}},[t.isUpdating?n("Upload",{staticClass:"upload",on:{done:t.handleUpload}}):t.data&&t.data.sizes?n("img",{staticClass:"is-round",attrs:{src:t.cleanURI(t.data.sizes[t.size]?t.data.sizes[t.size]:t.data.path),alt:""}}):t.name?n("span",[t._v(t._s(t.avatarName(t.name,2)))]):n("b-icon",{attrs:{icon:t.icon}}),t._v(" "),t.canUpdate?n("div",{staticClass:"medal",on:{click:function(e){t.isUpdating=!t.isUpdating}}},[n("b-icon",{attrs:{size:"is-small",icon:t.isUpdating?"close":"upload"}})],1):t._e(),t._v(" "),t.canUpdate&&t.data?n("div",{staticClass:"delete",on:{click:function(e){t.data=null}}}):t._e()],1)}),[],!1,null,null,null));e.a=d.exports},268:function(t,e,n){"use strict";var r=n(250);n.n(r).a},269:function(t,e,n){(e=n(64)(!1)).push([t.i,".data-elm{margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid #f5f5f5}",""]),t.exports=e},270:function(t,e,n){"use strict";var r=n(251);n.n(r).a},271:function(t,e,n){(e=n(64)(!1)).push([t.i,".sheet-detail .section{padding:1rem 0}.drawer{position:fixed;right:0;top:0;bottom:0;width:600px;background:#fff;border-left:1px solid #eae7ed;overflow-y:auto}",""]),t.exports=e},272:function(t,e,n){"use strict";n.r(e);n(67),n(21),n(22),n(11),n(42),n(43);var r=n(17),o=(n(15),n(2)),l=n(252),c=n(267),d={name:"SheetForm",props:{value:{default:function(){return{title:null,description:null,rows:[]}}}},data:function(){return{data:this.value}},methods:{addRow:function(){this.data.rows.push({label:null,value:null})}},watch:{value:{deep:!0,handler:function(){this.data=this.value}},data:{deep:!0,handler:function(){this.$emit("input",this.data)}}}},v=(n(268),n(18)),h=Object(v.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("b-field",[n("ce",{staticClass:"title",attrs:{elm:"h1",placeholder:"Sheet title"},model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}})],1),t._v(" "),n("b-field",{attrs:{label:"Description"}},[n("editor",{model:{value:t.data.description,callback:function(e){t.$set(t.data,"description",e)},expression:"data.description"}})],1),t._v(" "),n("div",{staticClass:"level is-mobile"},[t._m(0),t._v(" "),n("div",{staticClass:"level-right"},[n("div",{staticClass:"button",on:{click:t.addRow}},[n("b-icon",{attrs:{icon:"plus"}}),t._v(" "),n("span",[t._v("Add")])],1)])]),t._v(" "),t._l(t.data.rows,(function(e,i){return n("div",{key:i,staticClass:"data-elm"},[n("div",{staticClass:"media"},[n("div",{staticClass:"media-content"},[n("b-field",{attrs:{"label-position":"on-border",label:"Label"}},[n("editor",{attrs:{value:e.label},on:{input:function(t){e.label=t}}})],1)],1),t._v(" "),n("div",{staticClass:"media-right"},[n("div",{staticClass:"delete",on:{click:function(e){return t.data.rows.splice(i,1)}}})])]),t._v(" "),n("b-field",{attrs:{"label-position":"on-border",label:"Value"}},[n("editor",{attrs:{value:e.value},on:{input:function(t){e.value=t}}})],1)],1)}))],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"level-left"},[e("h4",{staticClass:"title is-6"},[this._v("Rows")])])}],!1,null,null,null).exports;function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var m={title:"{Name} Cheat Sheet",description:"<i>This is description</i>",sheets:[],settings:{},taxonomies:[],user:null},_={title:null,description:null,rows:[]},x={name:"HomePage",components:{SheetForm:h,Avatar:l.a},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,data,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.$axios,r=t.params,data=m,o=!1,!r.slug||"editor"===r.slug){e.next=9;break}return e.next=6,n.$get("/sheet/cheat-sheets/".concat(r.slug,"/"));case 6:data=e.sent,e.next=10;break;case 9:o=!0;case 10:return null===data.taxonomies&&(data.taxonomies=[]),e.abrupt("return",{data:data,updating:o});case 12:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"editor"===this.$route.params.slug?"Editor":this.data.title}},data:function(){return{active:!1,activeSheet:null,textBar:!1,taxonomy:{results:[]}}},methods:{addSheet:function(){this.data.sheets.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({id:this.generateId()},Object(c.cloneDeep)(_))),this.activeSheet=this.data.sheets[this.data.sheets.length-1],this.active=!0},updateSheet:function(t){this.activeSheet=this.data.sheets[t],this.active=!0},handleUpdate:function(){this.updating?this.save():this.updating=!0},save:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var data,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((data=Object(c.cloneDeep)(t.data)).media=data.media?data.media.id:void 0,data.taxonomies=data.taxonomies?data.taxonomies.map((function(t){return t.id})):[],!t.data.id){e.next=8;break}return e.next=6,t.$axios.$put("/sheet/cheat-sheets/".concat(t.data.slug,"/"),data);case 6:e.next=12;break;case 8:return e.next=10,t.$axios.$post("/sheet/cheat-sheets/",data);case 10:n=e.sent,t.$router.replace({path:"/"+n.slug});case 12:t.updating=!1;case 13:case"end":return e.stop()}}),e)})))()},getQuerySet:Object(c.debounce)((function(text){var t=this;this.$axios.$get("/general/hash-tags/",{params:{search:text}}).then((function(e){t.taxonomy=e}))}),500),onAdd:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!("string"==typeof t&&t.length>3)){n.next=5;break}return n.next=3,e.$axios.$post("/general/hash-tags/",{title:t});case 3:(r=n.sent).id&&(e.data.taxonomies[e.data.taxonomies.indexOf(t)]=r,e.taxonomy.results.push(r));case 5:case"end":return n.stop()}}),n)})))()},beforeAdding:function(t){return-1===this.data.taxonomies.map((function(t){return t.id})).indexOf(t.id)},getTagQuerySet:Object(c.debounce)((function(text){var t=this;this.$axios.$get("/general/hash-tags/",{params:{search:text}}).then((function(e){t.taxonomy=e}))}),500)}},C=(n(270),Object(v.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"hero has-text-centered is-light"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container small"},[n("n-link",{staticClass:"button is-text",attrs:{to:"/"}},[n("b-icon",{attrs:{icon:"chevron-left"}}),t._v(" "),n("span",[t._v("Back to home")])],1),t._v(" "),t.updating||t.data.media?n("avatar",{staticClass:"is-96x96",staticStyle:{margin:"0 auto"},attrs:{"can-update":t.updating},model:{value:t.data.media,callback:function(e){t.$set(t.data,"media",e)},expression:"data.media"}}):t._e(),t._v(" "),n("ce",{staticClass:"title is-1",attrs:{elm:"h1",editable:t.updating,placeholder:"Title"},model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}}),t._v(" "),t.updating?n("editor",{attrs:{value:t.data.description,placeholder:"Description"},on:{input:function(e){t.data.description=e}}}):n("div",{staticClass:"subtitle",domProps:{innerHTML:t._s(t.data.description)}}),t._v(" "),t.updating?n("b-field",[n("b-taginput",{attrs:{data:t.taxonomy.results,autocomplete:"","allow-new":!0,field:"title",icon:"label",placeholder:"Add Tag","before-adding":t.beforeAdding},on:{add:t.onAdd,typing:t.getTagQuerySet},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.option.title))]}}],null,!1,3111879828),model:{value:t.data.taxonomies,callback:function(e){t.$set(t.data,"taxonomies",e)},expression:"data.taxonomies"}},[t._v(" "),n("template",{slot:"empty"},[t._v("got zero result")])],2)],1):t._e(),t._v(" "),t.currentUser?n("div",{staticClass:"button is-text",on:{click:function(e){return t.handleUpdate()}}},[n("b-icon",{attrs:{size:"is-small",icon:"pen"}})],1):t._e()],1)])]),t._v(" "),t.updating?n("div",{staticClass:"hero"},[n("div",{staticClass:"hero-body has-text-centered"},[n("div",{staticClass:"button is-large",on:{click:t.addSheet}},[n("b-icon",{attrs:{icon:"plus"}}),t._v(" "),n("span",[t._v("Add Sheet")])],1)])]):t._e(),t._v(" "),t._l(t.data.sheets,(function(e,i){return n("div",{key:e.id,staticClass:"hero sheet-detail"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container small content"},[n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"},[n("div",{staticClass:"title"},[t._v(t._s(e.title))])]),t._v(" "),t.updating?n("div",{staticClass:"level-right"},[n("div",{staticClass:"button is-text",class:{"is-active":t.activeSheet&&t.activeSheet.id===e.id},on:{click:function(e){return t.updateSheet(i)}}},[n("b-icon",{attrs:{size:"is-small",icon:"pen"}})],1)]):t._e()]),t._v(" "),n("div",{staticClass:"subtitle",domProps:{innerHTML:t._s(e.description)}}),t._v(" "),t._l(e.rows,(function(e,i){return n("div",{key:i,staticClass:"section"},[n("div",{staticClass:"field",domProps:{innerHTML:t._s(e.label)}}),t._v(" "),n("div",{domProps:{innerHTML:t._s(e.value)}})])}))],2)])])})),t._v(" "),t.data.related&&t.data.related.length>1?n("div",{staticClass:"hero"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container small"},[n("div",{staticClass:"card"},[t._m(0),t._v(" "),n("div",{staticClass:"card-content"},t._l(t.data.related,(function(e){return e.id!==t.data.id?n("div",{key:e.id,staticClass:"media"},[n("div",{staticClass:"media-left"},[n("avatar",{staticClass:"is-24x24",attrs:{value:e.media}})],1),t._v(" "),n("div",{staticClass:"media-content"},[n("h3",[n("n-link",{attrs:{to:"/"+e.slug}},[t._v(t._s(e.title))])],1)])]):t._e()})),0)])])])]):t._e(),t._v(" "),t.active?t._e():n("div",{staticClass:"hero"},[t._m(1)]),t._v(" "),n("transition",[t.active?n("div",{staticClass:"drawer"},[n("div",{staticClass:"hero"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container"},[n("div",{staticClass:"level"},[n("div",{staticClass:"level-left widget_title"},[t._v("Add Sheet")]),t._v(" "),n("div",{staticClass:"level-right"},[n("button",{staticClass:"delete",on:{click:function(e){t.active=!1}}})])]),t._v(" "),n("sheet-form",{model:{value:t.activeSheet,callback:function(e){t.activeSheet=e},expression:"activeSheet"}})],1)])])]):t._e()])],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("div",{staticClass:"card-header-title"},[this._v("Related")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container has-text-centered"},[this._v("\n                Credit to: "),e("a",{attrs:{href:"https://simplecheatsheet.com"}},[this._v("Simple Cheat Sheet")])])])}],!1,null,null,null));e.default=C.exports}}]);