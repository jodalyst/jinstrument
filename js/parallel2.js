
function Parallel_Plot(values,plot_width,plot_height,max_val,min_val){
  this.axisPadding = 20;
  var self = this; //handles weird scoping issues
  var scaler = d3.scale.linear()
                .domain([min_val,max_val])
                .range([0,plot_height]);

  
  d3.select(".chart").style("width",plot_width + "px").style("height",plot_height+"px").style("border-style","solid").style("margin","0 auto");
  this.dataArray = [600,800];
  
  //create svg
  this.svg = d3.select(".chart").append("svg")
          .attr("height",plot_height+"px")
          .attr("width",plot_width+"px");
 
  //make the bars
  this.svg.append("g").attr("transform", "translate(0,-" + this.axisPadding+")").selectAll("rect")
  .data(this.dataArray).enter().append("rect")
  .attr("height",function(d,i){return scaler(d);})
  .attr("width",function(){return plot_width/self.dataArray.length-20;})
  .attr("x",function(d,i){
    return i* plot_width/self.dataArray.length + 10+"px";
  })
  .attr("transform","scale(1,-1) translate(0,-200)")
  .attr("y",function(d,i){return plot_height-d/10+"px";}).attr("class","bar");

  //add text
  this.svg.selectAll("text").data(this.dataArray).enter().append("text")
  .text(function(d){return d;})
  .attr("class","text")
  .attr("x",function(d,i){
    return i* plot_width/self.dataArray.length+(plot_width/self.dataArray.length-10)/2+"px";
  })
  .attr("y",function(d,i){return plot_height-d/10+10+"px";});
  
  //create y axis scale
  this.yScale = d3.scale.linear()
                .domain([max_val,min_val])
                .range([0,plot_height]);
  //create y axis
  this.yAxis = d3.svg.axis().scale(this.yScale).orient("right").ticks(5);
  this.svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,0)")
    .call(this.yAxis);

 
  
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
        return  -1*plot_height+"px";});
    
    this.svg.selectAll(".text").text(function(d,i){return values[i];})
    .attr("y",function(d,i){
      return plot_height-self.newData[i]-self.axisPadding/2+"px";});
  }
}

