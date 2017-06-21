function Toggle(div_id,title,names,unique,socket=null){
    var div_id = String(div_id);
    var title = String(title);
    var names = names; //should be 2-long array of values for when switch is low or high
    var value; //holds toggle value right now
    var unique = String(unique); //unique identifying number
    var socket = socket;
    $("#"+div_id).append("<div class ='toggle_holder' id=\""+div_id+unique+"_holder\"></div>");
    $("#"+div_id+unique+"_holder").append("<label for =\"" + div_id+unique+"toggler"+"\">"+title+": </label>");
    $("#"+div_id+unique+"_holder").append("<select name=\""+ div_id+unique+"toggler" +"\" id=\""+div_id+unique+"toggle"+"\" data-role=\"slider\"><option value=\""+names[0]+"\">"+names[0]+"</option><option value=\""+names[1]+"\">"+names[1]+" </option></select>");
    if (socket != null){
        socket.on("update_"+unique,function(va){$('#'+div_id+unique+"toggle").val(va).slider('refresh');});
        $('#'+div_id+unique+"toggle").on('change',function(){
            socket.emit('reporting', {'unique':unique, 'data':$(this).val()});
        });
    };
};
