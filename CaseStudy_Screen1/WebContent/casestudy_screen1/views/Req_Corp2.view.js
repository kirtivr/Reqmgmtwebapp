sap.ui.jsview("casestudy_screen1.views.Req_Corp2", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf casestudy_screen1.Req_Corp2
	*/ 
	getControllerName : function() {
		return "casestudy_screen1.controllers.Req_Corp2";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf casestudy_screen1.Req_Corp2
	*/ 
	createContent : function(oController2) {
	/*
	 * Structure of layout same as overlay container 1 with customisations.
	 */	
		var vLayout= new sap.ui.layout.VerticalLayout({width:"100%"});
        
		var oPanel1= new sap.ui.commons.Panel({expandable:true});
        var oPanel2= new sap.ui.commons.Panel({expandable:true});
        var oPanel3= new sap.ui.commons.Panel({expandable:true});
        var oPanel4= new sap.ui.commons.Panel({expandable:true});
        var oPanel5= new sap.ui.commons.Panel({expandable:true,buttons: new sap.ui.commons.Button({text:"Add Candidate"})});
        var oPanel6= new sap.ui.commons.Panel({expandable:true});
        
               
                
        oPanel1.setTitle( new sap.ui.core.Title({text:"Role Details"}));
        oPanel2.setTitle( new sap.ui.core.Title({text:"Location and Languages"}));
        oPanel3.setTitle( new sap.ui.core.Title({text:"Role Scheduling"}));
        oPanel4.setTitle( new sap.ui.core.Title({text:"Scope of Tasks"}));
        oPanel5.setTitle( new sap.ui.core.Title({text:"Candidates"}));
        oPanel6.setTitle( new sap.ui.core.Title({text:"Internal Comments"}));
        
        var vLayout1=new sap.ui.layout.VerticalLayout();
        var vLayout2=new sap.ui.layout.VerticalLayout();
        var vLayout3=new sap.ui.layout.VerticalLayout();
        var vLayout4=new sap.ui.layout.VerticalLayout();
        var vLayout5=new sap.ui.layout.VerticalLayout();
        var vLayout6=new sap.ui.layout.VerticalLayout();
        
        var header = new sap.ui.commons.TextView("header2");
        header.addStyleClass("header_1");
        
        var label1=new sap.ui.commons.Label({requiredAtBegin:true, text: "Role Description",required:true});
        var field1=new sap.ui.commons.TextField("role_desc",{width:"250px"});
        	
      
       var label2=new sap.ui.commons.Label({requiredAtBegin:true,text: "Job Text",required:true});
       var field2=new sap.ui.commons.DropdownBox({required:true,
           items:[
                  new sap.ui.core.ListItem({text:"Technology Associate"}),
                  new sap.ui.core.ListItem({text:"Developer Associate"})]
                  });
       
       var label3=new sap.ui.commons.Label({text: "Assignment Type"});
       var field3=new sap.ui.commons.DropdownBox({required:true,
           items:[
                  new sap.ui.core.ListItem({text:"Billable"}),
                  new sap.ui.core.ListItem({text:"Non Billable"})]
                  });
       
      
       
    	
    	
    	
       var label4=new sap.ui.commons.Label({requiredAtBegin:true,text: "Role Location",required:true});
       var field4=new sap.ui.commons.TextField("role_loc",{value:"BLR"});
        
       var hlay1=  new sap.ui.layout.HorizontalLayout( {
          	content: [
       	          new sap.ui.commons.Label({requiredAtBegin:true,text: "Country",required:true}).addStyleClass("locationlabel"),
       	          new sap.ui.commons.Label({requiredAtBegin:true,text: "State/Province",required:true})
       	          
       	          ]
       });
        var locddb = new sap.ui.commons.DropdownBox("locationvalues",{required:true,width:"200px"});
        locddb.addItem(new sap.ui.core.ListItem({text:"Quebec City"}));
		locddb.addItem(new sap.ui.core.ListItem({text:"Vancouver"}));
        
       	var countryddb= new sap.ui.commons.DropdownBox("countryvalues",{
										 	    	  required:true,
										   	    	  width:"200px",
										   	          items:[
										             new sap.ui.core.ListItem({text:"Canada"}),
										             new sap.ui.core.ListItem({text:"USA"})],
										   	      	 change:function(ovt,olist)
										   	      	 {
										   	      	var country = sap.ui.getCore().byId("countryvalues").getValue();
										   	      	console.log(country);
										   			if (country=="USA")
										   				{
										   				locddb.removeAllItems();
										   				locddb.addItem(new sap.ui.core.ListItem({text:"Palo Alto"}));
										   				locddb.addItem(new sap.ui.core.ListItem({text:"New York"}));
										   				}
										   			else if (country=="Canada")
										   				{
										   				locddb.removeAllItems();
										   				locddb.addItem(new sap.ui.core.ListItem({text:"Quebec City"}));
										   				locddb.addItem(new sap.ui.core.ListItem({text:"Vancouver"}));
										   				}
										   			console.log(locddb);
										   	      	 }
										             }).addStyleClass("locationfield");
       	
		var hlay2=	new sap.ui.layout.HorizontalLayout( {
		   	content: [
		   	      countryddb,
		          locddb
		   	          ]
		   });
       
       
       var label5=new sap.ui.commons.Label({text: "Can the work be completed remotely?"});
       var field5=new sap.ui.commons.RadioButtonGroup({
           columns : 4,
           selectedIndex : 2,
           items:[ 
                  
                   new sap.ui.core.Item({
		        		text : "Yes",
		        		key : "Key1"}),
        		   new sap.ui.core.Item({
        				text : "No",
        				key : "Key1"}),
				   new sap.ui.core.Item({
	    				text : "Part of the time",
	    				key : "Key1"}),
                   
                   ]
           });
       var label6=new sap.ui.commons.Label({requiredAtBegin:true,text: "Role Languages",required:true});
       var field6=new sap.ui.commons.TextField({width:"250px"});
       
       
       var hlay3=  new sap.ui.layout.HorizontalLayout( {
          	content: [
       	          new sap.ui.commons.Label({requiredAtBegin:true,text: "Start Date",required:true}).addStyleClass("datelabeloverlay2"),
       	          new sap.ui.commons.Label({requiredAtBegin:true,text: "End Date",required:true})
       	          
       	          ]
       });
       	
       	var hlay4=	new sap.ui.layout.HorizontalLayout( {
           	content: [
           	          new sap.ui.commons.DatePicker("datea",{width:"200px",}).addStyleClass("datefieldoverlay2"),
           	          new sap.ui.commons.DatePicker("dateb",{width:"200px",})
           	          ]
           });
       	
       	var label7=new sap.ui.commons.Label({requiredAtBegin:true,text: "Days per week",required:true});
        var field7=new sap.ui.commons.DropdownBox("dpw",{required:true,
        	width:"50px",
            items:[
                   new sap.ui.core.ListItem({text:"5"}),
                   new sap.ui.core.ListItem({text:"3"})]
                   });	
        
        var label8=new sap.ui.commons.Label({requiredAtBegin:true,text: "Number of days requested",required:true});
        
        var fieldtext=new sap.ui.commons.TextField("caldays",{width:"22%"});
        var calc_butt=new sap.ui.commons.Button("Cal_days",{text:"Calculate Days",press:
        	function()
        	{
        	var weekdays=oController2.calculate_days();
        	fieldtext.setValue(weekdays);
        	}
        	}).addStyleClass("calcdaysbutton");
        	
        
        var hlay5=new sap.ui.layout.HorizontalLayout( {
        	allowWrapping:true,
           	content: [
        	          fieldtext,
        	          calc_butt
        	          ]
        });
        
        
//        console.log(sap.ui.getCore().byId("Cal_days"));
        var label9=new sap.ui.commons.Label({requiredAtBegin:true,text: "Describe what the consultant should be doing?",required:true});
        var field9=new sap.ui.commons.TextArea({required:true,rows:4,width:"325px"}).addStyleClass("TArea");
        
        var oTable = new sap.ui.table.Table({
        	visibleRowCount: 0,
        	selectionMode: sap.ui.table.SelectionMode.Single,
        });

        //Define the columns and the control templates to be used
        var oColumn1 = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "Candidate"}),
        	//template:
        	
        }); 
        var oColumn2 = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "Proposed Start"}),
        	//template: 
        	
        }); 
        var oColumn3 = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "Proposed End"}),
        	//template:
        	
        }); 
        var oColumn4 = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "Staffed"}),
        	//template:
        	
        }); 
        var oColumn5 = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "Preferred/Named"}),
        	//template:
        	
        });  
        var oColumn6 = new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "External"}),
        	//template:
        	
        }); 
        
        oTable.addColumn(oColumn1);
        oTable.addColumn(oColumn2);
        oTable.addColumn(oColumn3);
        oTable.addColumn(oColumn4);
        oTable.addColumn(oColumn5);
        oTable.addColumn(oColumn6);
        
        
        
       var field10=new sap.ui.commons.TextArea({required:true,rows:4,width:"325px"});
       
       vLayout1.addContent(label1);
       vLayout1.addContent(field1.addStyleClass("vspace"));
       vLayout1.addContent(label2);
       vLayout1.addContent(field2.addStyleClass("vspace"));
       vLayout1.addContent(label3);
       vLayout1.addContent(field3.addStyleClass("vspace"));
       vLayout2.addContent(label4);
       vLayout2.addContent(field4.addStyleClass("vspace"));
       vLayout2.addContent(hlay1);
       vLayout2.addContent(hlay2.addStyleClass("vspace"));
       vLayout2.addContent(label5);
       vLayout2.addContent(field5.addStyleClass("vspace"));
       vLayout2.addContent(label6);
       vLayout2.addContent(field6.addStyleClass("vspace"));
       vLayout3.addContent(hlay3);
       vLayout3.addContent(hlay4.addStyleClass("vspace"));
       vLayout3.addContent(label7);
       vLayout3.addContent(field7.addStyleClass("vspace"));
       vLayout3.addContent(label8);
       vLayout3.addContent(hlay5);
       vLayout4.addContent(label9);
       vLayout4.addContent(field9.addStyleClass("vspace"));
       vLayout5.addContent(oTable);
       vLayout6.addContent(field10.addStyleClass("vspace"));
        
       oPanel1.addContent(vLayout1);
       oPanel2.addContent(vLayout2);
       oPanel3.addContent(vLayout3);
       oPanel4.addContent(vLayout4);
       oPanel5.addContent(vLayout5); 
       oPanel6.addContent(vLayout6);
       
       vLayout.addContent(oPanel1);
       vLayout.addContent(oPanel2);
       vLayout.addContent(oPanel3);
       vLayout.addContent(oPanel4);
       vLayout.addContent(oPanel5);
       vLayout.addContent(oPanel6);
        
        var bLayout = new sap.ui.commons.layout.BorderLayout({
        	top: new sap.ui.commons.layout.BorderLayoutArea({
        		size: "6%",
        		
        		visible: true, 
        		content: [
        		          header]
        		}),
        	bottom: new sap.ui.commons.layout.BorderLayoutArea("bottom_2",{
        		size: "3.75%",
        		contentAlign: "right",
        		visible: true, 
        		content: [new sap.ui.commons.Button("cancel_2",{text:"Cancel",
        	        style: sap.ui.commons.ButtonStyle.Default,
        			press : function(){oController2.close();}
        		}),
        		          new sap.ui.commons.Button("submit_2",{text:"Save Role",
        		        	style: sap.ui.commons.ButtonStyle.Emph,
        		  			press :function(){oController2.setData();
        		  			}})]
        	
        		
        		}),
        	begin: new sap.ui.commons.layout.BorderLayoutArea({
        		size: "2%",
        		contentAlign: "center",
        		visible: true, 
        		content: []
        		}),
        	center: new sap.ui.commons.layout.BorderLayoutArea({
        		contentAlign: "left",
        		visible: true, 
        		content: [vLayout]
        		}),
        	end: new sap.ui.commons.layout.BorderLayoutArea({
        		size: "2%",
        		contentAlign: "center",
        		visible:true, 
        		content: []
        		})
        	});
        
        
        
        return bLayout;
	
	}

});
