var app = {
    
	init: function(schema) {
		this.schema = schema;
		this.crime_data_points = {};
		parseCrime();
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
	* parseCrime
	* Funtion used to parse the data from the overall crime data 
	*/
	parseCrime: function() {
		var current_set;
		var data = this.schema.data;

		for (var i = 0; i < data.length; i++) {
			current_set = [];

			/* Push onto the array in the following order: crime, zip, lat, long */
			current_set.push(data[i][9]);
			current_set.push(data[i][11])
			current_set.push(data[i][18][1])
			current_set.push(data[i][18][2]);

			/* Push the current set of data into the overall_data */
			crime_data_points.data.push[current_set]
		}
	}
};

(function($, app) {

	$.get('?schema=1', function(data) {
    	app.init(data);
	});

})(jQuery, app);