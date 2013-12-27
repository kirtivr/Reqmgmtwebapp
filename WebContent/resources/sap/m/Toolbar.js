/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Toolbar");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Toolbar",{metadata:{library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'100%'},"active":{type:"boolean",group:"Behavior",defaultValue:false},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{"press":{}}}});sap.m.Toolbar.M_EVENTS={'press':'press'};jQuery.sap.require("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.Toolbar.prototype);
sap.m.Toolbar.getSubPixelWidth=function(d){if(!d||!d.style){return 0}var w=window.getComputedStyle(d).getPropertyValue("width");return Math.ceil(parseFloat(w)%1)};
sap.m.Toolbar.checkOverflow=function(e,o){var I=0;var E=e.width();e.children().each(function(i,c){I+=c.outerWidth(true)});var O=E>I;if(o){e.toggleClass(o||"sapMTBOverflow",O)}return O};
sap.m.Toolbar.flexie=function(e,f){if(!e||e.css("visibility")=="hidden"||e.is(":hidden")){return}var i=0,t=0,F=[],p=[],n=e.width(),c=e.children(),l="data-sap-tb-last-width",P="data-sap-tb-percent-width",a=function($,g){var h=0;var j=$.width();t+=g;i+=$.outerWidth(true)-j;if($.css("box-sizing")=="border-box"){h=$.outerWidth()-j}p.push({boxSizing:h,percent:g,el:$[0]})},b=function(){if(p.length){var d=n-i;p.forEach(function(I){var g=(n*I.percent)/100;d-=Math.floor(g)});return(d>=0)}},s=function(T){var S=0;p.forEach(function(I){var g=Math.min(100,(I.percent*100)/t);var h=I.boxSizing+Math.floor((T*g)/100);var w=h+"px";I.el.style.width=w;I.el.setAttribute(l,w);S+=h});T-=S;if(T>1){F.forEach(function(o){o.style.width=Math.floor(T/F.length)+"px"})}};c.each(function(){var $=jQuery(this);if(f&&$.hasClass(f)){F.push(this);this.style.width=0}else if(this.firstChild&&this.firstChild.nodeType==3){a($,100)}else{var S=this.style.width;var L=this.getAttribute(l);var g=this.getAttribute(P);var w=(S===L)?g||S:S;if(w.indexOf("%")>0){var h=parseFloat(w);a($,h);$.attr(P,w)}else{var j=sap.m.Toolbar.getSubPixelWidth($[0]);i+=$.outerWidth(true)+j;if(jQuery.browser.msie&&jQuery.browser.fVersion<10&&/^(auto|inherit|)$/i.test(w)){$.width(j+($.css("box-sizing")=="border-box"?$.outerWidth():$.width()))}}}});var d=n-i;if(d>0){s(b()?n:d)}};
sap.m.Toolbar.prototype.hasFlexBoxSupport=jQuery.support.flexBoxLayout;sap.m.Toolbar.prototype.hasNewFlexBoxSupport=(function(){return(jQuery.browser.msie&&jQuery.support.ie10FlexBoxLayout)||typeof document.documentElement.style.flex!="undefined"}());
sap.m.Toolbar.prototype.onBeforeRendering=function(){if(!this.hasFlexBoxSupport){this._deregisterResize()}else{this._registerPropertyChange()}};
sap.m.Toolbar.prototype.onAfterRendering=function(){if(!this.hasFlexBoxSupport){this._reflexie();this._registerResize()}};
sap.m.Toolbar.prototype.exit=function(){if(!this.hasFlexBoxSupport){this._deregisterResize()}};
sap.m.Toolbar.prototype.ontap=function(e){this.getActive()&&this.firePress({srcControl:e.srcControl||this})};
sap.m.Toolbar.prototype.onsapenter=sap.m.Toolbar.prototype.ontap;sap.m.Toolbar.prototype.onsapspace=sap.m.Toolbar.prototype.ontap;
sap.m.Toolbar.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=this.getActive()};
sap.m.Toolbar.prototype._togglePercentClass=function(c){if(c&&c.getWidth){var w=c.getWidth().toLowerCase();var p=w.indexOf("%")>0||(w=="inherit"&&this.getWidth().indexOf("%")>0);c.toggleStyleClass("sapMTBPercentItem",p)}};
sap.m.Toolbar.prototype._onItemPropertyChanged=function(e){if(e.getParameter("name")=="width"){this._togglePercentClass(e.getSource())}};
sap.m.Toolbar.prototype._registerPropertyChange=function(){this.getContent().forEach(function(c){if(c.getMetadata().getProperties().width){c.detachEvent("_change",this._onItemPropertyChanged,this);c.attachEvent("_change",this._onItemPropertyChanged,this);this._togglePercentClass(c)}},this)};
sap.m.Toolbar.prototype._registerResize=function(){sap.ui.getCore().attachIntervalTimer(this._handleContentResize,this);if(/^(\d+%|auto|inherit)$/i.test(this.getWidth())){var r=jQuery.proxy(this._handleToolbarResize,this);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),r)}};
sap.m.Toolbar.prototype._deregisterResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this);if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};
sap.m.Toolbar.prototype._getEndPoint=function(){var e=0;var d=this.getDomRef();if(d&&d.lastElementChild){e=d.lastElementChild.offsetLeft;if(!sap.ui.getCore().getConfiguration().getRTL()){e+=d.lastElementChild.offsetWidth}}return e};
sap.m.Toolbar.prototype._reflexie=function(){sap.m.Toolbar.flexie(this.$(),sap.m.ToolbarSpacer&&sap.m.ToolbarSpacer.flexClass);this._endPoint=this._getEndPoint()};
sap.m.Toolbar.prototype._handleToolbarResize=function(){this._reflexie()};
sap.m.Toolbar.prototype._handleContentResize=function(){if(this._endPoint!=this._getEndPoint()){this._reflexie()}};
