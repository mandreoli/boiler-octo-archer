//     khs.logger.js 0.0.5

//     (c) 2013 David Pitt, Keyhole Software LLC. www.keyholesoftware.com
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/in-the-keyhole/khs-logger
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){function l(e,t){return(1e15+e+"").slice(-t)}function c(i,s){var o=function(o){if(!t){return}o.stopPropagation();if(p(n)){if(n!==null){e("#khstooltip").remove()}i.attr("title",r)}r=i.attr("title");i.attr("title","showing");var u="";for(var a in e.Log.inspectors){u+=e.Log.inspectors[a].call(null,i)}var f=s+u;e("body").append('<div id="khstooltip"><div class="khstipHeader"><span class="closeButton">X</span></div><div class="khstipBody"><h>'+f+'</div><div class="khstipFooter"></div></div>');e("#khstooltip").css("top",o.pageY).css("left",o.pageX).fadeIn("500").fadeTo("10",.8);e("#khstooltip .closeButton").css({"float":"right","font-size":"14px","background-color":"#FFFFFF",color:"#000000",padding:"4px","margin-top":"8px","font-weight":"700"}).hover(function(){e(this).css({"background-color":"#000000",color:"#ffffff",cursor:"pointer"})},function(){e(this).css({"background-color":"#FFFFFF",color:"#000000"})}).on("click",this,function(){e(this).parents("#khstooltip").remove()})};i.mouseenter(function(e){n=i;if(t){n.css("outline","medium solid #FF0000");n.attr("title","showing");n.dblclick(o)}}).mousemove(function(e){}).mouseleave(function(e){if(n!==null){n.attr("title",r);n.css("outline","");n=null}i.css("outline","")})}function h(t){var n=localStorage["local.logs"];var r=null;if(n==null||n==undefined||n==""){r={entries:[]}}else{r=JSON.parse(n)}r.entries.push(t);if(r.entries.length>e.Log.logLength){r.entries.shift()}localStorage["local.logs"]=JSON.stringify(r)}function p(e){var t=e.attr("title");return t=="showing"}function d(){var t=" #khstooltip { "+" position:absolute; "+" z-index:9999; "+" color:#fff; "+" font-size:10px; "+" width:580px; }";var n=" #khstooltip .khstipHeader { "+" height:8px; "+"} ";var r="/* IE hack */"+"*html #khstooltip .khstipHeader {margin-bottom:-6px;}";var i="#khstooltip .khstipBody {"+" background-color:#000; "+" padding:5px; "+" }";var s="#khstooltip .khstipFooter {"+" height:8px; "+" } ";var o="<style>"+t+n+r+i+s+"</style>";e(o).appendTo("body")}function v(){window.onkeydown=function(t){if(e.Log.keyCodes.indexOf(t.keyCode)!=-1){if(t.ctrlKey){e.Log.showOutline();if(e.Log.isInspecting()){e.Log.inspectOff();e.Log.debug("inspecting off")}else{e.Log.inspectOn();e.Log.debug("inspecting on")}}}};window.onkeyup=function(t){if(e.Log.keyCodes.indexOf(t.keyCode)!=-1){e.Log.hideOutline()}};d()}var t=false;var n=null;var r=null;var i=false;var s=null;if(!window.console){window.console={}}if(!window.console.log){window.console.log=function(){}}if(!window.console.info){window.console.info=function(){}}if(!window.console.debug){window.console.debug=function(){}}if(!window.console.error){window.console.error=function(){}}if(!window.console.warn){window.console.warn=function(){}}e.LogLevel={object:0,log:1,debug:2,info:3,warn:4,error:5};e.Log={keyCodes:[10,13],logKeyCode:17,level:e.LogLevel.log,divs:{},inspectors:[],logLocal:false,logEnabled:false,logLength:100,remoteLevel:e.LogLevel.error,color:"#FF0000",remoteUrl:null,beforeSend:null,obj:function(t){if(this.level<=e.LogLevel.object&&this.logEnabled){console.log(t)}},log:function(t){if(this.level<=e.LogLevel.log&&this.logEnabled){var n=a("LOG  ",t);if(this.remoteLevel<=e.LogLevel.log){f(this.remoteUrl,n,this.beforeSend)}if(this.logLocal){h(n)}console.log(n)}},info:function(t){if(this.level<=e.LogLevel.info&&this.logEnabled){var n=a("INFO ",t);if(this.remoteLevel<=e.LogLevel.info){f(this.remoteUrl,n,this.beforeSend)}if(this.logLocal){h(n)}console.info(n)}},debug:function(t){if(this.level<=e.LogLevel.debug&&this.logEnabled){var n=a("DEBUG",t);if(this.remoteLevel<=e.LogLevel.debug){f(this.remoteUrl,n,this.beforeSend)}if(this.logLocal){h(n)}console.debug(n)}},error:function(t){if(this.level<=e.LogLevel.error&&this.logEnabled){var n=a("ERROR",t);if(this.remoteLevel<=e.LogLevel.error){f(this.remoteUrl,n,this.beforeSend)}if(this.logLocal){h(n)}console.error(n)}},warn:function(t){if(this.level<=e.LogLevel.warn&&this.logEnabled){var n=a("WARN ",t);if(this.remoteLevel<=e.LogLevel.warn){f(this.remoteUrl,n,this.beforeSend)}if(this.logLocal){h(n)}console.warn(n)}},inspect:function(){i=true;v()},inspectOn:function(){t=true},inspectOff:function(){t=false},isInspecting:function(){return t},install:function(e){this.inspectors.push(e)},mark:function(t,n,r){if(!i){return}var s="<b>Model:<b>&nbsp;</br>";var o="<a href=javascript:copyToClipboard('"+r+"');>clipboard</a>";var a="<div><button style='height: 12px;width: 100px' >Copy Json</button></div>";var f="<div><b>Id:&nbsp;</b>"+t.attr("id")+"</br><b>View:&nbsp;</b>"+n+"</div>";if(r!==null&r!==undefined){s+="<div style='max-height : 512px; overflow : auto;'><pre>"+u(r,"")+"</pre></div>";f+=s}var l=t.attr("id")+n;this.divs[l]=t;c(t,f);e.Log.debug("Marked "+n+" for inspection")},showOutline:function(){for(var e in this.divs){this.divs[e].css("outline","medium solid #FF0000")}},hideOutline:function(){for(var e in this.divs){this.divs[e].css("outline","")}},localStorageLogInspector:function(){return function(t){var n="<b>Log Entries ("+e.Log.logLength+")</b>";n+="<div style='height : 150px; overflow : auto;'><pre>";var r=JSON.parse(localStorage["local.logs"]);for(var i in r.entries){n+=r.entries[i]+"</br>"}n+="</pre></div>";return n}},localLogEntries:function(){return JSON.parse(localStorage["local.logs"])},resetLocalLog:function(){localStorage["local.logs"]=""}};var o=function(e){if(typeof e==="object"){if(e===null){return"null"}if(e.constructor===[].constructor){return"array"}if(e.constructor===(new Date).constructor){return"date"}if(e.constructor===(new RegExp).constructor){return"regex"}return"object"}return typeof e};var u=function(t,n){var r;var i;if(arguments.length<2){n=""}var s="    ";var a=o(t);if(a==="array"){if(t.length===0){return"[]"}r="["}else{i=0;e.each(t,function(){i++});if(i===0){return"{}"}r="{"}i=0;e.each(t,function(e,t){if(i>0){r+=","}if(a=="array"){r+="\n"+n+s}else{r+="\n"+n+s+'"'+e+'"'+": "}switch(o(t)){case"array":case"object":r+=u(t,n+s);break;case"boolean":case"number":r+=t.toString();break;case"null":r+="null";break;case"string":r+='"'+t+'"';break;default:r+="TYPEOF: "+typeof t}i++});if(a=="array"){r+="\n"+n+"]"}else{r+="\n"+n+"}"}return r};var a=function(e,t){var n=new Date;var r=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate()+":"+l(n.getHours(),2)+":"+l(n.getMinutes(),2)+":"+l(n.getSeconds(),2)+":"+l(n.getMilliseconds(),3);return e+":"+r+"->"+t};var f=function(t,n,r){if(t!==null){var i=t+"/"+encodeURI(n.split("/").join(" "));e.ajax({url:i,beforeSend:r,success:function(e){},error:function(e){console.error("Error sending remote log message to - "+i)}})}};e(function(){});return e.Log})