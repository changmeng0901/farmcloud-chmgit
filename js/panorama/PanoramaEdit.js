// JavaScript Document

$(function(){
	

	$(".btn-first").text("置顶");
	$(".btn-up").text("向上");
	$(".btn-down").text("向下");
	$(".btn-last").text("置底");
	// (1)获取焦点和失去焦点状态
    $('input[type=text],textarea').focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $(this).val("");    
        };  
    });
    $('input[type=text],textarea').blur(function(){
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
	
	// (9)tooltip工具提示
	$("[data-toggle='tooltip']").tooltip(); 

	
	//(3)四季田景下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = $(window).width();
	var oWindowH = $(window).height();
	if( oWindowW < 1280 ){
		$('.panorama_level').hide();
		$('.panorama_content').addClass('hide_pano');
		menuOnOff = false;
		
	}else{
		$('.panorama_level').show();
		$('.panorama_content').removeClass('hide_pano');
		menuOnOff = true;	
	}
	$('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			$('.panorama_level').hide();
			$('.panorama_content').addClass('hide_pano');
			menuOnOff = false;	
		}else{
			$('.panorama_level').show();
			$('.panorama_content').removeClass('hide_pano');
			menuOnOff = true;		
		}	
	});
	
	
	
	
	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( $("html").height() > $("body").height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	$('.panorama_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : $(document).height() - 60  -IESpace
	});
	$('.panorama_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	$('.panorama_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : $(document).height() - 60 -IESpace
	});
	$(".panorama_nodata").css({
		"height" : $(".panorama_main").outerHeight()-45-64-20
	})
	if( oWindowH < 400 ){
		$('.collapse_btn').css( 'top' , 220 );
	}else{
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
	}
	oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top")
	
	
	//(5)左侧二级导航的选择状态控制
	$(".pano_second .sed_item").each(function(index, elem) {
        $(elem).click(function(){
			$(this).addClass("sed_cur").siblings().removeClass("sed_cur");	
		});
    });
	

	// (8)模态框--物料列表全选功能
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	$('input[class="iRadio"]').iCheck({
		radioClass: 'iradio_minimal-blue'
	});
	// (8-1)素材库模态框
	$('.material_dialog input[allname]').on('ifClicked', function(){ //从素材库添加全选
		if (this.checked) {
			$(this).attr("allname","unchecked");
			$(this).parents('.modal_body').find('input[itemname]').iCheck('uncheck');
			$(this).parents('.modal_body').find('input[itemname]').attr("itemname","unchecked");
			$(this).parents('.modal_body').find(".m_panopic").removeClass("m_bor");
		} else {
			$(this).attr("allname","checked");
			$(this).parents('.modal_body').find('input[itemname]').iCheck('check');
			$(this).parents('.modal_body').find('input[itemname]').attr("itemname","checked");
			$(this).parents('.modal_body').find(".m_panopic").addClass("m_bor");
		}
	});
	$('.material_dialog input[itemname]').on('ifClicked', function(){ //从素材库添加取消全选
		if (this.checked) {
			$(this).attr("itemname","unchecked");
			$(this).parents('.modal_body').find('input[allname]').iCheck('uncheck');
			$(this).parents(".dl_dt").find(".m_panopic").removeClass("m_bor");
		} else {
			$(this).attr("itemname","checked");
			$(this).parents(".dl_dt").find(".m_panopic").addClass("m_bor");
			var len = $(this).parents('.modal_body').find('input[itemname=checked]').length;
			if(len == $('.material_dialog input[itemname]').length){
				$(this).parents('.modal_body').find('input[allname]').iCheck('check');	
			}
		}
	});
	// (8-2)评论管理模态框
	$('.comment_dialog input[allaa]').on('ifClicked', function(){ //评论管理全选
		if (this.checked) {
			$(this).attr("allaa","unchecked");
			$(this).parents('.modal_body').find('input[itembb]').iCheck('uncheck');
			$(this).parents('.modal_body').find('input[itembb]').attr("itembb","unchecked");
		} else {
			$(this).attr("allaa","checked");
			$(this).parents('.modal_body').find('input[itembb]').iCheck('check');
			$(this).parents('.modal_body').find('input[itembb]').attr("itembb","checked");
		}
	});
	$('.comment_dialog input[itembb]').on('ifClicked', function(){ //评论管理取消全选
		if (this.checked) {
			$(this).attr("itembb","unchecked");
			$(this).parents('.modal_body').find('input[allaa]').iCheck('uncheck');
		} else {
			$(this).attr("itembb","checked");
			var len = $(this).parents('.modal_body').find('input[itembb=checked]').length;
			if(len == $('.comment_dialog input[itembb]').length){
				$(this).parents('.modal_body').find('input[allaa]').iCheck('check');	
			}
		}
	});
	
	
	//(11)dragSelect,js需要在其他控件之上
	$('#list_dragselect').orderingList({
		dragSelect: true
	});
	$(".btn-first").text("置顶");
	$(".btn-up").text("向上");
	$(".btn-down").text("向下");
	$(".btn-last").text("置底");    
	
	
	
	
	
	
	
	$(window).resize(function(e) {
		$(document).scrollTop(0);
		//(3)四季田景下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = $(window).width();
		var oWindowH = $(window).height();
		if( oWindowW < 1280 ){
			menuOnOff = false;
			$('.panorama_level').hide();
			$('.panorama_content').addClass('hide_pano');
			
		}else{
			menuOnOff = true;
			$('.panorama_level').show();
			$('.panorama_content').removeClass('hide_pano');	
		}		
		$('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				$('.panorama_level').hide();
				$('.panorama_content').addClass('hide_pano');
				menuOnOff = false;	
			}else{
				$('.panorama_level').show();
				$('.panorama_content').removeClass('hide_pano');
				menuOnOff = true;		
			}	
		});
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( $("html").height() > $("body").height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
		}
		$('.panorama_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $(document).height() - 60 -IESpace
		});
		$('.panorama_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $(document).height() - 60 -IESpace
		});
		$(".panorama_nodata").css({
			"height" : $(".panorama_main").outerHeight()-45-64-20
		})
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
		oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top")
		
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


	//(6-1)删除该分组
	function DeleteGroup (){
		var r=confirm("删除该分组将清空该分组下全景图的全部评论，浏览量、点赞数，确定删除？");   
		if(r==true){
			return true;
		}else{
			return false;   
		}	
	}
	//(6-2)通用的删除对应的每一项
	function DeleteCommon ( obj , oItems ){
		$( obj ).parents( "." + oItems ).remove();
	}
	
	//(9)评论管理删除及批量删除
	function DeleteComment( obj , oParent ){
		$( obj ).parents( oParent ).remove();	
	}
	function DeleteCommentAll( obj , oItems , oParent ){
		$( obj ).parents(oParent).find("input[itembb=checked]").parents( oItems ).remove();	
	}
	
	
	//(10-1)音乐库和我的音乐下的"奇偶变化"
	$("#music_library .library_list li").each(function(index, elem) {
		$("#music_library .library_list li").eq(0).addClass("m_cur");
        if( $(elem).index()%2 == 0 ){
			$(elem).addClass("m_even");
		}
    });
	$("#my_music .library_list li").each(function(index, elem) {
        if( $(elem).index()%2 == 0 ){
			$(elem).addClass("m_even");
		}
    });
	//(10-2)音乐库--控制选中音乐的状态
	function MusicStatue( obj , oClassName ){
		$( obj ).addClass( oClassName ).siblings().removeClass( oClassName );
	}
	//(10-3)音乐库--控制音乐播放
	$(".media_audio").each(function(index,elem) {
		$( this )[0].pause();
	});
	function AutoPlay( obj , iClassName ){
		
		if( $( obj ).hasClass('i_off') ){
			$( obj ).removeClass('i_off');	
			$( obj ).find('.media_audio')[0].pause();
		}else{
			$( obj ).addClass('i_off');		
			$(".media_audio").each(function(index,elem) {
				$( this )[0].pause();
			});
			$( obj ).find('.media_audio')[0].play();
			$( obj ).parents('.m_item').siblings().find( iClassName ).removeClass('i_off');
		}
		
	}
	//(10-4)删除我的音乐中的每一项
	function DeleteMusic ( obj , oItems ){
		$( obj ).parents( "." + oItems ).remove();
		$("#my_music .library_list li").each(function(index, elem) {
			if( $(elem).index()%2 == 0 ){
				$(elem).addClass("m_even");
			}else{
				$(elem).removeClass("m_even");	
			}
		});
	}
	
	
	
	
