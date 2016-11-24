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
	
	//(6)时间插件
	$(".form_datetime").datetimepicker({
		format: "yyyy mm dd",  
		autoclose: true,
		weekStart: 1,
		language:  'zh-CN',
		startView: 3,
		minView: 2,
		maxView: 2,		
		pickerPosition: "bottom-left"
	});
	
	//(3)库存模板下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = $(window).width();
	var oWindowH = $(window).height();
	if( oWindowW < 1280 ){
		$('.inbentory_level').hide();
		$('.inbentory_content').addClass('hide_inben');
		menuOnOff = false;
		
	}else{
		$('.inbentory_level').show();
		$('.inbentory_content').removeClass('hide_inben');
		menuOnOff = true;	
	}
	$('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			$('.inbentory_level').hide();
			$('.inbentory_content').addClass('hide_inben');
			menuOnOff = false;	
		}else{
			$('.inbentory_level').show();
			$('.inbentory_content').removeClass('hide_inben');
			menuOnOff = true;		
		}	
	});
	
	//(4)计算主体高度及折叠按钮居中
	$('.inbentory_level').css({ 
		'min-height' : oWindowH - 60,
		    'height' : $(document).height() - 60 
	});
	$('.inbentory_file_main').css({ 
		'min-height' : oWindowH - 60,
		    'height' : $(document).height() - 60 
	});
	if( oWindowH < 400 ){
		$('.collapse_btn').css( 'top' , 220 );
	}else{
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
	}
	
	
	//(5)左侧二级导航的选择状态控制
	//导航不带二级的
	$('.inben_first1').click(function(){
		$(this).addClass('in_cur').siblings('.inben_first').removeClass('in_cur');	
		$('.inben_second .sed_item').removeClass('sed_cur');
	});
	//导航带二级的
	$('.inben_first2').click(function(){
		if( $(this).hasClass('in_cur') ){
			//如果箭头是向上的，即下面是收缩的
			$(this).removeClass('in_cur');	
			$(this).next('.inben_second').slideDown(300);	
		}else{
			//如果箭头是向下的，即下面是展开的的
			$(this).addClass('in_cur');	
			$(this).next('.inben_second').slideUp(300);
		}
	});
	$('.inben_second .sed_item').click(function(){
		$('.inben_first1').removeClass('in_cur');
		$(this).addClass('sed_cur').siblings().removeClass('sed_cur');
		$(this).parents('.inben_second').siblings().find('.sed_item').removeClass('sed_cur');
	});
	
	
	
	$(window).resize(function(e) {
		//(3)库存模板下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = $(window).width();
		var oWindowH = $(window).height();
		if( oWindowW < 1280 ){
			menuOnOff = false;
			$('.inbentory_level').hide();
			$('.inbentory_content').addClass('hide_inben');
			
		}else{
			menuOnOff = true;
			$('.inbentory_level').show();
			$('.inbentory_content').removeClass('hide_inben');	
		}		
		$('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				$('.inbentory_level').hide();
				$('.inbentory_content').addClass('hide_inben');
				menuOnOff = false;	
			}else{
				$('.inbentory_level').show();
				$('.inbentory_content').removeClass('hide_inben');
				menuOnOff = true;		
			}	
		});
		
		//(4)计算主体高度及折叠按钮居中
		$('.inbentory_level').css({ 
			'min-height' : oWindowH - 60,
				'height' : $(document).height() - 60 
		});
		$('.inbentory_file_main').css({ 
			'min-height' : oWindowH - 60,
				'height' : $(document).height() - 60 
		});
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
		
    });
	
	$(window).scroll(function(){
		var oWindowH = $(window).height();
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
	});
	
	
	
});
