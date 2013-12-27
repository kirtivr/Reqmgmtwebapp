sap.ui.controller("casestudy_screen1.controllers.screen1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf casestudy_screen1.screen1
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf casestudy_screen1.screen1
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf casestudy_screen1.screen1
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf casestudy_screen1.screen1
*/
//	onExit: function() {
//
//	}

	
requestFilterHandler: function(buttonText) {
        alert("This is coming from the controller. You pressed on the " + buttonText + " button.");
},

//WHEN NEW REQUEST BUTTON IS PRESSED THE OPENING OF OVERLAY CONTAINER HANDLES HERE
newCorporateRequestHandler: function() {
        var requestTypeListBox = sap.ui.getCore().byId("requestTypeListBox");
        var selectedItemText = requestTypeListBox.getSelectedItem().getText();
        if(selectedItemText == "Corporate Request") {
        var xOverlayContainer = sap.ui.getCore().byId("container");
        if(!sap.ui.getCore().byId("idReq_Corp11"))
		{
			var view1 = sap.ui.view({id:"idReq_Corp11", viewName:"casestudy_screen1.views.Req_Corp", type:sap.ui.core.mvc.ViewType.JS,width:"100%",height:"100%"});
		}
		else
		{
			view1=sap.ui.getCore().byId("idReq_Corp11");
		}
        requestTypeListBox.clearSelection();
        
        xOverlayContainer.addContent(view1);
        if(!xOverlayContainer.isOpen()){
        	
        xOverlayContainer.open();
        sap.ui.getCore().byId("newRequestDialog").close();
                }
        }
        else {
                alert("New Service Request Handler Implementation");
        }
        
},

newRequestHandler: function() {
        sap.ui.getCore().byId("newRequestDialog").open();
},

requestsListHandler: function() {
        alert("This is coming from the controller. You selected " + sap.ui.getCore().byId("requestsListBox").getSelectedItem().getText() + ".");
},

//GET DATA FROM EVENT BUS (Initialized in controller of first overlay container) AND INITIALIZE DATASET MODEL
getData : function(channel,event,odata)
{	
	var oModel= new sap.ui.model.json.JSONModel();
	oModel.setData(odata);
	var oDataSet =sap.ui.getCore().byId("requestset");
	oDataSet.setModel(oModel);
	sap.ui.getCore().byId("openRequestsLink").setText("Open Requests ("+odata.products.length+")");
	sap.ui.getCore().byId("newRequsetsLink").setText("New ("+odata.products.length+")");
	container=sap.ui.getCore().byId("container");
	if(container)
		{
		container.removeAllContent();
		container.close();
		}

	
	}

});