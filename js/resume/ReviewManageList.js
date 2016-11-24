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

    //(2)下拉菜单
    $('.selectpicker').selectpicker();  
	
	// (3)全选功能
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	$('.comment_table input[aa]').on('ifClicked', function(){ //全选
		if (this.checked) {
			$(this).attr("aa","unchecked");
			$(this).parents('tr').siblings().find('input[bb]').iCheck('uncheck');
			$(this).parents('tr').siblings().find('input[bb]').attr("bb","unchecked");
		} else {
			$(this).attr("aa","checked");
			$(this).parents('tr').siblings().find('input[bb]').iCheck('check');
			$(this).parents('tr').siblings().find('input[bb]').attr("bb","checked");
		}
	});
	$('.comment_table input[bb]').on('ifClicked', function(){ //取消全选
		if (this.checked) {
			$(this).attr("bb","unchecked");
			$(this).parents('tr').siblings().find('input[aa]').iCheck('uncheck');
		} else {
			$(this).attr("bb","checked");
			var len = $(this).parents('tr').siblings().find('input[bb=checked]').length;
			if(len == $('.comment_table input[bb]').length-1){
				$(this).parents('tr').siblings().find('input[aa]').iCheck('check');	
			}
		}
	});
	
	//(6)批量删除
	$('#batch_delete').click(function(){
		$('.comment_table input[bb]').each(function(index, elem) {
            if( $(elem).attr('bb') == 'checked' ){
				$(elem).parents('.trItem').remove();	
			}
        });
	});
	

	
});


//---------------------------------------------------------------------

	//(4)履历预览详情页面--控制评论删除
	function deleteComment(obj,trItem){
		if(confirm("删除评论后无法还原，确定删除？")){
			$(obj).parents(trItem).remove();
		}
	}
	//(5)评论管理列表页面--控制每一条履历删除
	function deleteRecord(obj,trItem){
		if(confirm("删除后无法还原，确定删除？")){
			$(obj).parents(trItem).remove();
		}
	}