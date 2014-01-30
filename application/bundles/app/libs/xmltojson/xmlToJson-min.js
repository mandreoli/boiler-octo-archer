/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * Copyright (c) 2012 Sam Tsvilik
 * Licensed under the MIT, GPL licenses.
 *
 * @name xml
 * @version 1.1
 * @author Sam Tsvilik
 * @description
 * This is a super light and simple XML to JSON converter.
 * All it does is scans through child elements of your XML and builds out a JSON structure.
 * To avoid attribute vs. node name conflicts - All attribute entities are prefixed with "@" (i.e. <node attr="1"/> == {node: {"@attr":"1"}} )
 * Text or CDATA value will always be inside a "Text" property (i.e. myNodeObj.Text == <myNodeObj>Hello</myNodeObj> - Hello)
 * Node siblings with the same name will be automatically converted into arrays, else if node is singular it will just be an Object
 */
(function(e,t,n){function f(t){var n=r,o=r,u=s;try{n="DOMParser"in e?new DOMParser:new ActiveXObject("MSXML2.DOMDocument");n.async=i}catch(a){throw new Error("XML Parser could not be instantiated")}if("parseFromString"in n){o=n.parseFromString(t,"text/xml");u=o.documentElement.tagName!=="parsererror"}else{u=n.loadXML(t);o=u?n:i}if(!u){throw new Error("Error parsing XML string")}return o}var r=null,i=!1,s=!0,o={Element:1,Attribute:2,Text:3,CDATA:4,Root:9,Fragment:11},u,a;u={isUnsafe:i,isXML:function(e){return typeof e==="object"&&e.nodeType!==n},getRoot:function(e){return e.nodeType===o.Root?e.documentElement:e.nodeType===o.Fragment?e.firstChild:e},convert:function(e){var t={},r=typeof e==="string"?f(e):this.isXML(e)?e:n,i;if(!r){throw new Error("Unable to parse XML")}if(r.nodeType===o.Text||r.nodeType===o.CDATA){return r.nodeValue}i=this.getRoot(r);t[i.nodeName]={};this.process(i,t[i.nodeName]);return t},process:function(e,n){var r,i,s,u,a,f,l,c,h;if(e.hasChildNodes()){h=e.childNodes.length;for(f=0;f<h;f++){r=e.childNodes[f];switch(r.nodeType){case o.Text:n.Text=n.Text?n.Text+t.trim(r.nodeValue):t.trim(r.nodeValue);break;case o.CDATA:a=r[r.text?"text":"nodeValue"];n.Text=n.Text?n.Text+a:a;break;case o.Element:s=r.nodeName;c={};if(s in n){if(n[s].length){this.process(r,c);n[s].push(c)}else{this.process(r,c);n[s]=[n[s],c]}}else{this.process(r,c);n[s]=c}break}}}if(e.attributes.length){for(l=e.attributes.length-1;l>=0;l--){i=e.attributes[l];u=t.trim(i.name);a=i.value;n[(this.isUnsafe?"":"@")+u]=a}}}};t.xmlToJSON=function(e,t){u.isUnsafe=t!==n?t:i;return u.convert(e)}})(window,jQuery)