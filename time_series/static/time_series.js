
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

function Time_Series(div_id,width,height,x_range,y_range,num_traces,colors, unique, socket=null){
    var div_id = div_id;
    var unique = unique;
    var socket = socket;
    var colors = colors;
    this.y_range_orig = y_range.slice(0); //used for reset mechanisms.
    this.vals_orig = x_range;
    this.y_range = y_range;
    var num_traces = num_traces;
    this.vals = x_range;
    var xchange = false;
    var margin = {top: 20, right: 30, bottom: 30, left: 40};
    var data = [];
    for (var i = 0; i<num_traces; i++){
        data.push(d3.range(this.vals).map(function() { return 0; }));
    }
    var height = height - margin.top - margin.bottom;
    var width = width - margin.right - margin.left;
    var overall = $("#"+div_id).append("<div id=\""+div_id+unique+"_overall\">");
    var top_row = $("#"+div_id+unique+"_overall").append("<div class=\"chart\" id=\""+div_id+unique+"top\">");
    var bottom_row = $("#"+div_id+unique+"_overall").append("<div class=\"chart\" id=\""+div_id+unique+"bot\">");
    var line;
    this.setup = function(){
        if (xchange){
            xchange = false;
            if (this.vals> data[0].length){//increasing amount
                for (var i = 0; i<num_traces;i++){
                    var tempdata = d3.range(this.vals-data[i].length).map(function() { return 0; });
                    data[i] = tempdata.concat(data[i]);
                }
            }else if (this.vals< data[0].length){
                var to_remove = data[0].length-this.vals;
                for(var i =0; i<num_traces; i++){
                    data[i] = data[i].slice(-this.vals);
                }
            }
        }
        //data = d3.range(vals).map(function() { return 0; });
        var chart = d3.select("#"+div_id+unique+"top").append("svg")
        .attr("id","svg_for_"+div_id+unique).attr("width",width).attr("height",height).attr('style',"display:inline-block;").attr("class", "gsc");
        var y = d3.scale.linear().domain([y_range[0],y_range[1]]).range([height,0]);
        var x = d3.scale.linear().domain([0,this.vals-1]).range([0,width]);
        var x_axis = d3.svg.axis().scale(x).orient("bottom").ticks(11);
        var y_axis = d3.svg.axis().scale(y).orient("left").ticks(11);
        var x_grid = d3.svg.axis().scale(x).orient("bottom").ticks(20).tickSize(-height, 0, 0).tickFormat("");
        var y_grid = d3.svg.axis().scale(y).orient("left").ticks(11).tickSize(-width, 0, 0).tickFormat("");
        chart.append("g").attr("transform","translate("+margin.left +","+ margin.top + ")");
        chart.append("g").attr("class", "x axis")
        .attr("transform","translate("+margin.left+","+(height+margin.top)+")").call(x_axis).selectAll("text")
        .attr("y", -5).attr("x", 20).attr("transform", "rotate(90)");
        chart.append("g").attr("class", "y axis").attr("transform","translate("+margin.left+","+margin.top+")").call(y_axis);
        chart.append("g").attr("class", "grid")
        .attr("transform","translate("+margin.left+","+(height+margin.top)+")").call(x_grid);
        chart.append("g").attr("class", "grid").attr("transform","translate("+margin.left+","+margin.top+")").call(y_grid);
        line = d3.svg.line().x(function(d, i) { return x(i)+margin.left; }.bind(this)).
        y(function(d, i) { return y(d)+margin.top; }.bind(this));
        traces = [];
        for (var i=0; i<num_traces; i++){
            traces.push(chart.append("g").append("path").datum(data[i]).attr("class","line").attr("d",line).attr("stroke",colors[i]));
        }
        //this.trace = this.chart.append("g").append("path").datum(this.data).attr("class","line") .attr("d",this.line).attr("clip-path", "url(#"+this.clip_id+")");
    };
    this.setup();
    $("#"+div_id+unique+"top").prepend("<div class ='v_button_container' id = \""+div_id+unique+"BC2\" >");
    $("#"+div_id+unique+"BC2").append("<button class='scaler' id=\""+div_id+unique+"VP\">Z+</button>");
    $("#"+div_id+unique+"BC2").append("<button class='scaler' id=\""+div_id+unique+"VRS\">RS</button>");
    $("#"+div_id+unique+"BC2").append("<button class='scaler' id=\""+div_id+unique+"VM\">Z-</button>");
    $("#"+div_id+unique+"top").prepend("<div class ='v_button_container' id = \""+div_id+unique+"BC1\" >");
    $("#"+div_id+unique+"BC1").append("<button class='scaler' id=\""+div_id+unique+"OI\">O+</button>");
    $("#"+div_id+unique+"BC1").append("<button class='scaler' id=\""+div_id+unique+"OD\">O-</button>");
    $("#"+div_id+unique+"bot").append("<div class ='h_button_container' id = \""+div_id+unique+"BC4\" >");
    $("#"+div_id+unique+"BC4").append("<button class='scaler' id=\""+div_id+unique+"HM\">Z-</button>");
    $("#"+div_id+unique+"BC4").append("<button class='scaler' id=\""+div_id+unique+"HRS\">RS</button>");
    $("#"+div_id+unique+"BC4").append("<button class='scaler' id=\""+div_id+unique+"HP\">Z+</button>");
    this.step = function(values){
            //this.trace.attr("d",this.line).attr("transform",null).transition().duration(0).ease("linear").attr("transform","translate("+this.x(-1)+",0)");
            for (var i=0; i<values.length; i++){
                traces[i].attr("d",line).attr("transform",null);
                data[i].push(values[i]);
                data[i].shift();
            }
    };
    var steppo = this.step;
    this.update = function(){
        d3.select("#svg_for_"+div_id+unique).remove();
        setup();
    };
    if (socket != null){
        socket.on("update_"+unique,function(values){steppo(values);});
    }
    var parent = this;
    $("#"+div_id).on("click",function(){
        console.log("HIHIHI");
    });
    $("#"+div_id).on("click",".scaler",function(){
        console.log("click happened");
        var tempid = $(this).parent().parent().attr("id");
        var parid = tempid.substr(0,tempid.length-3);
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
};

