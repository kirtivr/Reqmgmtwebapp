/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for the sap.ui.ux3.Overlay
jQuery.sap.declare("sap.ui.ux3.OverlayRenderer");

/**
 * @class Overlay renderer.
 * @static
 */
sap.ui.ux3.OverlayRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.ui.ux3.OverlayRenderer.render = function(oRenderManager, oControl){
	// convenience variable
	var rm = oRenderManager;

	// write the HTML into the render manager
	rm.write("<div");
	rm.writeControlData(oControl);
	rm.addClass("sapUiUx3Overlay");

	if (this.addRootClasses) {
		this.addRootClasses(rm, oControl);
	}

	rm.writeClasses();
	rm.write(">");

	rm.write("<div role='presentation'");
	rm.addClass("sapUiUx3OverlayOverlay");

	if (this.addOverlayClasses) {
		this.addOverlayClasses(rm, oControl);
	}

	rm.writeClasses();
	rm.write(">");
	rm.write("</div>");
	rm.write("<span class='sapUiUx3OverlayFocusDummyPane' id='" + oControl.getId() + "-firstFocusDummyPaneFw'></span>");
	rm.write("<span class='sapUiUx3OverlayFocusDummyPane' id='" + oControl.getId() + "-firstFocusDummyPaneBw'></span>");
	//render open & close button
	if (oControl.getOpenButtonVisible()) {
	rm.write("<a role=\"button\" aria-disabled=\"false\" class='sapUiUx3OverlayOpenButton' id='" + oControl.getId()
			+ "-openNew' tabindex=\"0\" title=\""+oControl._getText("OVERLAY_OPEN_BUTTON_TOOLTIP") +"\">"+oControl._getText("OVERLAY_OPEN_BUTTON_TEXT")+"</a>");
			}
	if (oControl.getCloseButtonVisible()) {
	rm.write("<a role=\"button\" aria-disabled=\"false\" class='sapUiUx3OverlayCloseButton' id='" + oControl.getId()
			+ "-close' tabindex=\"0\" title=\""+oControl._getText("OVERLAY_CLOSE_BUTTON_TOOLTIP") +"\"></a>");
	}
	if (this.renderContent) {
		this.renderContent(rm, oControl);
	}
	rm.write("<span class='sapUiUx3OverlayFocusDummyPane' id='" + oControl.getId() + "-LastFocusDummyPane'></span>");
	rm.write("</div>");

};
