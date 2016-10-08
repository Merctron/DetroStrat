var app = {
    
	init: function(schema) {
		this.schema = schema;
		this.crime_data_points = {};
		this.crime_finer_points = {};
		parseCrime();
		findFirstLargest();
		displayOptions();
	},

	/**
   	* bindActions
   	* Bind all event listeners, called once upon init()
   	*	 
   	*/
  	bindActions: function() {
		var me = this;
	},

	/*// Bounds for North America
  	 var strictBounds = new google.maps.LatLngBounds(
    	 new google.maps.LatLng(28.70, -127.50), 
     	new google.maps.LatLng(48.85, -55.90)
	} 

   // Listen for the dragend event
   google.maps.event.addListener(map, 'dragend', function() {
     if (strictBounds.contains(map.getCenter())) return;

     // We're out of bounds - Move the map back within the bounds
     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
   });*/

	/*
	 * displayOptions
	 * Will take all the crime data and display 
	 */
	displayOptions: function() {

	},

	/* 
	 * calculateDistance
	 * calculates the distance between two coordinates using the haversine formula
	 */
	calculateDistance: function() {

		/* The radius of the earth in km */
  		var R = 6371;

  		var dLat = deg2rad(lat2-lat1);  // deg2rad below
  		
  		var dLon = deg2rad(lon2-lon1); 
  		
  		var a = 
    		Math.sin(dLat/2) * Math.sin(dLat/2) +
    		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    		Math.sin(dLon/2) * Math.sin(dLon/2); 
  		
  		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  		
  		var d = R * c; // Distance in km
  		
  		return d;
	},

	deg2rad: function(deg) {
  		return deg * (Math.PI/180)
	},

	/* 
	* parseCrime
	* Funtion used to parse the data from the overall crime data 
	*/
	parseCrime: function() {
		var current_set;
		var data = this.schema.data;
		var precint  = "";
		
		/* For loop to create crime data points based on zip*/
		for (var i = 0; i < data.length; i++) {
			current_set = [];

			/* Push onto the array in the following order: crime, precint, lat, long */
			current_set.push(data[i][9]);
			current_set.push(data[i][15])
			current_set.push(data[i][18][1])
			current_set.push(data[i][18][2]);
			precint = current_set[1];

			/* Push the current set of data into the overall_data */
			if(this.crime_data_points[precint] == undefined){
				this.crime_data_points[precint] = [current_set];
			} else {
				this.crime_data_points[precint].push[current_set]
			}
		}
	},

	/*
	 * findFirstLargest
	 * Will take all the cooridinates from each zip code and place the first two cooridinates that
	 * are more than 5km apart from each other
	 */
	findFirstLargest: function() {
		var precints = Object.keys(this.crime_data_points);
		var first_loc, second_loc; 
		var zip 	 = "";
		var distance = 0;

		/* Nested loop that goes through each zipcode and finds the first largest set of cooridinates */
		for (var i = 0; i < precints.length; i++) {
			precint 	   = precints[i];
			first_loc = this.crime_data_points[precint]; 

			for (var j = 0; j < this.crime_data_points[precint].length; j++) {
				second_loc = this.crime_data_points[precint][j];
				distance = calculateDistance(first_loc[0], first_loc[1], second_loc[0], second_loc[1]);

				if(distance > 5){
					break;	
				}
			}

			this.crime_data_points[zip] = [first_loc, second_loc];
		}
	}
};

(function($, app) {

	$.get('?schema=1', function(data) {
    	app.init(data);
	});

})(jQuery, app);