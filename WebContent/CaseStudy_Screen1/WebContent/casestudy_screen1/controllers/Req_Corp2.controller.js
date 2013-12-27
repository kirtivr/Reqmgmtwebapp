sap.ui.controller("casestudy_screen1.controllers.Req_Corp2", {
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf casestudy_screen2.Req_Corp2
*/
	onInit: function(channel,event,data) {
		header=sap.ui.getCore().byId("header2");
		header.setText(data+" - New Role");
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf casestudy_screen2.Req_Corp2
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf casestudy_screen2.Req_Corp2
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf casestudy_screen2.Req_Corp2
*/
//	onExit: function() {
//
//	}
	calculate_days : function()
	{
//	Calculate and return number of working days between 2 given days and working days/week. Takes in account leap years and other boundary cases.
		
		
		//debugger;
		var is_leap=function(year)
		{
			if (year%400 == 0)
			{
			return true;
			}

			else if(year%4 == 0 && year%100 !=0)
				{
				return true;
				}
			return false;
			};	
	    
		
		
		
		var date1 = sap.ui.getCore().byId("datea").getYyyymmdd();
		var date2 = sap.ui.getCore().byId("dateb").getYyyymmdd();
		
		if(date1=="" || date2=="")
			return 0;
		if(date1>date2)
			{
			var temp=date2;
			date2=date1;
			date1=temp;
			alert("Start Date was later than End Date so dates were interchanged");
			}
		
		var dpw=sap.ui.getCore().byId("dpw").getValue();
		var y1=parseInt(date1.substring(0,4));
		var m1=parseInt(date1.substring(4,6));
		var d1=parseInt(date1.substring(6,8));
		var y2=parseInt(date2.substring(0,4));
		var m2=parseInt(date2.substring(4,6));
		var d2=parseInt(date2.substring(6,8));
		
		

		var date_js1= new Date();
		date_js1.setFullYear(y1,m1-1,d1);
		var date_js2= new Date();
		date_js2.setFullYear(y2,m2-1,d2);
		
		months=[31,28,31,30,31,30,31,31,30,31,30,31];
		var weekdays=0;
		var yeardays=0;
		
		for(var i=y1 ; i<y2+1; i++)
		{ 
			if(is_leap(i))
				yeardays+=366;
			else
				yeardays+=365;
			
		}
		
		//days before start date in yr
		var daysbefore=0;
		var dd=1;
		var mm=1;
		if(is_leap(y1))
			{
			months[1]=29;
			}
		
		while(!(dd==d1 && mm==m1))
		  { 
		    dd=(dd+1);
		    
		    if (dd>months[mm-1])
		    {
		      mm=mm+1;
		      dd=1;
		    }
		    daysbefore=daysbefore+1;
		    }
		
		//days after date in year
		
		var daysafter=0;
		
		if(is_leap(y2))
		{
		months[1]=29;
		}
		
		 while(!(d2==31 && m2==12))
		  { 
		    d2=(d2+1);
		    
		    if (d2>months[m2-1])
		    {
		      m2=m2+1;
		      d2=1;
		    }
		    daysafter=daysafter+1;
		    }
		daysafter= daysafter+1; // to change from 31st dec to 1st january
		
		
		days=yeardays-daysbefore-daysafter;
		
		//now calculate working days
		var days_to_next_monday_from_day=[1,0,6,5,4,3,2];
		var days_to_prev_monday_from_day=[6,0,1,2,3,4,5];
		if(dpw==5)
			{
		work_days_to_monday_from_day=[0,0,4,3,2,1,0];
		work_days_from_monday_to_day=[4,0,1,2,3,4,4];
			}
		else
			{
		work_days_to_monday_from_day=[0,0,2,2,1,1,0];
		work_days_from_monday_to_day=[3,0,1,2,2,3,3];
			}
		
		day1=date_js1.getDay();

		days_to_next_week=days_to_next_monday_from_day[day1];
		
		work_days_to_next_week=work_days_to_monday_from_day[day1];
		
		days=days-days_to_next_week;
		weekdays= weekdays+work_days_to_next_week;
		
		day2=date_js2.getDay();
	
		days_to_prev_week=days_to_prev_monday_from_day[day2];
		
		work_days_to_prev_week=work_days_from_monday_to_day[day2];
		
		days=days-days_to_prev_week;
		weekdays= weekdays+work_days_to_prev_week;
		
		weekdays = weekdays + (days/7 * dpw) ;
		return weekdays;
		
	},
	

	// Publish data to be sent to the first overlay container here via the EventBus.
	
	setData : function()
	{

	var ctrl=sap.ui.getCore().byId("idReq_Corp11").getController();
    oEvBus= new sap.ui.core.EventBus();
    oEvBus.subscribe("arole","transfer",ctrl.getData,ctrl);
    
    var data = {products:[]};
    var role_des_val=sap.ui.getCore().byId("role_desc").getValue();
    var role_loc_val=sap.ui.getCore().byId("role_loc").getValue();
    var days_val=sap.ui.getCore().byId("caldays").getValue();
    
    var oProduct = {role_des:role_des_val,role_loc:role_loc_val,days:days_val};
    
    data.products.push(oProduct);
    
    oEvBus.publish("arole","transfer",data);
    },
    
    close: function()
    {
    	var container= sap.ui.getCore().byId("container1");
    	if(container)
		{
		container.close();
		}
    	
    }
});