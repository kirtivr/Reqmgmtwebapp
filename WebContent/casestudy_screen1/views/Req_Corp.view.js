sap.ui.jsview("casestudy_screen1.views.Req_Corp", 
{

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf casestudy_screen1.Req_Corp
	*/ 
	getControllerName : function() 
{
		return "casestudy_screen1.controllers.Req_Corp";
},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf casestudy_screen1.Req_Corp
	*/ 
	createContent : function(oController) 
{
/*		
 * Layout structure is:-
 * 
 * Border Layout is the overall layout.
 * In the top section of border layout we have the Title.
 * In the center section we have a vertical layout
 * 								   In the vertical layout we have 3 Panels for the 3 data entering areas . 
 * 								   First panel has all the labels and fields which are enclosed in an overall vertical layout .
 * 								   Second Panel has a matrix layout which encloses the dataset items.
 *								   Third Panel has a textarea.
 *
 */												
		
		var datasetdata={products:[]};
		
		if(!sap.ui.getCore().byId("container1"))
{
		var oOverlayContainer = new sap.ui.ux3.OverlayContainer("container1",{openButtonVisible:false,closeButtonVisible:true}).addStyleClass("overlay1");
}
		else
{
		var oOverlayContainer=sap.ui.getCore().byId("container1");
}
		
		
		
		
		var vLayout= new sap.ui.layout.VerticalLayout("vLayout");
        var oPanel1= new sap.ui.commons.Panel("Panel1",{expandable:true,width:"100%"});
        var header = new sap.ui.commons.TextView("header_1",{text:"New Corporate Request"});
        
		
        header.addStyleClass("header_1");

               
                
        oPanel1.setTitle( new sap.ui.core.Title({text:"Request Details"}));
        var vLayout2=new sap.ui.layout.VerticalLayout("vLayout2",{width:"100%"});
        
        var label1=new sap.ui.commons.Label({requiredAtBegin:true, text: "Requester Name",required:true});
        var field1=new sap.ui.commons.ValueHelpField("rname",{valueHelpRequest: function(){alert('<no data>');},change:function(){oController.submitcolor();}});
        	
      
       var label2=new sap.ui.commons.Label({requiredAtBegin:true,text: "Project name",required:true});
       var field2=new sap.ui.commons.TextField("pname",{change:function(){oController.submitcolor();}});
       
       var label3=new sap.ui.commons.Label({requiredAtBegin:true,text: "Project Description",required:true});
       var field3=new sap.ui.commons.TextArea("pdesc",{required:true,rows:3,width:"50%",change:function(){oController.submitcolor();}}).addStyleClass("TArea");
       
       
       var hlay1=  new sap.ui.layout.HorizontalLayout("HLayout1", {content: [new sap.ui.commons.Label({text: "Project Start Date"}).addStyleClass("datelabeloverlay1"),
                                                                             new sap.ui.commons.Label({text: "Project End Date(Optional)"})
                                                                             ]});
    	
    	var hlay2=	new sap.ui.layout.HorizontalLayout("HLayout2", {content: [new sap.ui.commons.DatePicker("date1",{width:"180px"}).addStyleClass("datefieldoverlay1"),
    	          	                                                	      new sap.ui.commons.DatePicker("date2",{width:"180px"})
    	          	                                                	      ]});
       
       
       var label4=new sap.ui.commons.Label({requiredAtBegin:true,text: "Corporate Organization",required:true});
       var field4= new sap.ui.commons.DropdownBox({required:true,
           items:[new sap.ui.core.ListItem({text:"APJ"}),
                  new sap.ui.core.ListItem({text:"EMEA"})
                  ]});
        
       
       var label5=new sap.ui.commons.Label({requiredAtBegin:true,text: "Requesting Line of Business",required:true});
       var field5= new sap.ui.commons.DropdownBox({required:true,
           items:[new sap.ui.core.ListItem({text:"MDC/UX"}),
                  new sap.ui.core.ListItem({text:"MRS"})
                  ]});
                  
       var label6=new sap.ui.commons.Label({requiredAtBegin:true,text: "Requesting Country",required:true});
       var field6=new sap.ui.commons.DropdownBox({required:true,
           items:[new sap.ui.core.ListItem({text:"India"}),
			      new sap.ui.core.ListItem({text:"USA"})
			       ]});
       
       
       var label7=new sap.ui.commons.Label({text: "Project Manager(Optional)"});
       var field7= new sap.ui.commons.ValueHelpField({valueHelpRequest: function(){alert('<no data>');}});

       var oMat= new sap.ui.commons.layout.MatrixLayout("oMATDATA",{layoutFixed:true});
       
       
       
       vLayout2.addContent(label1);
       vLayout2.addContent(field1.addStyleClass("vspace"));
       vLayout2.addContent(label2);
       vLayout2.addContent(field2.addStyleClass("vspace"));
       vLayout2.addContent(label3);
       vLayout2.addContent(field3.addStyleClass("vspace"));
       vLayout2.addContent(hlay1);
       vLayout2.addContent(hlay2.addStyleClass("vspace"));
       vLayout2.addContent(label4);
       vLayout2.addContent(field4.addStyleClass("vspace"));
       vLayout2.addContent(label5);
       vLayout2.addContent(field5.addStyleClass("vspace"));
       vLayout2.addContent(label6);
       vLayout2.addContent(field6.addStyleClass("vspace"));
       vLayout2.addContent(label7);
       vLayout2.addContent(field7.addStyleClass("vspace"));
       
        oPanel1.addContent(vLayout2);
        var oMat= new sap.ui.commons.layout.MatrixLayout("oMat",{columns:8,layoutFixed:true});
        oMatRow=new sap.ui.commons.layout.MatrixLayoutRow("oMatRow");
        oMat.addRow(oMatRow);
        var overlaynumber=1;
        oPanel2=  new sap.ui.commons.Panel("Panel2",{text:"Consultant Roles",width:"98%",
        											 buttons:[new sap.ui.commons.Button({text:"Add New Role",press:
        											          function(){oController.openOverlay(overlaynumber);overlaynumber=overlaynumber+1;} })],
        											 content:[oMat]});
        
        var oPanel3= new sap.ui.commons.Panel("Panel3",{title:new sap.ui.core.Title({text:"Internal Comments"}),expandable:true,width:"98%",
        												content:[new sap.ui.commons.TextArea({required:true,rows:2,width:"50%"}).addStyleClass("TArea")]});
        
         
        vLayout.addContent(oPanel1);
        vLayout.addContent(oPanel2);
        vLayout.addContent(oPanel3);
        
        var reqData={products:[]};
        var submitbutton = new sap.ui.commons.Button("submit_1",{text:"Submit Request",style: sap.ui.commons.ButtonStyle.Emph,press : 
        	function() {
  				if(oController.validateform())
  					{
  				(oController.createData(reqData));
  				oController.setData(reqData);
  				oController.closeOverlay();
  					}
  				else
  					{
  					alert("Please fill in all required fields");
  					}
  						}});
        
        submitbutton.addStyleClass("submit1");
        
        var bLayout = new sap.ui.commons.layout.BorderLayout("bLayout", {
        	top: new sap.ui.commons.layout.BorderLayoutArea({size: "7.5%",visible: true, 
        													 content: [header]}),
        	bottom: new sap.ui.commons.layout.BorderLayoutArea("bottom_1",{size: "3.75%",contentAlign: "right",visible: true, 
        													 content: [new sap.ui.commons.Button("cancel_1",{text:"Cancel",style: sap.ui.commons.ButtonStyle.Default,press : 
        														       function() {oController.closeOverlay();}}),
        														       submitbutton]}),
        	begin: new sap.ui.commons.layout.BorderLayoutArea({size: "2%",contentAlign: "center",visible: true}),
        	center: new sap.ui.commons.layout.BorderLayoutArea({contentAlign: "left",visible: true, 
        														content: [vLayout]}),
        	end: new sap.ui.commons.layout.BorderLayoutArea({size: "2%",contentAlign: "center",visible:true})
        													});
       
        return bLayout;
	
	}
});
                                              
       
