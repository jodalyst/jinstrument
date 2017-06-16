

function Numerical_Reporter(div_id,title,range,color,bg_color,unique,socket=null){
    this.div_id = div_id;
    this.color = color;
    this.bg_color = bg_color;
    this.title = title;
    this.range = range; //shape is : [low,high]..saturate otherwise
    this.value = 0.0;
    this.unique = unique; //unique identifying number
    this.socket = socket;
    $("#"+this.div_id).append("<div class ='number_holder' id=\""+this.div_id+this.unique+"_holder\"></div>");
    $("#"+this.div_id+this.unique+"_holder").append("<div class ='number_title' id=\""+this.div_id+this.unique+"_title\">"+title+"</div>");
    $("#"+this.div_id+this.unique+"_holder").append("<div class ='reported_number' style=\"color:"+ this.color+";background-color:"+this.bg_color+";\" id=\""+this.div_id+this.unique+"_number\">"+this.value+"</div>");
    this.step = function(value){ 
        if (range[1] != null && value> range[1]){
            value = range[1];
        }else if (range[0] != null && value <range[0]){
            value= range[0];
        }
        $("#"+this.div_id+this.unique+"_number").html(value);
    };
    if (this.socket != null){
        this.socket.on("update_"+this.unique,function(val){
            this.step(val);
        });
    }
};
