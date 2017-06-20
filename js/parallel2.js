
function Parallel_Plot(num_values,labels,plot_width,plot_height,max_val,min_val,color){
  this.margin = {top: 20, right: 30, bottom: 30, left: 40};
  var self = this; //handles weird scoping issues
  this.axisPadding = 20+this.margin.left;
  this.dataArray = [];
  for(i = 0; i < num_values; i++){
    self.dataArray[i] = 0;
  }
  
  var scaler = d3.scale.linear()
                .domain([min_val,max_val])
                .range([0,plot_height-this.margin.top-this.margin.bottom]);

  d3.select(".plotbox").append("div").attr("class","chart");
  
  //create svg
  this.svg = d3.select(".chart").append("svg")
          .attr("height",plot_height+"px")
          .attr("width",plot_width+"px")
          .style("display", "inline-block")
          .attr("id","svg_for_plotbox");
  
  //create x axis scale
  this.xScale = d3.scale.linear().domain([this.margin.left,plot_width]).range([this.margin.left,plot_width]);
  var ticks = [];
  for(i=0;i<num_values;i++){
    ticks[i] = this.xScale((i* (plot_width-self.axisPadding)/self.dataArray.length)+self.axisPadding + ((plot_width-self.axisPadding)/self.dataArray.length)/num_values);
  }
  var tickLabels = labels;

  //create x axis
  this.xAxis = d3.svg.axis().scale(this.xScale).orient("bottom").tickValues(ticks)
.tickFormat(function(d,i){ return tickLabels[i] });
;
  this.svg.append("g").attr("class", "x axis").call(this.xAxis).attr("transform","translate(0,"+(plot_height-self.margin.bottom)+")");
  //create y axis scale
  this.yScale = d3.scale.linear()
                .domain([min_val,max_val])
                .range([plot_height-this.margin.top,this.margin.bottom]);
  //create y axis
  this.yAxis = d3.svg.axis().scale(this.yScale).orient("left").ticks(15).tickValues(this.yScale.ticks().concat(this.yScale.domain()));
  this.svg.append("g").attr("class", "y axis").attr("transform","translate("+this.margin.left+","+(this.margin.top-this.margin.bottom)+")").call(this.yAxis);
 
  //create the grid
  this.y_grid = d3.svg.axis().scale(this.yScale).orient("left").ticks(15).tickSize(-plot_width, 1, 1).tickFormat("").tickValues(this.yScale.ticks().concat(this.yScale.domain()));
  this.svg.append("g").attr("class", "grid")
        .attr("transform","translate("+this.margin.left+","+(this.margin.top-this.margin.bottom)+")").call(this.y_grid);
  
 
  //make the bars
  this.svg.append("g").attr("class","bar_container").selectAll("rect")
  .data(this.dataArray).enter().append("rect")
  .attr("height",function(d,i){return scaler(d);})
  .attr("width",function(){return (plot_width-self.axisPadding)/self.dataArray.length-20;})
  .attr("x",function(d,i){
    return (i* (plot_width-self.axisPadding)/self.dataArray.length)+self.axisPadding;
  })
  .attr("transform","scale(1,-1) translate(0,-200)")
  .attr("y",function(d,i){return plot_height-d/10+"px";}).attr("class","bar")
  .style("fill",color);

  // //add text
  // this.svg.select(".bar_container").selectAll("text").data(this.dataArray).enter().append("text")
  // .text(function(d){return d;})
  // .attr("class","text")
  // .attr("x",function(d,i){
  //   return self.xScale((i* (plot_width-self.axisPadding)/self.dataArray.length)+self.axisPadding + ((plot_width-self.axisPadding)/self.dataArray.length)/num_values);
  // })
  // .attr("y",function(d,i){return plot_height-d/10+10;});

  
  
  this.step = function(values){
    this.newData = [];
    for(i = 0; i<values.length;i++){
      this.newData[i] = scaler(values[i]);
    }
    
    this.svg.selectAll("rect")
    .attr("transform","scale(1,-1)")
    .attr("height",function(d,i){
      if(isNaN(self.newData[i])){
        return "20px";
      }
      return (self.newData[i] + "px");})
      .attr("y",function(d,i){
        return  -1*plot_height+self.margin.bottom+"px";});
    
    // this.svg.selectAll(".text").text(function(d,i){return values[i];})
    // .attr("y",function(d,i){
    //   return plot_height-self.margin.top-self.margin.bottom/4-self.newData[i]/2;});
  }
}

