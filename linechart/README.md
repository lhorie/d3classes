# Line Chart

A basic multiline chart

`LineChart(root, options)`

- `root` :: string - selector for the container that will host the chart, e.g. `"#linechart-container"`
- `options` :: object
	- `margin` :: object - amount of space around the graph
		- `left` :: number - defaults to 20
		- `right` :: number - defaults to 20
		- `top` :: number - defaults to 20
		- `bottom` :: number - defaults to 20
	- `width` :: number - width of graph. Defaults to 400
	- `height` :: number - height of graph. Defaults to 200
	- `xScale` :: d3 scale - a d3 scale callable object that has .range() and .domain() methods, e.g. `d3.scale.linear()`, `d3.time.scale()`. Defaults to `d3.time.scale()`
	- `yScale` :: d3 scale - defaults to `d3.scale.linear()`
	- `idAccessor` :: function(datum) - id accessor. Appends a CSS class to the data item's corresponding line. Should return an string. Defaults to `function(d) {return d}`
	- `dataAccessor` :: function(datum) - depth accessor. Should return an array<object>. Defaults to `function(d) {return d}`
		- `datum` - graph data array item
	- `xAccessor` :: function(datum) - x axis accessor. Should return a number or Date. Defaults to `function(d) {return d}`
	- `yAccessor` :: function(datum) - y axis accessor. Should return a number or Date. Defaults to `function(d) {return d}`
	
		As an example for how accessors are used, consider the following data structure:
		
		```javascript
		var data = [
			{
				"name": "point 1",
				"values": [
					{"date": "1/1/2013", "value": 110},
				]
			}
		]
		```

		The id and data accessors get called for each element in `data`, and passes the array item as a parameter (in this case, the object w/ `name` and `values` properties).
		
		The first step is to indicate which of these two properties we want to use as the root object that contains data pertaining to the x and y axes. To indicate that the `values` property should be used, the dataAccessor should be defined as `function(d) {return d.values}`
		
		Defining an id accessor as `function(d) {return d.name}` will attach the value of `name` as a class name to the line representing the values in `values` on the graph.
		
		Similar to id and data accessors, axis accessors get called for each element in the object returned by the dataAccessor callback. If we wanted to use the `date` property as our x axis and the `value` property as our y axis, the xAccessor should be defined as `function(d) {return parseDate(d.date)}` and yAccessor should be defined as `function(d) {return d.value}`
		
		Note that the axis accessors also give you the ability of parsing the data. In the example, a `parseDate` function is used to convert the date string into a Date object. `parseDate` can be implemented using d3.time.format()
		
	- `formatLabel` :: function(datum) - formatter for data point labels. Should return a string. Defaults to `function(d) {d3.format("3,.2f")(d)}`
	
`.update(data)` - update graph data

- `data` :: array<object> - data to update graph