function Time_Parallel_Plot(values,chart_height,chart_width){
  this.data = new Array();
  if(typeof values[0] == 'undefined'){
    console.log("values undefined");
    for(i = 0;i < values.length; i++){
      this.data.push(500);
    }
    console.log("test " + this.data);
  }
  else{
    this.data = values;
  }
  console.log("data: " + this.data);
  console.log(values);
  d3.select(".chart")
  .selectAll("div")
  .data(this.data)
  .enter().append("div")
  .style("height", function(d) { return (d/(1278/chart_height)) + "px"; })
  .style("width",function(){return chart_width/values.length + "px";})
  .style("position","relative")
  .style("display","inline-block")
  .style("vertical-align","baseline")
  .style("padding","0px")
  .style("margin", "0px 5px 0px 5px")
  .style("top",function(d){
    return (chart_height-d/(1278/chart_height))/2 + "px";})
  .text(function(d) { return d; });


  this.step = function(values){
    if(typeof values[0] == 'undefined'){
      console.log("values undefined");
      //do nothing to data
    }else{
        for(i = 0; i< values.length;i++){
        this.data.push(values[i]);
        this.data.shift();
      } 
    }
    var test = this.data;
    d3.select(".chart").selectAll("div")
    .style("height",function(d,i){
      return ((test[i])/(1278/chart_height)) + "px"})
    .text(function(d,i){return values[i];})
    .style("top",function(d,i){
    return (chart_height-test[i]/(1278/chart_height))/2 + "px";});

  }
}
