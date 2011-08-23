YUI.add("gallery-querybuilder",function(a){var d=(0<a.UA.ie&&a.UA.ie<9);function b(k,j,l){if(!a.FormManager){a.FormManager={row_marker_class:"",field_marker_class:"",status_marker_class:"",required_class:""};}this.var_list=k.slice(0);this.op_list=a.clone(j,true);this.op_list.none=[];this.row_list=[];b.superclass.constructor.call(this,l);}b.NAME="querybuilder";b.ATTRS={chooseVarPrompt:{value:"Choose a Variable",validator:a.Lang.isString,writeOnce:true},fieldPrefix:{value:"",validator:a.Lang.isString,writeOnce:true},pluginConfig:{value:{},validator:a.Lang.isObject,writeOnce:true}};function f(){this.var_list.unshift({name:"yui3-querybuilder-choose-prompt",type:"none",text:this.get("chooseVarPrompt")});}function i(l,m){var k=l.length;for(var j=0;j<k;j++){if(l[j].row==m){return j;}}return -1;}function h(k,j){this.appendNew();}function g(l,k){var j=i(this.row_list,k);if(j>=0){this.remove(j);}}function c(l,k){var j=i(this.row_list,k);if(j>=0){this.update(j);}}function e(j){if(j.keyCode!=13){this._notifyChanged();}}a.extend(b,a.Widget,{initializer:function(j){var k=this.get("fieldPrefix");this.var_menu_name_pattern=k+"query_var_{i}";this.get("pluginConfig").field_prefix=k;this.plugin_column_count=0;f.call(this);},renderUI:function(){var j=this.get("contentBox");j.on("change",this._notifyChanged,this);j.on("keyup",e,this);this.table=a.Node.create("<table></table>");j.appendChild(this.table);this.appendNew();},destructor:function(){for(var j=0;j<this.row_list.length;j++){if(this.row_list[j].plugin){this.row_list[j].plugin.destroy();}}this.row_list=null;this.table=null;},reset:function(k,j){this._allow_remove_last_row=true;for(var l=this.row_list.length-1;l>=0;l--){this.remove(l);}this._allow_remove_last_row=false;if(k){this.var_list=k.slice(0);f.call(this);}if(j){this.op_list=a.clone(j,true);this.op_list.none=[];}this.has_messages=false;this.appendNew();},appendNew:function(m,w){if(m&&this.row_list.length==1){var o=this.row_list[0].var_menu;if(o.get("selectedIndex")===0){for(var r=0;r<this.var_list.length;r++){if(this.var_list[r].name==m){o.set("selectedIndex",r);break;}}this.update(0,w);return this.row_list[0].plugin;}}var u=this.row_list.length;var k=a.Node.create("<tbody></tbody>");k.set("className",a.FormManager.row_marker_class);var t=a.Node.create("<tr></tr>");t.set("className",this.getClassName("error"));k.appendChild(t);var l=this._createContainer();l.set("colSpan",1+this.plugin_column_count);l.set("innerHTML",'<p class="'+a.FormManager.status_marker_class+'"></p>');t.appendChild(l);t.appendChild(this._createContainer());var q=a.Node.create("<tr></tr>");q.set("className",this.getClassName("criterion"));k.appendChild(q);var j=this._createContainer();j.set("className",this.getClassName("variable"));q.appendChild(j);j.set("innerHTML",this._variablesMenu(this.variableName(u)));var o=j.one("select");o.on("change",c,this,q);var x=a.Node.getDOMNode(o).options;for(var r=0;r<this.var_list.length;r++){x[r]=new Option(this.var_list[r].text,this.var_list[r].name);if(this.var_list[r].name==m){o.set("selectedIndex",r);}}if(d){o.on("change",this._notifyChanged,this);}var s=this._createContainer();s.set("className",this.getClassName("controls"));s.set("innerHTML",this._rowControls());q.appendChild(s);var n=s.one("."+this.getClassName("insert"));if(n){n.on("click",h,this,q);}var v=s.one("."+this.getClassName("remove"));if(v){v.on("click",g,this,q);}this.table.appendChild(k);var p={body:k,row:q,var_menu:o,control:s,error:l};this.row_list.push(p);this.update(u,w);k.scrollIntoView();return this.row_list[u].plugin;},update:function(u,v){var r=this.row_list[u].row;var t=this.row_list[u].control;this.row_list[u].error.one("."+a.FormManager.status_marker_class).set("innerHTML","");if(this.row_list[u].plugin){this.row_list[u].plugin.destroy();this.row_list[u].plugin=null;}while(r.get("children").size()>2){var m=r.get("children").item(0).next();m.remove(true);}var n=this.row_list[u].var_menu;var l=this.var_list[n.get("selectedIndex")];var w=[];if(l.type=="none"){r.addClass(this.getClassName("empty"));}else{r.removeClass(this.getClassName("empty"));this.row_list[u].plugin=new b.plugin_mapping[l.type](this,this.get("pluginConfig"));w=this.row_list[u].plugin.create(u,l,this.op_list[l.type],v);}while(w.length<this.plugin_column_count){w.push(this._createContainer());}for(var q=0;q<w.length;q++){r.insertBefore(w[q],t);}if(w.length>this.plugin_column_count){var k=1+w.length;for(var q=0;q<this.row_list.length;q++){var x=this.row_list[q].row;this.row_list[q].error.set("colSpan",k);if(x!=r){var p=this.row_list[q].control;for(var o=this.plugin_column_count;o<w.length;o++){x.insertBefore(this._createContainer(),p);}}}this.plugin_column_count=w.length;}var s=this.row_list[u].plugin;if(s&&a.Lang.isFunction(s.postCreate)){this.row_list[u].plugin.postCreate(u,l,this.op_list[l.type],v);}},remove:function(k){if(this.row_list.length<=0){return false;}if(!this._allow_remove_last_row&&this.row_list.length==1){var j=this.row_list[0].var_menu;j.set("selectedIndex",0);this.update(0);this.fire("queryChanged",{remove:true});return true;}var l=this.row_list[k].body;if(l===null){return false;}if(this.row_list[k].plugin){this.row_list[k].plugin.destroy();}l.remove(true);this.row_list.splice(k,1);a.Array.each(this.row_list,function(p,n){var m=p.var_menu;m.setAttribute("name",this.variableName(n));var o=this.var_list[m.get("selectedIndex")];if(o.type!="none"){p.plugin.updateName(n);}},this);this.fire("queryChanged",{remove:true});return true;},validateFields:function(){this.clearFieldMessages();var j=true;a.Array.each(this.row_list,function(m,k){var l;m.row.all("input").some(function(o){l=a.FormManager.validateFromCSSData(o);if(l.error){this.displayFieldMessage(o,l.error,"error");j=false;return true;}},this);if((!l||l.keepGoing)&&m.plugin&&a.Lang.isFunction(m.plugin.validate)){j=m.plugin.validate()&&j;}},this);return j;},clearFieldMessages:function(){this.has_messages=false;this.get("contentBox").all("input").each(function(j){a.FormManager.clearMessage(j);
});this.get("contentBox").all("select").each(function(j){a.FormManager.clearMessage(j);});},displayFieldMessage:function(l,m,k,j){if(a.FormManager.displayMessage(l,m,k,this.has_messages,j)){this.has_messages=true;return true;}else{return false;}},getPlugin:function(j){return this.row_list[j].plugin;},toDatabaseQuery:function(){var k=[];for(var m=0;m<this.row_list.length;m++){var p=this.row_list[m];var n=p.plugin;if(n){var o=n.toDatabaseQuery();for(var l=0;l<o.length;l++){k.push([p.var_menu.get("value")].concat(o[l]));}}}return k;},_createContainer:function(){return a.Node.create("<td></td>");},_notifyChanged:function(){this.fire("queryChanged");},variableName:function(j){return a.Lang.sub(this.var_menu_name_pattern,{i:j});},_variablesMenu:function(k){var j='<select name="{n}" class="{f} {c}" />';return a.Lang.sub(j,{n:k,f:a.FormManager.field_marker_class,c:this.getClassName("field")});},_rowControls:function(){var j='<span class="{ci}"></span>'+'<span class="{cr}"></span>';if(!this._controls_markup){this._controls_markup=a.Lang.sub(j,{ci:this.getClassName("insert"),cr:this.getClassName("remove")});}return this._controls_markup;}});a.QueryBuilder=b;a.QueryBuilder.Env={has_bubble_problem:d};b.String=function(k,j){this.qb=k;this.op_menu_name_pattern=j.field_prefix+"query_op_{i}";this.val_input_name_pattern=j.field_prefix+"query_val_{i}";};b.String.prototype={create:function(o,n,j,p){var m=this.qb._createContainer();m.set("className",this.qb.getClassName("operator"));m.set("innerHTML",this._operationsMenu(this.operationName(o)));this.op_menu=m.one("select");var k=a.Node.getDOMNode(this.op_menu).options;for(var l=0;l<j.length;l++){k[l]=new Option(j[l].text,j[l].value);}p=p||["",""];if(p[0]){this.op_menu.set("value",p[0]);}if(d){this.op_menu.on("change",this.qb._notifyChanged,this.qb);}var q=this.qb._createContainer();q.set("className",this.qb.getClassName("value"));q.set("innerHTML",this._valueInput(this.valueName(o),n.validation));this.value_input=q.one("input");this.value_input.set("value",p[1]);return[m,q];},postCreate:function(l,k,j,m){a.Lang.later(1,this,function(){if(this.value_input){if(k.autocomplete){var n=a.clone(k.autocomplete);n.render=a.one("body");this.value_input.plug(a.Plugin.AutoComplete,n);if(k.autocomplete.containerClassName){this.value_input.ac.get("boundingBox").addClass(k.autocomplete.containerClassName);}}try{this.value_input.focus();}catch(o){}}});},destroy:function(){if(this.value_input.unplug){this.value_input.unplug(a.Plugin.AutoComplete);}this.op_menu=null;this.value_input=null;},updateName:function(j){this.op_menu.setAttribute("name",this.operationName(j));this.value_input.setAttribute("name",this.valueName(j));},set:function(j,k){this.op_menu.set("value",k[this.operationName(j)]);this.value_input.set("value",k[this.valueName(j)]);},toDatabaseQuery:function(){return[[this.op_menu.get("value"),this.value_input.get("value")]];},operationName:function(j){return a.Lang.sub(this.op_menu_name_pattern,{i:j});},valueName:function(j){return a.Lang.sub(this.val_input_name_pattern,{i:j});},_operationsMenu:function(k){var j='<select name="{n}" class="{f} {c}" />';return a.Lang.sub(j,{n:k,f:a.FormManager.field_marker_class,c:this.qb.getClassName("field")});},_valueInput:function(l,k){var j='<input type="text" name="{n}" class="yiv-required {f} {c}"/>';return a.Lang.sub(j,{n:l,f:a.FormManager.field_marker_class,c:k+" "+this.qb.getClassName("field")});}};b.Select=function(k,j){this.qb=k;this.val_input_name_pattern=j.field_prefix+"query_val_{i}";};b.Select.prototype={create:function(o,n,j,p){var q=this.qb._createContainer();q.set("className",this.qb.getClassName("value"));q.set("innerHTML",this._valuesMenu(this.valueName(o)));this.value_menu=q.one("select");var k=a.Node.getDOMNode(this.value_menu).options;var m=n.value_list;for(var l=0;l<m.length;l++){k[l]=new Option(m[l].text,m[l].value);}if(p){this.value_menu.set("value",p);}if(d){this.value_menu.on("change",this.qb._notifyChanged,this.qb);}this.db_query_equals=j[0];return[q];},postCreate:function(l,k,j,m){try{this.value_menu.focus();}catch(n){}},destroy:function(){this.value_menu=null;},updateName:function(j){this.value_menu.setAttribute("name",this.valueName(j));},set:function(j,k){this.value_menu.set("value",k[this.valueName(j)]);},toDatabaseQuery:function(){return[[this.db_query_equals,this.value_menu.get("value")]];},valueName:function(j){return a.Lang.sub(this.val_input_name_pattern,{i:j});},_valuesMenu:function(k){var j='<select name="{n}" class="{f} {c}" />';return a.Lang.sub(j,{n:k,f:a.FormManager.field_marker_class,c:this.qb.getClassName("field")});}};b.plugin_mapping={string:b.String,number:b.String,select:b.Select};},"gallery-2011.06.29-23-18",{skinnable:true,optional:["gallery-scrollintoview","autocomplete"],requires:["widget","gallery-formmgr"]});