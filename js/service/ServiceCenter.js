$(function(){

	
   	
	
	//屏幕小于1280时，添加小屏样式
	getResize();
		
	//服务中心页面--增值服务焦点图切换
	getSlider();
	
	 // 服务中心页面--进度条鼠标滑过提示位置
    $('.progress_item').each(function(index, elem) {
    	$( elem).find('.p_tootip').css( 'left' , $( elem ).find('.progress-bar').width() )
		$( elem).find('.progress').css( 'width' , $( elem ).find('.p_progress').width() )
		 
    });	

    $(window).resize(function(){
		
		// 服务中心页面--进度条鼠标滑过提示位置
		$('.progress_item').each(function(index, elem) {
			$( elem).find('.p_tootip').css( 'left' , $( elem ).find('.progress-bar').width() )
			$( elem).find('.progress').css( 'width' , $( elem ).find('.p_progress').width() )
			 
		});	
		
		//屏幕小于1280时，添加小屏样式
		getResize();
		
		//服务中心页面--增值服务焦点图切换
		getSlider();
		
		//窗口发生变化时，让焦点图恢复原始状态
		$('.slider_list').css({ 'left' :  0 });
		
	});
	
});

function getResize(){//屏幕小于1280时，添加小屏样式
	if( $(window).width() < 1280 ){
		$('.serviceCenter_body').addClass('small_body');	
	}else{
		$('.serviceCenter_body').removeClass('small_body');		
	}
}

function getSlider(){//服务中心页面--增值服务焦点图切换
	var num = 0;
	var itemW = $('.web_slider_wap .sl_item').width()*3;
	var len = $('.web_slider_wap .sl_item').length;
	
	
	$('.web_slider_wap .sl_item').each(function(index, elem) {
		//如果索引值是第二个的倍数，则去掉竖线
        if( $(elem).index()%3 == 2 ){
			$(elem).find('.pos_line').hide();	
		}
    });
	$('.slider_list').css( 'width' , $('.web_slider_wap .sl_item').width()*len )
	//上一个
	$('.web_slider_wap .btn_prev') .click(function(){
		if( num <=0 ){
			num =0;	
		}else{
			num--;	
		}
		$('.slider_list').css( 'left' , -(itemW*num) );
	});	
	//下一个
	$('.web_slider_wap .btn_next') .click(function(){
		if( num >= Math.floor(len/3)-1 ){
			num = Math.floor(len/3-1);	
		}else{
			num++;
		}
		$('.slider_list').css( 'left' , -(itemW*num) );
	});	
}