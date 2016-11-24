$(function(){
	
	//(1)浏览器缩小时，显示小屏样式
	if( $('body').width() <= 1280){
		$('body').addClass('small_body');		
	}else{
		$('body').removeClass('small_body');		
	}
	
	//(2) 下拉框插件
	$('.selectpicker').selectpicker();  
	
	//(3)文本域获取焦点失去焦点变化
	$('input[type=text]').focus(function(){  
		var txt_value = $(this).val();
		if( txt_value == this.defaultValue ){
			$(this).val("");
			$(this).css("color","#525252");	
		}	
	});	
	$('input[type=text]').blur(function(){
		var txt_value = $(this).val();
		if( txt_value == "" ){
			$(this).val(this.defaultValue);	
			$(this).css("color","#7a7a7a");
		}	
	});	
	
	
	//(4)增值服务--绿色履历页面--使用场景TAB切换控制
	$('.tab_header li').each(function(index, elem) {
        $(elem).click(function(){
			$(this).addClass('li_cur').siblings().removeClass('li_cur');
			$('.tab_content .tab_item').eq(index).show().siblings().hide();
		});
    });
	
	//(5)底部快速导航控制显示隐藏效果
	var fixedTop = $(".quick_register_wapper").offset().top;
	$(".quick_register_wapper").stop().css({
		'position':'fixed',
		'bottom':0
	});
	$('.howtobuy_wapper').css({
		'margin-top':$(".quick_register_wapper").outerHeight()
	})
	function fixedNav(){
		var oScrollTop = $(document).scrollTop();
		var fixedBlock = $(".howtobuy_wapper").offset().top-$(".quick_register_wapper").outerHeight()-$('.c_footer_wapper').outerHeight()-$(".howtobuy_wapper").outerHeight();
		//var fixedTop = $(".quick_register_wapper").offset().top;
		//var fixedBlock = $(".howtobuy_wapper").offset().top-$(".quick_register_wapper").outerHeight()-$('.c_footer_wapper').outerHeight()-$(".howtobuy_wapper").outerHeight();
		if(oScrollTop>fixedBlock){
			//alert(1)
			$(".quick_register_wapper").stop().css({
				'position':'relative',
				//'top':'auto'
				'bottom':'auto'
			});
			$('.howtobuy_wapper').css({'margin-top':0})
		}else{
			$(".quick_register_wapper").stop().animate({
				//top: fixedTop+$(document).scrollTop()
				'bottom':0
			},500);
			$(".quick_register_wapper").css({
				'position':'fixed'
			});
			$('.howtobuy_wapper').css({
				'margin-top':$(".quick_register_wapper").outerHeight()
			})
		}	
	}
	$(window).scroll(function() {
		fixedNav()
	}); 
	$("body").scroll(function() {
		fixedNav()
	}); 
		
	
	
	$(window).resize(function(){
		//(1)浏览器缩小时，显示小屏样式
		if( $('body').width() <= 1280){
			$('body').addClass('small_body');		
		}else{
			$('body').removeClass('small_body');		
		}
		
		//(5)底部快速导航控制显示隐藏效果
		var fixedTop = $(".quick_register_wapper").offset().top;
		$(".quick_register_wapper").stop().css({
			'position':'fixed',
			'bottom':0
		});
		$('.howtobuy_wapper').css({
			'margin-top':$(".quick_register_wapper").outerHeight()
		})
	});
	
	
});

