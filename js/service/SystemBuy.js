$(function(){

	
    // 系统升级购买页面--进度条鼠标滑过提示位置
    $('.progress_item').each(function(index, elem) {
    	$( elem).find('.p_tootip').css( 'left' , $( elem ).find('.progress-bar').width() )
    });	
	
	//系统升级购买页面--购买协议的复选框
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	
	//系统升级购买页面--版本及版本的年限购买选择
	$('.year_eblock span').each(function(index, elem) {
        $( elem ).click(function(){
			$(this).addClass('s_cur').siblings().removeClass('s_cur');	
			$(this).parents('.sys_items').siblings().find('.year_eblock span').removeClass('s_cur');	
		});
    });
	
	//屏幕小于1280时，添加小屏样式
	getResize();		

    $(window).resize(function(){
		getResize()	
	});
	
});

function getResize(){
	if( $(window).width() < 1280 ){
		$('.systemBuy_body').addClass('small_body');	
	}else{
		$('.systemBuy_body').removeClass('small_body');		
	}
}