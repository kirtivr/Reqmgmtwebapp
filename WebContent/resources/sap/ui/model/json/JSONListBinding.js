/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.model.json.JSONListBinding");jQuery.sap.require("sap.ui.model.ClientListBinding");jQuery.sap.require("sap.ui.model.ChangeReason");sap.ui.model.ClientListBinding.extend("sap.ui.model.json.JSONListBinding");
sap.ui.model.json.JSONListBinding.prototype.getContexts=function(s,l){this.iLastStartIndex=s;this.iLastLength=l;if(!s){s=0}if(!l){l=Math.min(this.iLength,this.oModel.iSizeLimit)}var c=this._getContexts(s,l),C={};if(this.bUseExtendedChangeDetection){for(var i=0;i<c.length;i++){C[c[i].getPath()]=c[i].getObject()}if(this.aLastContexts&&s<this.iLastEndIndex){var t=this;var d=jQuery.sap.arrayDiff(this.aLastContexts,c,function(o,n){return jQuery.sap.equal(o&&t.oLastContextData&&t.oLastContextData[o.getPath()],n&&C&&C[n.getPath()])});c.diff=d}this.iLastEndIndex=s+l;this.aLastContexts=c.slice(0);this.oLastContextData=jQuery.extend(true,{},C)}return c};
sap.ui.model.json.JSONListBinding.prototype.update=function(){var l=this.oModel._getObject(this.sPath,this.oContext);if(l&&jQuery.isArray(l)){if(this.bUseExtendedChangeDetection){this.oList=jQuery.extend(true,[],l)}else{this.oList=l.slice(0)}this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()}else{this.oList=[];this.aIndices=[];this.iLength=0}};
sap.ui.model.json.JSONListBinding.prototype.checkUpdate=function(f){if(!this.bUseExtendedChangeDetection){var l=this.oModel._getObject(this.sPath,this.oContext);if(!jQuery.sap.equal(this.oList,l)||f){this.update();this._fireChange({reason:sap.ui.model.ChangeReason.Change})}}else{var c=false;var t=this;var l=this.oModel._getObject(this.sPath,this.oContext);if(!jQuery.sap.equal(this.oList,l)){this.update()}var C=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts){if(this.aLastContexts.length!=C.length){c=true}else{jQuery.each(this.aLastContexts,function(i,o){if(!jQuery.sap.equal(C[i].getObject(),t.oLastContextData[o.getPath()])){c=true;return false}})}}else{c=true}if(c||f){this._fireChange({reason:sap.ui.model.ChangeReason.Change})}}};
