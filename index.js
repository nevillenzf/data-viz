

//Set up for Data Viz
var dataset =[];
		var natEng = 0;
		var analMajor = 0;
		var both = 0;
		var noEngAnalMaj = 0;
		var noAnalengNat = 0;
		var neither = 0;

d3.csv("https://raw.githubusercontent.com/nevillenzf/data-viz/master/dataset.csv")
	//parse certain data
	.row(function(d) { return {	participant:Number(d.participant.trim()),
								nativeEnglish:Number(d.nativeEnglish.trim()),
								analyticMajor: booleanToNum(d.analyticMajor.trim())
							};})
	.get(function(error,data){
		//Do everything else here

		//practice importing data into array
		//Default set up of page
		var mode = d3.selectAll("#handler")
		.attr("class", "English");

		var varButtons = d3.selectAll("#group2")
		.on("click",function(){
				if (this.classList.contains('selected'))
				{
					this.classList.remove('selected');
				}
				else{
					this.classList.add('selected');
				}
		})

		data.forEach (function(d){
			dataset.push({participant : d.participant,analyticMajor: d.analyticMajor,nativeEnglish: d.nativeEnglish});
		})

		//graphing bullshit
		var svgWidth = 730, svgHeight = 380, barPadding = 1; 
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
		quantityGraph(dataset, svg, svgWidth, svgHeight)

		var infoSection = d3.select("ul")
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

function quantityGraph(data, svg, svgWidth, svgHeight)
{
	//Set quantitative data
  	data.forEach (function(d){
		if (d.nativeEnglish == "1") natEng++;
		if (d.analyticMajor == 1) analMajor++;
		if (d.analyticMajor == 1 && d.nativeEnglish == "1") both++;
		if (d.analyticMajor == 1 && d.nativeEnglish == "0") noEngAnalMaj++;
		if (d.analyticMajor == 0 && d.nativeEnglish == "1") noAnalengNat++;
		})
  	neither = data.length - both - noEngAnalMaj - noAnalengNat;

  	//Create groups of data
  	var eng = [natEng, data.length - natEng];
  	var anal = [analMajor, data.length - analMajor];
  	var binaryLabels = ["Yes", "No"];
  	var legendInfo = [];
  	var currData = [];

  		var xScale = d3.scaleBand()
    		.domain(binaryLabels)
    		.range([0, svgWidth]);

		var yScale = d3.scaleLinear()
    		.domain([0, data.length])
   			.range([svgHeight , 20]);

// var div = d3.select("body").append("div")	
//     .attr("class", "tooltip")				
//     .style("opacity", 0);

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
    var myChart;

    myChart = svg.append("g");


    var bar = myChart.append("g")
    	.selectAll("g")
    	.data(eng)
    	.enter().append("g")
    	.attr("transform",function(d,i){
    		var translate = [(svgWidth/(eng.length*3.5)) + barWidth*i + i*(svgWidth/(eng.length*1.4)) ,-10];
    		return "translate("+ translate + ")";
    	});


    	bar.append("rect")
    	.attr("y", function(d) { return svgHeight - (d*4.5)})
    	.attr("height", function(d){return d*4.5;})
    	.attr("width",200)
		.attr("class",function(d){
    		if (d == natEng) return "barEng";
    		else return "barNoEng";
    	})

    	bar.append("text")
    	.attr("x", barWidth-5+"px")
    	.attr("y", function(d){return svgHeight - (d*4.5) -10;})
    	.text(function (d,i){return d;})
    	.style("background-color", "rgba(0,0,0,0)");


    	//MOUSE OVER INFO
    	// .on("mouseover", function(d) {		
     //        div.transition()		
     //            .duration(200)		
     //            .style("opacity", .9);		
     //        div	.html(d + " people")	
     //            .style("left", (d3.event.pageX) + "px")		
     //            .style("top", (d3.event.pageY - 28) + "px");	
     //        })					
     //    .on("mouseout", function(d) {		
     //        div.transition()		
     //            .duration(500)		
     //            .style("opacity", 0);	
     //    });


    //Legend stuff
    g = svg.append("g").attr("transform", "translate(" + 10 + "," + 10 + ")");

    var z = d3.scaleOrdinal().range(["#ff4d4d","#ffb3b3"]);

    var legend = g.append("g")
      .attr("font-family", "Bahnschrift")
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