// JavaScript Document

$(function(){
	
	// (1)获取焦点和失去焦点状态
    $('input[type=text]').focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $(this).val("");    
        };  
    });
    $('input[type=text]').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val(this.defaultValue); 
        };  
    }); 
	$('textarea').focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $('.textarea400 .text_textarea').hide();  
        };  
    });
    $('textarea').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
           $('.textarea400 .text_textarea').show();
        };  
    }); 
	
	//(2)下拉菜单
    $('.selectpicker').selectpicker(); 
	

	
});


//---------------------------------------------------------------------

