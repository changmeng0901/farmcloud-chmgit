// JavaScript Document

$(function(){
	
	// (1)下拉框
	$('.selectpicker').selectpicker();	

	//单选按钮、复选框插件
	$('input[class=iCheck]').iCheck({ // 复选框
		checkboxClass: 'icheckbox_minimal-blue',
	});
	$('input[class=iRadio]').iCheck({ // 单选按钮
		radioClass: 'iradio_minimal-blue',
	});
});