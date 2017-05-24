$(document).on("click", ".scaler",function(){
    //var parent = $($(this).parent().parent().attr("id"));
    //var parent = plot_handlers[$(this).parent().parent().attr("id")];
    var parent = plot;
    //console.log($(this).attr("id"));
    var parid = $(this).parent().parent().attr("id")
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
            var parent_range = parent.y_range[1] - parent.y_range[0];
            var parent_mid = (parent.y_range[1] - parent.y_range[0])/2 + parent.y_range[0];
            parent.y_range[1] = (parent.y_range[1] - parent_mid)*2+parent_mid;
            parent.y_range[0] = parent_mid-(parent_mid - parent.y_range[0])*2;
            break;
        case parid+"HP":
            var parent_range = parent.y_range[1] - parent.y_range[0];
            var parent_mid = (parent.y_range[1] - parent.y_range[0])/2 + parent.y_range[0];
            parent.y_range[1] = (parent.y_range[1] - parent_mid)*0.5+parent_mid;
            parent.y_range[0] = parent_mid-(parent_mid - parent.y_range[0])*0.5;
            break;
        case parid+"HRS":
            parent.y_range =parent.y_range_orig.slice(0);
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

function LWChart(div_id,color,y_range,height,width,vals){
    this.div_id = div_id;
    this.color = color;
    this.y_range_orig = y_range.slice(0); //used for reset mechanisms.
    this.y_range = y_range;
    this.vals = vals;
    this.margin = {top: 20, right: 30, bottom: 30, left: 40};
    this.data = d3.range(this.vals).map(function() { return 0; });
    this.height = height - this.margin.top - this.margin.bottom;
    this.width = width - this.margin.right - this.margin.left;
    this.setup = function(){
        this.top_row = $("#"+this.div_id).append("<div class=\"chart\" id=\""+this.div_id+"top\">");
        this.bottom_row = $("#"+this.div_id).append("<div class=\"chart\" id=\""+this.div_id+"bottom\">");
        this.chart = d3.select("#"+this.div_id+"top").append("svg")
        .attr("id","svg_for_"+this.div_id).attr("width",width).attr("height",height).attr('style',"display:inline-block;").attr("class", "gsc");
        this.y = d3.scale.linear().domain([this.y_range[0],this.y_range[1]]).range([this.height,0]);
        this.x = d3.scale.linear().domain([0,this.vals-1]).range([0,this.width]);
        this.x_axis = d3.svg.axis().scale(this.x).orient("bottom").ticks(20);
        this.y_axis = d3.svg.axis().scale(this.y).orient("left").ticks(11);
        this.x_grid = d3.svg.axis().scale(this.x).orient("bottom").ticks(20).tickSize(-this.height, 0, 0).tickFormat("");
        this.y_grid = d3.svg.axis().scale(this.y).orient("left").ticks(11).tickSize(-this.width, 0, 0).tickFormat("");
        this.chart.append("g").attr("transform","translate("+this.margin.left +","+ this.margin.top + ")");
        this.chart.append("g").attr("class", "x axis")
        .attr("transform","translate("+this.margin.left+","+(this.height+this.margin.top)+")").call(this.x_axis);
        this.chart.append("g").attr("class", "y axis").attr("transform","translate("+this.margin.left+","+this.margin.top+")").call(this.y_axis);
        this.chart.append("g").attr("class", "grid")
        .attr("transform","translate("+this.margin.left+","+(this.height+this.margin.top)+")").call(this.x_grid);
        this.chart.append("g").attr("class", "grid").attr("transform","translate("+this.margin.left+","+this.margin.top+")").call(this.y_grid);
        this.line = d3.svg.line().x(function(d, i) { return this.x(i)+this.margin.left; }.bind(this)).
        y(function(d, i) { return this.y(d)+this.margin.top; }.bind(this));
        this.clip_id = "clipper_"+this.div_id;
        this.clipper = this.chart.append("clipPath").attr("id", this.clip_id)
        .append("rect").attr("x",this.margin.left).attr("y",this.margin.top)
        .attr("width",this.width).attr("height",this.height);
        this.trace = this.chart.append("g").append("path").datum(this.data).attr("class","line")
        .attr("d",this.line).attr("clip-path", "url(#"+this.clip_id+")");
        };
    this.setup();
    //console.log(this.div_id);
    $("#"+this.div_id+"top").prepend("<div class ='v_button_container' id = \""+this.div_id+"BC2\" >");
    $("#"+this.div_id+"BC2").append("<button class='scaler' id=\""+this.div_id+"VP\">Z+</button><br>");
    $("#"+this.div_id+"BC2").append("<button class='scaler' id=\""+this.div_id+"VRS\">RS</button><br>");
    $("#"+this.div_id+"BC2").append("<button class='scaler' id=\""+this.div_id+"VM\">Z-</button><br>");
    $("#"+this.div_id+"top").prepend("<div class ='v_button_container' id = \""+this.div_id+"BC1\" >");
    $("#"+this.div_id+"BC1").append("<button class='scaler' id=\""+this.div_id+"OI\">O+</button><br>");
    $("#"+this.div_id+"BC1").append("<button class='scaler' id=\""+this.div_id+"OD\">O-</button><br>");
    $("#"+this.div_id+"top").append("<div class ='v_button_container' id = \""+this.div_id+"BC3\" >");

    $("#"+this.div_id+"BC3").append("<button class='scaler' id=\""+this.div_id+"HM\">Z-</button><br>");
    $("#"+this.div_id+"BC3").append("<button class='scaler' id=\""+this.div_id+"HRS\">RS</button><br>");
    $("#"+this.div_id+"BC3").append("<button class='scaler' id=\""+this.div_id+"HP\">Z+</button><br>");

    $("#"+this.div_id+"bottom").append("<div class ='h_button_container' id = \""+this.div_id+"BC4\" >");
    $("#"+this.div_id+"BC4").append("<button class='scaler' id=\""+this.div_id+"HM\">Z-</button><br>");
    $("#"+this.div_id+"BC4").append("<button class='scaler' id=\""+this.div_id+"HRS\">RS</button><br>");
    $("#"+this.div_id+"BC4").append("<button class='scaler' id=\""+this.div_id+"HP\">Z+</button><br>");
    this.step = function(value){
            this.data.push(value);
            this.trace.attr("d",this.line).attr("transform",null).transition().duration(2).ease("linear").attr("transform","translate("+this.x(-1)+",0)");
            this.data.shift();
    };
    this.update = function(){
        d3.select("#svg_for_"+this.div_id).remove();
        this.setup();
    };
};

