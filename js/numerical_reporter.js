

function Numerical_Reporter(div_id,title,range,color,bg_color){
    this.div_id = div_id;
    this.color = color;
    this.bg_color = bg_color;
    this.title = title;
    this.range = range; //shape is : [low,high]..saturate otherwise
    this.value = 0.0;
    this.unique = Math.floor(Math.random() * (100000));
    $("#"+this.div_id).append("<div class ='number_holder' id=\""+this.div_id+this.unique+"_holder\"></div>");
    $("#"+this.div_id+this.unique+"_holder").append("<div class ='number_title' id=\""+this.div_id+"_title\">"+title+"</div>");
    $("#"+this.div_id+this.unique+"_holder").append("<div class ='reported_number' style=\"color:"+ this.color+";background-color:"+this.bg_color+";\" id=\""+this.div_id+"_number\">"+this.value+"</div>");
    this.step = function(value){
        if (value> range[1]){
            value = range[1];
        }else if (value <range[0]){
            value= range[0];
        }
        console.log("Updating with " + String(value));
        $("#"+this.div_id+"_number").html(value);
    };
};
