function LineChart(root, options) {
	var format = d3.format("3,.2f")
	options.margin = options.margin || {}
	options.margin.left = options.margin.left || 20
	options.margin.right = options.margin.right || 20
	options.margin.top = options.margin.top || 20
	options.margin.bottom = options.margin.bottom || 20
	options.width = options.width || 400
	options.height = options.height || 200
	options.xScale = options.xScale || d3.time.scale()
	options.yScale = options.yScale || d3.scale.linear()
	options.idAccessor = options.idAccessor || function(d) {return d}
	options.dataAccessor = options.dataAccessor || function(d) {return d}
	options.xAccessor = options.xAccessor || function(d) {return d}
	options.yAccessor = options.yAccessor || function(d) {return d}
	options.formatLabel = options.formatLabel || function(d) {return format(d)}
	
	var margin = options.margin
	var width = options.width - options.margin.left - options.margin.right
	var height = options.height - options.margin.top - options.margin.bottom
	var svg = d3.select(root).append("svg")
		.attr("width", width + options.margin.left + options.margin.right)
		.attr("height", height + options.margin.top + options.margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	var svgXAxis = svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
	var svgYAxis = svg.append("g")
		.attr("class", "y axis")
	
	this.update = function(data) {
		var values = data.reduce(function(mem, d) {return mem.concat(options.dataAccessor(d))}, [])
		var x = options.xScale
			.range([0, width])
			.domain(d3.extent(values, options.xAccessor))
		var y = options.yScale
			.range([height, 0])
			.domain(d3.extent(values, options.yAccessor))
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
		var line = d3.svg.line()
			.x(function(d) {return x(options.xAccessor(d))})
			.y(function(d) {return y(options.yAccessor(d))})
		
		svgXAxis.transition().call(xAxis)
		svgYAxis.transition().call(yAxis)
		
		var paths = svg.selectAll(".line").data(data)
		paths.call(updateLines)
		paths.enter()
			.append("path")
			.call(updateLines)
		paths.exit().remove()
		
		var points = svg.selectAll("circle").data(values)
		points.call(updateCircles)
		points.enter()
			.append("circle")
			.call(updateCircles)
		points.exit().remove()
		
		var labels = svg.selectAll(".label").data(values)
		labels.call(updateLabels)
		labels.enter()
			.append("text")
			.call(updateLabels)
		labels.exit().remove()
		
		function updateLines(selection) {
			selection.attr("stroke", "#000000")
				.attr("class", function(d) {return "line " + options.idAccessor(d)})
				.transition()
				.attr("d", function(d) {return line(d.data)})
		}
		function updateCircles(selection) {
			selection.attr("r", 5)
				.transition()
				.attr("cx", function(d) {return x(options.xAccessor(d))})
				.attr("cy", function(d) {return y(options.yAccessor(d))})
		}
		function updateLabels(selection) {
			selection.attr("class", "label")
				.text(function(d) {return options.formatLabel(options.yAccessor(d))})
				.transition()
				.attr("x", function(d) {return x(options.xAccessor(d)) + 5})
				.attr("y", function(d) {return y(options.yAccessor(d)) - 5})
		}
	}
}
