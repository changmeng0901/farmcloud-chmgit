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
	
	// (2)复选框状态
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	$('.comment_table input[aa]').on('ifClicked', function(){
		if (this.checked) {
			$(this).attr("aa","unchecked");
		} else {
			$(this).attr("aa","checked");
		}
	});
	
	//(3)联系人选择
	//var selectPickList = $("#nonnumeric").pickList();
	selectPickList = $("#nonnumeric").pickList({  
		 sourceListLabel: "全部",
		targetListLabel : "已选择", 
	}); 
	

	
});


//---------------------------------------------------------------------

