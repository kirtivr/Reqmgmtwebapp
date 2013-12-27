sap.ui.controller("casestudy_screen1.controllers.Req_Corp", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf casestudy_screen2.Req_Corp
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf casestudy_screen2.Req_Corp
*/
	/*onBeforeRendering: function() {
		
		
		
	},*/

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf casestudy_screen2.Req_Corp
*/
	/*onAfterRendering: function() {
		
			},
*/
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf casestudy_screen2.Req_Corp
*/
//	onExit: function() {
//
//	}
	
	validateform:function()
	{	
		var rname=sap.ui.getCore().byId("rname").getValue();
		var pname=sap.ui.getCore().byId("pname").getValue();
		var pdesc=sap.ui.getCore().byId("pdesc").getValue();
		
		if(rname&&pname&&pdesc)
			return true;
		return false;
		
	},
openOverlay:function(number)
	{	
	var oOverlayContainer=sap.ui.getCore().byId("container1");
	if(!sap.ui.getCore().byId("idReq_Corp22"))
		{
	var view2 = sap.ui.view({id:"idReq_Corp22", viewName:"casestudy_screen1.views.Req_Corp2", type:sap.ui.core.mvc.ViewType.JS,width:"100%",height:"100%"});
	}
	else
	{
	view2=sap.ui.getCore().byId("idReq_Corp22");
	}
	oAddHeader=new sap.ui.core.EventBus();
	oAddHeader.subscribe("arole","header",view2.getController().onInit,view2.getController());
	oAddHeader.publish("arole","header","00"+number+"0");
	
	//if(!oOverlayContainer.getContent())
	oOverlayContainer.addContent(view2);
	
	if(!oOverlayContainer.isOpen())
		{
		oOverlayContainer.open();
		}
	},

closeOverlay:function()
{	var container=sap.ui.getCore().byId("container");
	container.close();
}
	,

createTemplate :function (){
	var c = sap.ui.commons;
	return  new c.ListBox({
		items : [
			 		new sap.ui.core.ListItem({text : '{role_des}'}),
			 		new sap.ui.core.ListItem({text : '{role_loc}'}),
			 		new sap.ui.core.ListItem({text : '{days}'}),
		  ]
	}).addStyleClass("box");
	},	

	
	// Add the dataset to the overlay container.
setPanel:function(oDataSet){
	
	container=sap.ui.getCore().byId("container1");
	if(container)
		{
		container.removeAllContent();
		container.rerender();
		container.close();
		}
	
	sap.ui.getCore().byId("oMatRow").addCell(new sap.ui.commons.layout.MatrixLayoutCell({vAlign:sap.ui.commons.layout.VAlign.Top,hAlign:sap.ui.commons.layout.HAlign.Left,content:[oDataSet]}));

},
getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
},

// Create data from the values obtained from second overlay container.

createData:function()
{
	var requestDate="Created on "+sap.ui.getCore().byId("date1").getValue();
    var requestType=sap.ui.getCore().byId("pdesc").getValue();
    var requestNumber=this.getRandomInt(8000000, 9000000);
    var requestFrom=sap.ui.getCore().byId("rname").getValue();
    var requestStatus="Request " + "Submitted";
    var oProduct = {date:requestDate,type:requestType,number:requestNumber,from:requestFrom,status:requestStatus};
    return oProduct;
	},
	
// publish data to  screen 1 controller
	
	setData:function(odata)
	{	
		


		var ctrl=sap.ui.getCore().byId("idscreen11").getController();
	    oEvBus= new sap.ui.core.EventBus();
	    oEvBus.subscribe("arole","transfer2",ctrl.getData,ctrl);
	  
	    
	    oEvBus.publish("arole","transfer2",odata);
	},

	// dynamically create new dataset item and push to matrix layout row.
	getData : function(channel,event,odata)
{	
	var oModel= new sap.ui.model.json.JSONModel();
	oModel.setData(odata);
	
	
	var oDataSet = new sap.ui.ux3.DataSet({
		showToolbar:false,
		items: {
			path: "/products",
			template: new sap.ui.ux3.DataSetItem({
				title:"Role"
			})
		},
		views: [
			new sap.ui.ux3.DataSetSimpleView({
				name: "Floating, non-responsive View",
				floating: true,
				responsive: true,
				itemMinWidth: 0,
				template: this.createTemplate()
			})
		]
	});
	oDataSet.setModel(oModel);
	this.setPanel(oDataSet);

	
	},

	submitcolor:function()
	{
	if (this.validateform())
		{
		sap.ui.getCore().byId("submit_1").removeStyleClass("submit1");
		}
	}

});