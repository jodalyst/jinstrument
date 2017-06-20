function Button(div_id,label,color,bg_color,unique,socket=null){
    var div_id = String(div_id);
    var label = String(title);
    var color = color;
    var bg_color = bg_color;
    var value; //holds toggle value right now
    var unique = String(unique); //unique identifying number
    var socket = socket;
    var setup = function(){
        $("#"+div_id).append("<div class ='toggle_holder' id=\""+div_id+unique+"_holder\"></div>");
        $("#"+div_id+unique+"_holder").append("<button class=\"ui-button\" id=\""+ div_id+unique+"button" +"\" style=\"background-color:" + bg_color+";color: " + color +"\">"+label+"</button>");
        $("#"+div_id+unique+"_holder").trigger("create");
    }
    setup();
    if (socket != null){
        $('#'+div_id+unique+"toggle").on('push',function(){
            socket.emit('reporting', {'unique':unique, 'data':"Push"});
        });
        $('#'+div_id+unique+"toggle").off('push',function(){
            socket.emit('reporting', {'unique':unique, 'data':"Unpush"});
        });
    };
};
