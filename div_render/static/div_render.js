function Div_Render(div_id,title,width,height,unique, socket=null){
    var div_id = div_id;
    var title = title;
    var unique = unique;
    var socket = socket;
    var width = width;
    var height = height;
    var overall = $("#"+div_id).append("<div id=\""+div_id+unique+"_overall\">");
    var title_div = $("#"+div_id+unique+"_overall").append("<div class=\"plot_title\" id=\""+div_id+unique+"_title\">"+title+"</div>");
    if (socket != null){
        socket.on("update_"+unique,function(value){
        document.getElementById(div_id).innerHTML = value;
        });
    }
};

