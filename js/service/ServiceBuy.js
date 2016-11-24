$(function(){
	
	//增值服务购买页面--有效期选择
	$('.expiry_date li').each(function(index, elem) {
        $( elem ).click(function(){
			$(this).addClass('e_cur').siblings().removeClass('e_cur');		
		});
    });
	
	//增值服务购买页面--购买协议的复选框
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	
	
	//屏幕小于1280时，添加小屏样式
	getResize();	
	
	//增值服务购买页面--焦点图事件
	getSlider();


    $(window).resize(function(){
		
		//屏幕小于1280时，添加小屏样式
		getResize();	
		
		//增值服务购买页面--焦点图事件
		getSlider();
		
		//窗口发生变化时，让焦点图恢复原始状态
		$('.slider_hd_list').css({ 'left' :  0 });
		$('.slider_bd_list li').eq(0).addClass('bd_cur').siblings().removeClass('bd_cur');	
		
	});
	
});

function getResize(){
	
	if( $(window).width() < 1280 ){
		$('.serviceBuy_body').addClass('small_body');	
	}else{
		$('.serviceBuy_body').removeClass('small_body');		
	}
	
	
}

function getSlider(){
	
	var num = 0;	
	
	var hd_width = $('.slider_hd_list li').width();
	var item_length = $('.slider_hd_list li').length;
	$('.slider_hd_list').css({
		'width'  : ( hd_width*item_length ) 	
	});
	
	//左侧按钮点击切换
	$('.slider_left').click(function(){
		num--;
		if( num <= 0 ){
			num = 0;
			$(this).removeClass('s_cur');
		}else{
			$(this).addClass('s_cur');
		}	
		$('.slider_right').removeClass('s_cur');
		$('.slider_hd_list').css({ 'left' :  -(hd_width *num) });
		$('.slider_bd_list li').eq(num).addClass('bd_cur').siblings().removeClass('bd_cur');	
	});	
	
	//右侧按钮点击切换
	$('.slider_right').click(function(){
		num++;
		if( num >= item_length-1 ){
			num = item_length-1;
			$(this).removeClass('s_cur');
		}else{
			$(this).addClass('s_cur');
		}
		$('.slider_left').removeClass('s_cur');	
		$('.slider_hd_list').css({ 'left' :  -(hd_width *num) });
		$('.slider_bd_list li').eq(num).addClass('bd_cur').siblings().removeClass('bd_cur');	
	});	
	
	//点击下方小图进行切换
	$('.slider_bd_list li').each(function(index, elem) {
        $(elem).click(function(){
			num = $(this).index();
			//如果小方块是第一或者是最后一个点击，则左右按钮都为默认状态
			if( num == 0 || num == item_length-1 ){
				$('.slider_left').removeClass('s_cur');
				$('.slider_right').removeClass('s_cur');	
			}
			//小方块点击的时候计算left值，和给自己添加或者移除选中效果
			$('.slider_hd_list').css({ 'left' :  -(hd_width * num ) });
			$(this).addClass('bd_cur').siblings().removeClass('bd_cur');	
		});
    });
	
}