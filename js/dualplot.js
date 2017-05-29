$(document).on("click", ".scaler",function(){
    var parent = plot;
    var tempid = $(this).parent().parent().attr("id");
    var parid = tempid.substr(0,tempid.length-3);
    //var parid = $(this).parent().parent().attr("id").replace("top","")
    switch ($(this).attr("id")){
        case parid+"VM":
            var parent_range = parent.y_range[1] - parent.y_range[0];
            var parent_mid = (parent.y_range[1] - parent.y_range[0])/2 + parent.y_range[0];
            parent.y_range[1] = (parent.y_range[1] - parent_mid)*2+parent_mid;
            parent.y_range[0] = parent_mid-(parent_mid - parent.y_range[0])*2;
            break;
        case parid+"VP":
            var parent_range = parent.y_range[1] - parent.y_range[0];
            var parent_mid = (parent.y_range[1] - parent.y_range[0])/2 + parent.y_range[0];
            parent.y_range[1] = (parent.y_range[1] - parent_mid)*0.5+parent_mid;
            parent.y_range[0] = parent_mid-(parent_mid - parent.y_range[0])*0.5;
            break;
        case parid+"VRS":
            parent.y_range =parent.y_range_orig.slice(0);
            break;
        case parid+"HM":
            if (parent.vals >4){
                parent.vals = Math.round(parent.vals/2);
            }
            parent.xchange = true;
            break;
        case parid+"HP":
            parent.vals = parent.vals*2;
            parent.xchange = true;
            break;
        case parid+"HRS":
            parent.vals =parent.vals_orig;
            parent.xchange = true;
            break;
        case parid+"OD":
            var diff = parent.y_range[1] - parent.y_range[0];
            var tp = diff*0.1;
            parent.y_range[1] = parent.y_range[1]+tp;
            parent.y_range[0]=parent.y_range[0]+tp;
            break;
        case parid+"OI":
            var diff = parent.y_range[1] - parent.y_range[0];
            var tp = diff*0.1;
            parent.y_range[1] = parent.y_range[1]-tp;
            parent.y_range[0] = parent.y_range[0]-tp;
            break;
    }
    parent.update();
});


/*not working right now (5/28/2017
function plot_generate(name,min,max,datapoints){
    var newb = document.createElement("div"); //create div
    $(newb).addClass("sbs"); //make it sbs
    var newtitle = document.createElement("div"); //make inside div
    $(newtitle).addClass("plot_title").html(name); //make it title
    var newplot = document.createElement("div"); //make another div
    $(newplot).addClass("chart"); //make it a chart
    $(newplot).prop('id',name); //call it appropriate name
    $(newtitle).appendTo($(newb)); //add into sbs div
    $(newplot).appendTo($(newb)); //add into sbs div
    plots.push({'name':name,'plot':newb,'min':min, 'max':max, 'datapoints':datapoints});  //add entry to array.
}
*/

function LWChart(div_id,width,height,x_range,y_range,num_traces,colors){
    this.div_id = div_id;
    this.colors = colors;
    this.y_range_orig = y_range.slice(0); //used for reset mechanisms.
    this.vals_orig = x_range;
    this.y_range = y_range;
    this.num_traces = num_traces;
    this.vals = x_range;
    this.xchange = false;
    this.margin = {top: 20, right: 30, bottom: 30, left: 40};
    this.data = [];
    for (var i = 0; i<this.num_traces; i++){
        this.data.push(d3.range(this.vals).map(function() { return 0; }));
    }
    this.height = height - this.margin.top - this.margin.bottom;
    this.width = width - this.margin.right - this.margin.left;
    this.top_row = $("#"+this.div_id).append("<div class=\"chart\" id=\""+this.div_id+"top\">");
    this.bottom_row = $("#"+this.div_id).append("<div class=\"chart\" id=\""+this.div_id+"bot\">");
    this.setup = function(){
        if (this.xchange){
            this.xchange = false;
            if (this.vals> this.data[0].length){//increasing amount
                for (var i = 0; i<this.num_traces;i++){
                    var tempdata = d3.range(this.vals-this.data[i].length).map(function() { return 0; });
                    this.data[i] = tempdata.concat(this.data[i]);
                }
            }else if (this.vals< this.data[0].length){
                var to_remove = this.data[0].length-this.vals;
                for(var i =0; i<this.num_traces; i++){
                    this.data[i] = this.data[i].slice(-this.vals);
                }
            }
        }
        //this.data = d3.range(this.vals).map(function() { return 0; });
        this.chart = d3.select("#"+this.div_id+"top").append("svg")
        .attr("id","svg_for_"+this.div_id).attr("width",width).attr("height",height).attr('style',"display:inline-block;").attr("class", "gsc");
        this.y = d3.scale.linear().domain([this.y_range[0],this.y_range[1]]).range([this.height,0]);
        this.x = d3.scale.linear().domain([0,this.vals-1]).range([0,this.width]);
        this.x_axis = d3.svg.axis().scale(this.x).orient("bottom").ticks(11);
        this.y_axis = d3.svg.axis().scale(this.y).orient("left").ticks(11);
        this.x_grid = d3.svg.axis().scale(this.x).orient("bottom").ticks(20).tickSize(-this.height, 0, 0).tickFormat("");
        this.y_grid = d3.svg.axis().scale(this.y).orient("left").ticks(11).tickSize(-this.width, 0, 0).tickFormat("");
        this.chart.append("g").attr("transform","translate("+this.margin.left +","+ this.margin.top + ")");
        this.chart.append("g").attr("class", "x axis")
        .attr("transform","translate("+this.margin.left+","+(this.height+this.margin.top)+")").call(this.x_axis).selectAll("text")
        .attr("y", -5).attr("x", 20).attr("transform", "rotate(90)");
        this.chart.append("g").attr("class", "y axis").attr("transform","translate("+this.margin.left+","+this.margin.top+")").call(this.y_axis);
        this.chart.append("g").attr("class", "grid")
        .attr("transform","translate("+this.margin.left+","+(this.height+this.margin.top)+")").call(this.x_grid);
        this.chart.append("g").attr("class", "grid").attr("transform","translate("+this.margin.left+","+this.margin.top+")").call(this.y_grid);
        this.line = d3.svg.line().x(function(d, i) { return this.x(i)+this.margin.left; }.bind(this)).
        y(function(d, i) { return this.y(d)+this.margin.top; }.bind(this));
        this.traces = [];
        for (var i=0; i<this.num_traces; i++){
            this.traces.push(this.chart.append("g").append("path").datum(this.data[i]).attr("class","line").attr("d",this.line).attr("stroke",this.colors[i]));
        }
        //this.trace = this.chart.append("g").append("path").datum(this.data).attr("class","line") .attr("d",this.line).attr("clip-path", "url(#"+this.clip_id+")");
    };
    this.setup();
    $("#"+this.div_id+"top").prepend("<div class ='v_button_container' id = \""+this.div_id+"BC2\" >");
    $("#"+this.div_id+"BC2").append("<button class='scaler' id=\""+this.div_id+"VP\">Z+</button>");
    $("#"+this.div_id+"BC2").append("<button class='scaler' id=\""+this.div_id+"VRS\">RS</button>");
    $("#"+this.div_id+"BC2").append("<button class='scaler' id=\""+this.div_id+"VM\">Z-</button>");
    $("#"+this.div_id+"top").prepend("<div class ='v_button_container' id = \""+this.div_id+"BC1\" >");
    $("#"+this.div_id+"BC1").append("<button class='scaler' id=\""+this.div_id+"OI\">O+</button>");
    $("#"+this.div_id+"BC1").append("<button class='scaler' id=\""+this.div_id+"OD\">O-</button>");
    $("#"+this.div_id+"bot").append("<div class ='h_button_container' id = \""+this.div_id+"BC4\" >");
    $("#"+this.div_id+"BC4").append("<button class='scaler' id=\""+this.div_id+"HM\">Z-</button>");
    $("#"+this.div_id+"BC4").append("<button class='scaler' id=\""+this.div_id+"HRS\">RS</button>");
    $("#"+this.div_id+"BC4").append("<button class='scaler' id=\""+this.div_id+"HP\">Z+</button>");
    this.step = function(values){
            //this.trace.attr("d",this.line).attr("transform",null).transition().duration(0).ease("linear").attr("transform","translate("+this.x(-1)+",0)");
            for (var i=0; i<values.length; i++){
                this.traces[i].attr("d",this.line).attr("transform",null);
                this.data[i].push(values[i]);
                this.data[i].shift();
            }
    };
    this.update = function(){
        d3.select("#svg_for_"+this.div_id).remove();
        this.setup();
    };
};

