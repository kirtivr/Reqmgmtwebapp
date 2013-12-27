sap.ui.jsview("casestudy_screen1.views.screen1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf casestudy_screen1.screen1
	*/ 
	getControllerName : function() {
		return "casestudy_screen1.controllers.screen1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf casestudy_screen1.screen1
	*/ 
	createContent : function(oController) {
/*
 * Layout structure is :-
 * Shell covers the entire screen
 * A matrix layout is contained inside the Shell 
 * Each matrix layout row has 2 cells:-
 * 1. With the dataset items and colspan 8.
 * 2. With the side pane and colspan 2 (side pane has 2 panels in a vertical layout).
 * 
 */		
		
		var oOverlayContainer = new sap.ui.ux3.OverlayContainer("container",
		{	openButtonVisible:false,
			closeButtonVisible:true,
		}).addStyleClass("overlay1");
		
		var requestListBox = new sap.ui.commons.ListBox("requestTypeListBox", {
            width: "100%",
            height: "auto",
            items: [
                    new sap.ui.core.Item("servicesRequest", {
                            text: "Services Request",
                    }),
                    new sap.ui.core.Item("corporateRequest", {
                            text: "Corporate Request",
                    }),
                    ],
        select: function() {
             oController.newCorporateRequestHandler();
        },
    });
   
    var newRequestDialog = new sap.ui.commons.Dialog("newRequestDialog", {
            title: "What type of request?",
            width: "300px",
            content: [
                                    requestListBox,
                     ]
    });
    newRequestDialog.addButton(new sap.ui.commons.Button({
            text: "Cancel",
            press:function(){
                    newRequestDialog.close();
                    },
            })
    );

		var oPanel1= new sap.ui.commons.Panel({
			title:new sap.ui.core.Title({text:"Request Status"}),
			width:"100%",
			content:[
			         new sap.ui.commons.layout.VerticalLayout({
			        	 content: [
			        	           new sap.ui.commons.ListBox("requestsListBox", {
			        	        	   items: [
			        	        	           new sap.ui.core.Item("openRequestsLink", {
                        	  text: "Open Requests (0)",
                          }),
                          		   new sap.ui.core.Item("newRequsetsLink", {
                                  text: "New (0)",
                          }),
                          		   new sap.ui.core.Item("inProcessRequestsLink", {
                                  text: "In Process (0)",
                          }),
                          			new sap.ui.core.Item("validatedRequestsLink", {
                                  text: "Validated (0)",
                          }),
                          			new sap.ui.core.Item("completedRequestsLink", {
                                  text: "Completed (0)",
                          }),
                          ],
          select: function() {
                  oController.requestsListHandler();
          },
          })]
              
}),
			         ]
		
		});
		

        var dateFromLabel = new sap.ui.commons.Label("dateFromLabel", {
                text: "From:"
        });
       
        var dateToLabel = new sap.ui.commons.Label("dateToLabel", {
                text: "To:"
        });
       
        var oDatePicker1 = new sap.ui.commons.DatePicker('dateX',{width:"100%"});
        oDatePicker1.setYyyymmdd("20210404");
        oDatePicker1.setLocale("en-US"); 
        oDatePicker1.attachChange(
                        function(oEvent){
                                if(oEvent.getParameter("invalidValue")){
                                        oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                }else{
                                        oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                                }
                        }
        );
       
        var oDatePicker2 = new sap.ui.commons.DatePicker('dateY',{width:"100%"});
        oDatePicker2.setYyyymmdd("20210402");
        oDatePicker2.setLocale("en-US");
        oDatePicker2.attachChange(
                        function(oEvent){
                                if(oEvent.getParameter("invalidValue")){
                                        oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                }else{
                                        oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                                }
                        }
        );
       
        var filterButton = new sap.ui.commons.Button("filterButton", {
                text: "Filter",
                press: function() {
                        oController.requestFilterHandler("Filter");
                }
        });
       
        var defaultButton = new sap.ui.commons.Button("defaultButton", {
                text: "Default",
                lite: true,
                press: function() {
                        oController.requestFilterHandler("Default");
                }
        });
       
        var oToolbar2 = new sap.ui.commons.Toolbar("tb2",{width:"100%"});
        oToolbar2.addItem(filterButton);
        oToolbar2.addItem(defaultButton);
       
        var vlayout3 = new sap.ui.commons.layout.VerticalLayout("vlayout3", {
        	
                content: [
                          dateFromLabel,
                          oDatePicker1,
                          dateToLabel,
                          oDatePicker2
                          ]
        });
		
		
		var oPanel2= new sap.ui.commons.Panel({
			title:new sap.ui.core.Title({text:"Creation Date"}),
			width:"100%",
			content:[
					 new sap.ui.layout.VerticalLayout({content:[
					                                            vlayout3,
				                                                oToolbar2                                        
			        
			        ]})
			         ]
		
		});
		var vLayout= new sap.ui.layout.VerticalLayout();
		vLayout.addContent(oPanel1);
		vLayout.addContent(oPanel2);
		
		//Initialize the Dataset and the layouts
		
		function createTemplate(){
			 var itemLayout = new sap.ui.commons.layout.VerticalLayout({

                 content: [

                           new sap.ui.commons.Label({

                                   text: "{date}"

                           }).addStyleClass("CreatedOn"),

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
		}

		var oDataSet = new sap.ui.ux3.DataSet("requestset",{
			showToolbar:true,
			items: {
				path: "/products",
				template: new sap.ui.ux3.DataSetItem({
					title : "{type}"
				})
			},
			views: [
				new sap.ui.ux3.DataSetSimpleView({
					name: "Floating, non-responsive View",
					floating: true,
					responsive: false,
					itemMinWidth: 0,
					template: createTemplate()
				})
			]
		});
		
		var newRequest= new sap.ui.commons.Button("newrequest",{text:"New Request",
			press:function(oEvent)
			{
                oController.newRequestHandler();
		
			}
			}).addStyleClass("req_butt");
		
		oDataSet.addToolbarItem(newRequest);

		var oMat= new sap.ui.commons.layout.MatrixLayout("matlay",{columns:10,layoutFixed:true});
		var oMatCell1=new sap.ui.commons.layout.MatrixLayoutCell("oMatC1",{colSpan:8,vAlign:sap.ui.commons.layout.VAlign.Top,hAlign:sap.ui.commons.layout.HAlign.Left,content:oDataSet});
		var oMatCell2=new sap.ui.commons.layout.MatrixLayoutCell("oMatC2",{colSpan:2,vAlign:sap.ui.commons.layout.VAlign.Top,hAlign:sap.ui.commons.layout.HAlign.Left,content:vLayout});
		
		oMat.addRow(new sap.ui.commons.layout.MatrixLayoutRow({cells:[oMatCell1,oMatCell2]}));
		
		
		var oText= new sap.ui.commons.Label({text:"No Schedule Yet!"});
		var oText2= new sap.ui.commons.Label({text:"No Roles Yet!"});
		var oShell = new sap.ui.ux3.Shell("myShell", {
			appTitle: "SAP Resource Management",
			appIcon: "WebContent/resources/images/SAPLogo.gif",
			appIconTooltip: "SAP logo",
			showPane:false,
			showTools:false,
			showLogoutButton:false,
			
			
			worksetItems: [new sap.ui.ux3.NavigationItem("Req",{key:"wi_home",text:"REQUESTS"}),
			               new sap.ui.ux3.NavigationItem("Sched",{key:"wi_home",text:"SCHEDULE"}),
			               new sap.ui.ux3.NavigationItem("Roles",{key:"wi_home",text:"ROLES"})],
			
			content: oMat,
			
			headerItems: [new sap.ui.commons.TextView({text:"Welcome , Kirti"}),
										new sap.ui.commons.MenuButton({
											text: "Help",
											menu: new sap.ui.commons.Menu("menu1",{items:[
												new sap.ui.commons.MenuItem("menuitem1",{text:"Help"}),
												new sap.ui.commons.MenuItem("menuitem2",{text:"Report Incident"}),
												new sap.ui.commons.MenuItem("menuitem3",{text:"About"})]})
										})],
			
				worksetItemSelected: function(oEvent){
				var sId = oEvent.getParameter("id");
				var oShell = oEvent.oSource;
				switch (sId) {
				case "Req":
					oShell.setContent(oMat);
					break;
				case "Sched":
					oShell.setContent(oText);
					break;
				case "Roles":
					oShell.setContent(oText2);
					break;
				default:
					break;
				}
			},
			
		 	
		});
		
		
		
		
		return oShell;
	}
	
	

});
