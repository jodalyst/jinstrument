function Div_Render(div_id,title,width,height,unique, socket=null){
    var div_id = div_id;
    var title = title;
    var unique = unique;
    var socket = socket;
    var width = width;
    var height = height;
    var title = document.getElementById(div_id).append("<div class=\"plot_title\" id=\""+div_id+unique+"_title\">"+title+"</div>");
    var overall =  document.getElementById(div_id).append("<div id=\""+div_id+unique+"_overall\">");
    if (socket != null){
        socket.on("update_"+unique,function(value){
        document.getElementById(div_id+unique+"_overall").innerHTML = value;
        });
    }
};

