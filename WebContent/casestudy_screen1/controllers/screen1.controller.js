sap.ui.controller("casestudy_screen1.controllers.screen1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf casestudy_screen1.controllers.screen1
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf casestudy_screen1.controllers.screen1
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf casestudy_screen1.controllers.screen1
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf casestudy_screen1.controllers.screen1
*/
//	onExit: function() {
//
//	}
	
	updateDate: function(channel, event, data){
		var requesterNameValue = sap.ui.getCore().byId("requesterName").getValue();
	    var ProjectNameValue = sap.ui.getCore().byId("projectName").getValue();
	    
	    var oProduct = {requesterName:requesterNameValue, projectName:ProjectNameValue};
	   
	    data.products.push(oProduct);
	    
	    var reqModel = new sap.ui.model.json.JSONModel();
		reqModel.setData(data);
		var reqDataSet = sap.ui.getCore().byId("myDataSet");
		reqDataSet.setModel(reqModel);
		sap.ui.getCore().byId("myOverlayContainer").close();
	    
	},
	
	search: function(oEvent) {
		var sQuery = oEvent.getParameter("query");
		oDataSet = sap.ui.getCore().byId("myDataSet");
        var oBinding = oDataSet.getBinding("items");
        oBinding.filter(!sQuery ? [] : [new sap.ui.model.Filter("requesterName", sap.ui.model.FilterOperator.Contains, sQuery)]);
        oDataSet.setLeadSelection(-1);
	},
	
	createTemplate :function (){
        var itemLayout = new sap.ui.commons.layout.VerticalLayout("myItemLayout", {
			content: [
			          new sap.ui.commons.Label({
			        	  text: "{date}",
			          }).addStyleClass("CreatedOn"),
			          new sap.ui.commons.Image({
			        	  src: "images/facebook_small_icon.jpg",
			        	  alt: "<IMG>", 
			          }).addStyleClass("ItemImage"),
			          new sap.ui.commons.Label({
			        	  text: "{type}"
			          }).addStyleClass("RequestTitle"),
			          new sap.ui.commons.Label({
			        	  text: "{number}"
			          }).addStyleClass("JustLabel"),
			          new sap.ui.commons.Label({
			        	  text: "{from}"
			          }).addStyleClass("JustLabel"),
			          new sap.ui.commons.Label({
			        	  text: "{status}"
			          }).addStyleClass("RequestStatus"),
			          ],
		});
		itemLayout.addStyleClass("ItemLayout");
		return itemLayout;
    },
    
	addRequest: function(channel, event, data){
		var reqModel = new sap.ui.model.json.JSONModel();
		reqModel.setData(data);
		var reqDataSet = sap.ui.getCore().byId("myDataSet");
		reqDataSet.setModel(reqModel);
	},
	
	requestFilterHandler: function(buttonText) {
		alert("This is coming from the controller. You pressed on the " + buttonText + " button.");
	},
	
	newCorporateRequestHandler: function() {
		var requestTypeListBox = sap.ui.getCore().byId("requestTypeListBox");
		var selectedItemText = requestTypeListBox.getSelectedItem().getText();
		if(selectedItemText == "Services Request") {
			alert("New Service Request Handler Implementation");
			sap.ui.getCore().byId("newRequestDialog").close();
		}
		else {
			var oOverlayContainer = sap.ui.getCore().byId("myOverlayContainer");
			if(!oOverlayContainer.isOpen()){
                oOverlayContainer.open();
			}
			sap.ui.getCore().byId("newRequestDialog").close();
		}
		requestTypeListBox.clearSelection();
	},
	
	newRequestHandler: function() {
		sap.ui.getCore().byId("newRequestDialog").open();
	},
	
	requestsListHandler: function() {
		alert("This is coming from the controller. You selected an item from the List Box");
	},
	
});