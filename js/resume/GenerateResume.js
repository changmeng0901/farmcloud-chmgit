$(function(){
	
	// 下拉框插件
	$('.selectpicker').selectpicker();  
	
	$('#select_crop').selectpicker({
		multiple: false,
		//header: "选择一项",
		noneSelectedText: "请选择",
		selectedList: 1
	});
	
	//点击下一步时，下一步内容显示，本内容隐藏
	$('#next_step').click(function(){
		$('.generate_resume2').show();	
		$('.generate_resume1').hide();	
	});
	
});