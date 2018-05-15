//practice importing data into array
var dataset =[];

d3.csv("https://raw.githubusercontent.com/nevillenzf/data-viz/master/dataset.csv")
	//parse certain data
	.row(function(d) { return {	participant:Number(d.participant.trim()),
								nativeEnglish:Number(d.nativeEnglish.trim()),
								analyticMajor: booleanToNum(d.analyticMajor.trim())
							};})
	.get(function(error,data){
		//Do everything else here
		var natEng = 0;
		var analMajor = 0;
		var both = 0;
		var noEngAnalMaj = 0;
		var noAnalengNat = 0;

		data.forEach (function(d){
			if (d.nativeEnglish == "1") natEng++;
			if (d.analyticMajor == 1) analMajor++;
			if (d.analyticMajor == 1 && d.nativeEnglish == "1") both++;
			if (d.analyticMajor == 1 && d.nativeEnglish == "0") noEngAnalMaj++;
			if (d.analyticMajor == 0 && d.nativeEnglish == "1") noAnalengNat++;
			dataset.push({participant : d.participant,analyticMajor: d.analyticMajor,nativeEnglish: d.nativeEnglish});
		})
			//CONSOLE BULLSHIT
					console.log(dataset.length);
					console.log("Neither: " + (data.length - both - noEngAnalMaj - noAnalengNat));

		//graphing bullshit
		var svgWidth = 800, svgHeight = 400, barPadding = 1; 
		//padding default of 1 but change depending on number of data
		var barWidth = (svgWidth / data.length);

		var svg;
		//Data viz background
		svg = d3.select('svg')
    	.attr("width", svgWidth)
    	.attr("height", svgHeight)
    	.style("padding", 10)
    	.attr("left", "50%")
    	.attr("position","fixed");		

		//barGraph(dataset, svg, barWidth, yScale);
		quantityGraph(dataset, svg, natEng,analMajor, noAnalengNat, noEngAnalMaj ,svgWidth, svgHeight)


// Define the div for the tooltip
})

function booleanToNum(string)
{
	if (string == "yes")
	{
		return 1;
	}
	else if (string == "no") return 0;
	else return 0;
}

function barGraph(data, svg, barWidth, yScale)
{

}

function quantityGraph(data, svg, natEng,analMajor, noAnalengNat, noEngAnalMaj, svgWidth, svgHeight)
{
		// Set x, y and colors
		// var x = d3.scale.linear()
  // 		.domain("Yes","")
  // 		.rangeRoundBands([10, width-10], 20);
  	var eng = [natEng, 80 - natEng];

  		var xScale = d3.scaleLinear()
    		.domain(["Yes", "No"])
    		.range([0, svgWidth]);

		var yScale = d3.scaleLinear()
    		.domain([0, 80])
   			.range([svgHeight , 20]);

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var x_axis = d3.axisBottom().ticks(0).scale(xScale);

var y_axis = d3.axisLeft().scale(yScale);
		svg.append("g")
    .attr("transform", "translate(20, -10)")
    .call(y_axis);
         
		var xAxisTranslate = svgHeight - 10;
         
		svg.append("g")
    .attr("transform", "translate(20, " + xAxisTranslate  +")")
    .call(x_axis);

    var barWidth = 100;
    var barChart = svg.selectAll("rect")
    	.data(eng)
    	.enter()
    	.append("rect")
    	.attr("y", function(d) {
    		return svgHeight - d*4
    	})
    	.attr("height", function(d){
    		return d*4;
    	})
    	.attr("width",200)
    	.attr("transform",function(d,i){
    		var translate = [150 + barWidth * (i) + i*150 ,-10];
    		return "translate("+ translate + ")";
    	})
    	.attr("class",function(d)
    	{
    		if (d == natEng) return "barEng";
    		else return "barNoEng";
    	})
    	.on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d + " people")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

    g = svg.append("g").attr("transform", "translate(" + 10 + "," + 10 + ")");
    var z = d3.scaleOrdinal()
    .range(["#ff4d4d","#ffb3b3"]);

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(["Native English Speakers", "Non-Native English Speakers"])
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", svgWidth - 50)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", svgWidth - 70)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

}