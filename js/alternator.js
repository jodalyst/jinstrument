

$(document).on("change", ".alternator",function(){
    var parent; 
    var tempid = $(this).parent().attr("id");
    var value = $(this).val();
    if (value = 1.0){
        $("#"+tempid+"_alternator").val

$(window).load(function(event){

    $('alternator').on('change',function(){
        var value = $(this).val();
        if (value == 1.0){
             
        }  
    }


}


function Alternator(command_id,period,resolution){
    this.control_id = control_id;
    this.command_id = command_id;
    this.period = period;
    this.resolution = resolution;
    this.state = false; //false = not alternating, true = alternating
    this.current_value = 0;
    this.toggle(){
        $("#"+this.command_id
    
}
