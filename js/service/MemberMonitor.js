// JavaScript Document

$(function(){
	
	
	// (1)获取焦点和失去焦点状态
    $('input[type=text]:not(#share_link),textarea').focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $(this).val("");    
        };  
    });
    $('input[type=text]:not(#share_link),textarea').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val(this.defaultValue); 
        };  
    }); 

    //(3)联系人选择
	//var selectPickList = $("#nonnumeric").pickList();
	selectPickList = $("#nonnumeric").pickList({  
		 sourceListLabel: "全部",
		targetListLabel : "已选择", 
	}); 
	
	// (4)tooltip工具提示
	$("[data-toggle='tooltip']").tooltip(); 

	// 复选框插件
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});

	
	//模态框大屏和小屏的切换效果
	var oWindowH = $(window).height();
	oWindowH < 500 ? $(".member_dialog").addClass("member_top") : 	$(".member_dialog").removeClass("member_top")
	
	$(window).resize(function(e) {
		
		var oWindowH = $(window).height();
		oWindowH < 500 ? $(".member_dialog").addClass("member_top") : 	$(".member_dialog").removeClass("member_top")
		
    });
	
	
});
	

	//复制链接
    function copyShareUrl(){
        var Url2=document.getElementById("share_link");
        Url2.focus();
        Url2.select();
        try{
		    if(document.execCommand('copy', false, null)){
		        alert('已复制该内容');
		    } else{
		         alert('此浏览器不支持复制功能，请手动复制一下吧！');
		    }
		} catch(err){
		     alert('此浏览器不支持复制功能，请手动复制一下吧！');
		}  
    }


	// 添加会员监控列表项，选择状态
	function MonitorSelect(obj,curClass){
		if( $(obj).hasClass( curClass ) ){
			$(obj).removeClass( curClass )
		}else{
			$(obj).addClass( curClass );
		}
	}

	// 会员列表删除
	function MemberDelete(obj,oParent){
		$(obj).parents(oParent).remove();
	}
	
	// 皮肤设置
	function skinCur(obj){
		$(obj).addClass('s_cur').siblings().removeClass('s_cur');
	}
	
	
	
	
