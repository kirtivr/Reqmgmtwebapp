/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.QuickViewRenderer");jQuery.sap.require("sap.ui.commons.CalloutBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.ui.ux3.QuickViewRenderer=sap.ui.core.Renderer.extend(sap.ui.commons.CalloutBaseRenderer);
sap.ui.ux3.QuickViewRenderer.renderContent=function(r,c){var a=r;var A=sap.ui.getCore().getConfiguration().getAccessibility();var t=c.getType(),n=c.getFirstTitle(),h=c.getFirstTitleHref(),i=c.getIcon(),d=c.getSecondTitle(),w=c.getWidth(),I=c.getId(),b=c.getTooltip_AsString();a.write("<div");if(b){a.writeAttributeEscaped("title",b)}if(A){a.writeAttribute("role","dialog");a.writeAttribute("aria-labelledby",I+"-title")}a.addClass("sapUiUx3QV");a.writeClasses();if(w){a.addStyle("width",w);a.writeStyles()}a.write(">");a.write("<div");a.writeAttribute("id",I+"-title");a.writeAttribute("tabindex","-1");a.addClass("sapUiUx3QVHeader");a.writeClasses();a.write(">");a.writeEscaped(t);a.write("</div>");if(i||n||d){a.write("<div");if(A){a.writeAttribute("role","heading")}a.addClass("sapUiUx3QVHeading");a.writeClasses();a.write(">");if(i){a.write("<img alt=\"\"");a.addClass("sapUiUx3QVIcon");a.writeClasses();a.writeAttributeEscaped("src",i);a.writeAttributeEscaped("title",n);if(A){a.writeAttribute("role","presentation")}a.write(" tabindex=\"-1\"");a.write("></img>")}a.write("<span");a.writeAttribute("id",I+"-name");if(A&&d){a.writeAttribute("aria-describedby",I+"-descr")}a.addClass("sapUiUx3QVTitle1");a.writeClasses();a.write(">");if(h){a.write("<a");a.writeAttribute("id",I+"-link");a.writeAttributeEscaped("href",h);a.writeAttribute("tabindex","-1");a.write(">")}a.writeEscaped(n||"");if(h){a.write("</a>")}a.write("</span>");if(d){a.write("<br><span");a.writeAttribute("id",I+"-descr");a.writeAttribute("tabindex","-1");a.addClass("sapUiUx3QVTitle2");a.writeClasses();a.write(">");a.writeEscaped(d);a.write("</span>")}a.write("</div>")}a.write("<div id=\""+I+"-content\">");this.renderBody(a,c);a.write("</div>");a.write("</div>");if(c.getShowActionBar()&&c.getActionBar()){a.renderControl(c.getActionBar())}};
sap.ui.ux3.QuickViewRenderer.renderBody=function(r,c){var C=c.getContent();for(var i=0;i<C.length;i++){r.write("<div class=\"sapUiUx3QVBody\">");if(C[i]instanceof sap.ui.core.Control){r.renderControl(C[i])}else if(C[i].getContent&&typeof C[i].getContent=="function"){var a=C[i].getContent();for(var j=0;j<a.length;j++){if(a[j]instanceof sap.ui.core.Control){r.renderControl(a[j])}}}r.write("</div>")}};
