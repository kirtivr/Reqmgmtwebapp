/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.SliderRenderer");sap.ui.commons.SliderRenderer={};
sap.ui.commons.SliderRenderer.render=function(r,s){var a=r;var R=sap.ui.commons.SliderRenderer;if(!s.getVisible()){return}a.write('<DIV');a.writeControlData(s);a.addClass('sapUiSli');this.controlAdditionalCode(a,s);if(s.getTooltip_AsString()){a.writeAttributeEscaped('title',s.getTooltip_AsString())}if(!s.getVertical()&&s.getWidth()){a.writeAttribute('style','width:'+s.getWidth()+';')}else{a.writeAttribute('style','height:'+s.getHeight()+';')}if(!s.getEnabled()){a.addClass('sapUiSliDsbl')}else{if(!s.getEditable()){a.addClass('sapUiSliRo')}else{a.addClass('sapUiSliStd')}}if(s.getVertical()){a.addClass('sapUiSliVert')}else{a.addClass('sapUiSliHori')}a.writeClasses();if(s.getTooltip_AsString()){a.write('><SPAN id="'+s.getId()+'-Descr" style="visibility: hidden; display: none;">');a.writeEscaped(s.getTooltip_AsString());a.write('</SPAN')}a.write('><DIV');a.writeAttribute('id',s.getId()+'-right');a.write('class="sapUiSliR" > <DIV');a.writeAttribute('id',s.getId()+'-left');a.write('class="sapUiSliL" > <DIV');a.writeAttribute('id',s.getId()+'-bar');a.write('class="sapUiSliBar" >');var u=false;if(s.getLabels()&&s.getLabels().length>0){u=true}if(s.getTotalUnits()>0||u){var t=s.getTotalUnits();if(u){t=s.getLabels().length-1}var S=(s.getMax()-s.getMin())/t;for(var i=0;i<=t;i++){a.write('<DIV');a.writeAttribute('id',s.getId()+'-tick'+i);a.write('class="sapUiSliTick" ');a.write('></DIV>');if(s.getStepLabels()){a.write('<DIV');a.writeAttribute('id',s.getId()+'-text'+i);switch(i){case(0):a.write('class="sapUiSliText sapUiSliTextLeft" >');break;case(t):a.write('class="sapUiSliText sapUiSliTextRight" >');break;default:a.write('class="sapUiSliText" >');break}if(u){a.write(s.getLabels()[i])}else{a.write(s.getMin()+i*S)}a.write('</DIV>')}}}a.write('<DIV');a.writeAttribute('id',s.getId()+'-hili');a.write('class="sapUiSliHiLi"></DIV>');this.renderGrip(a,s);a.write('</DIV></DIV></DIV></DIV>')};
sap.ui.commons.SliderRenderer.renderGrip=function(r,s){r.write('<DIV');r.writeAttribute('id',s.getId()+'-grip');if(s.getEnabled()){r.writeAttribute('tabIndex','0')}else{r.writeAttribute('tabIndex','-1')}r.writeAttribute('class','sapUiSliGrip');r.writeAttribute('title',s.getValue());r.writeAccessibilityState(s,{role:'slider',orientation:'horizontal',valuemin:s.getMin(),valuemax:s.getMax(),live:'assertive',disabled:!s.getEditable()||!s.getEnabled(),describedby:s.getTooltip_AsString()?(s.getId()+'-Descr '+s.getAriaDescribedBy().join(" ")):undefined});if(s.getVertical()){r.write('>&#9668;</DIV>')}else{r.write('>&#9650;</DIV>')}};
sap.ui.commons.SliderRenderer.controlAdditionalCode=function(r,s){};
