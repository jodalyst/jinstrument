function Time_Series(div_id,title,width,height,unique, socket=null){
    var div_id = div_id;
    var title = title;
    var unique = unique;
    var socket = socket;
    var width = width;
    var height = height;
    if (socket != null){
        socket.on("update_"+unique,function(values){
        document.getElementbyId(
});
    }
};

