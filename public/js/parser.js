var app = {
    
	init: function(schema) {
		this.schema = schema;
		this.crime_data_points = {};
		parseCrime();
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

	/*
	 * displayOptions
	 * Will take all the crime data and display 
	 */
	displayOptions: function() {

	}

	/* 
	* parseCrime
	* Funtion used to parse the data from the overall crime data 
	*/
	parseCrime: function() {
		var current_set;
		var data = this.schema.data;
		var zip  = "";
		
		/* For loop to create crime data points based on zip*/
		for (var i = 0; i < data.length; i++) {
			current_set = [];

			/* Push onto the array in the following order: crime, zip, lat, long */
			current_set.push(data[i][9]);
			current_set.push(data[i][11])
			current_set.push(data[i][18][1])
			current_set.push(data[i][18][2]);
			zip = current_set[1];

			/* Push the current set of data into the overall_data */
			if(this.crime_data_points[zip] == undefined){
				this.crime_data_points[zip] = [current_set];
			} else {
				this.crime_data_points[zip].push[current_set]
			}
		}
	}
};

(function($, app) {

	$.get('?schema=1', function(data) {
    	app.init(data);
	});

})(jQuery, app);