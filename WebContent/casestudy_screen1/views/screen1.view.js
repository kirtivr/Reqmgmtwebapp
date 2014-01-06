sap.ui.jsview("casestudy_screen1.views.screen1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf casestudy_screen1.views.screen1
	*/ 
	getControllerName : function() {
		return "casestudy_screen1.controllers.screen1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf casestudy_screen1.views.screen1
	*/ 
	createContent : function(oController) {


		var oOverlayContainer = new sap.ui.ux3.OverlayContainer("myOverlayContainer", {
			openButtonVisible: false,
			content: [
			          new sap.ui.view({id:"idReq_Corp11", viewName:"casestudy_screen1.views.Req_Corp", type:sap.ui.core.mvc.ViewType.JS,width:"100%",height:"100%"})
			          ],
		}).addStyleClass("OverlayContainerStyle");
		
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
		
		var oDataSet = new sap.ui.ux3.DataSet("myDataSet", {
			items: {
				path: "/products",
				template: new sap.ui.ux3.DataSetItem({
				})
			},
			views: [
				new sap.ui.ux3.DataSetSimpleView({
					name: "Floating, non-responsive View",
					floating: true,
					responsive: false,
					itemMinWidth: 0,
					template: oController.createTemplate()
				})
			],
			search: function search(oEvent) {
	               oController.search(oEvent);
	        },
			selectionChanged: function search(oEvent) {
				alert("Product selected.");
			}
		});
		var newRequestButton = new sap.ui.commons.Button("newRequestButton", {
			text: "New Request",
			press: function(oEvent){ 
	                oController.newRequestHandler();
	        },
		});
		oDataSet.addToolbarItem(newRequestButton);
		
		var dateFromLabel = new sap.ui.commons.Label("dateFromLabel", {
			text: "From:"
		}).addStyleClass("FromToLabel");
		
		var dateToLabel = new sap.ui.commons.Label("dateToLabel", {
			text: "To:"
		}).addStyleClass("FromToLabel");
		
		var oDatePicker1 = new sap.ui.commons.DatePicker('date_pane1');
		oDatePicker1.setYyyymmdd("20210402");
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
		
		var oDatePicker2 = new sap.ui.commons.DatePicker('date_pane2');
		oDatePicker2.setYyyymmdd("20210404");
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
		
		var oToolbar2 = new sap.ui.commons.Toolbar("tb2");
		oToolbar2.addItem(filterButton);
		oToolbar2.addItem(defaultButton);
		
		var vlayout3 = new sap.ui.commons.layout.VerticalLayout("vlayout3", {
			content: [
			          dateFromLabel,
			          oDatePicker1,
			          dateToLabel,
			          oDatePicker2
			          ]
		}).addStyleClass("DatePicker");
		
		var panel1 = new sap.ui.commons.Panel("panel1", {
			content: [
			          
			          new sap.ui.commons.layout.VerticalLayout({
			        	  content: [
										new sap.ui.commons.ListBox("requestsListBox1", {
											items: [
											        new sap.ui.core.Item("openRequestsLink", {
											        	text: "Open Requests (2)",
											        }),
											        ],
									        select: function() {
									        	oController.requestsListHandler();
									        },
										}).addStyleClass("ReqListBox1"),
										new sap.ui.commons.ListBox("requestsListBox2", {
											items: [
											        new sap.ui.core.Item("newRequsetsLink", {
											        	text: "New (1)",
											        }),
											        new sap.ui.core.Item("inProcessRequestsLink", {
											        	text: "In Process (0)",
											        }),
											        new sap.ui.core.Item("validatedRequestsLink", {
											        	text: "Validated (1)",
											        }),
											        ],
									        select: function() {
									        	oController.requestsListHandler();
									        },
										}).addStyleClass("ReqListBox2"),
										new sap.ui.commons.ListBox("requestsListBox3", {
											items: [
											        new sap.ui.core.Item("completedRequestsLink", {
											        	text: "Completed (1)",
											        }),
											        ],
									        select: function() {
									        	oController.requestsListHandler();
									        },
										}).addStyleClass("ReqListBox3"),
			        	            ],
			          }),
						
			          ]
		});
		panel1.setTitle(new sap.ui.commons.Title({text: "Request Status"}));
		
		var panel2 = new sap.ui.commons.Panel("panel2", {
			height: "350px",
			content: [
						vlayout3,
						oToolbar2
			          ]
		});
		panel2.setTitle(new sap.ui.commons.Title({text: "Creation Date"}));
		
		var vlayout2 = new sap.ui.commons.layout.VerticalLayout("vlayout2", {
			width: "200px",
			content: [
			          panel1,
			          panel2
			          ]
		});
		
		var mlayout = new sap.ui.commons.layout.MatrixLayout("mlayout", {
			columns: 10,
		});
		
		var mrow = new sap.ui.commons.layout.MatrixLayoutRow("mrow");
		
		var mcell = new sap.ui.commons.layout.MatrixLayoutCell("mcell1", {
			colSpan: 8,
			vAlign: sap.ui.commons.layout.VAlign.Top
		}).addStyleClass("DatasetStyle");
		
		mcell.addContent(oDataSet);
		mrow.addCell(mcell);
		
		mcell = new sap.ui.commons.layout.MatrixLayoutCell("mcell2", {
			colSpan: 2,
			vAlign: sap.ui.commons.layout.VAlign.Top
		});
		
		mcell.addContent(vlayout2);
		mrow.addCell(mcell);
		
		mlayout.addRow(mrow);
		
		var oShell = new sap.ui.ux3.Shell("myShell", {
			appTitle: "SAP Resource Management",
			appIcon: "images/sap-logo.png",
			appIconTooltip: "SAP Logo",
			showLogoutButton: false,
			showSearchTool: false,
			showInspectorTool: false,
			showFeederTool: false,
			showPaneBar: true,
			showTools: true,
			content: mlayout,
			worksetItems: [
			               
			               new sap.ui.ux3.NavigationItem("WI_requests", {
			            	   key: "wi_requests",
			            	   text: "Requests"
			               }),
			               new sap.ui.ux3.NavigationItem("WI_schedule", {
			            	   key: "wi_schedule",
			            	   text: "Schedule"
			               }),
			               new sap.ui.ux3.NavigationItem("WI_roles", {
			            	   key: "wi_roles",
			            	   text: "Roles"
			               })
			               
			               ],
			headerItems: [
			              
			              new sap.ui.commons.TextView({
			            	  text: "Welcome, User Name",
			            	  tooltip: "Username"
			              }),
			              new sap.ui.commons.MenuButton({
			            	  text: "Help",
			            	  tooltip: "Help Menu",
			            	  menu: new sap.ui.commons.Menu({
			            		  items: [
			            		          
										  new sap.ui.commons.MenuItem("menuitem1",{text:"Helpitem1"}),
										  new sap.ui.commons.MenuItem("menuitem2",{text:"Helpitem2"}),
										  new sap.ui.commons.MenuItem("menuitem3",{text:"Helpitem3"})
			            		          
			            		          ]
			            	  }),
			              }),
			              
			              ],
			
			worksetItemSelected: function(oEvent){
			                  var sId = oEvent.getParameter("id");
			                  var oShell = oEvent.oSource;
			                  switch (sId) {
			                  case "WI_requests":
									  oShell.setContent(mlayout);
			                          break;
			                  case "WI_schedule":
			                          oShell.setContent(new sap.ui.commons.TextView({
										  text: "Schedule!"
									  }));
			                          break;
			                  case "WI_roles":
			                          oShell.setContent(new sap.ui.commons.TextView({
										  text: "Roles!"
									  }));
			                          break;
			                  default:
			                          break;
			                  }
			          },   
		});
		
		return oShell;
		}


});
