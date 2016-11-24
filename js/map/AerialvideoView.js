// JavaScript Document
var zObj = {};


$(function(){

	// (1)获取焦点和失去焦点状态
    $("input[type=text]").not(".ipt_link").focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $(this).val("");    
        };  
    });
     $("input[type=text]").not(".ipt_link").blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val(this.defaultValue); 
        };  
    }); 
	//(7)复选框插件
	$('input[class=iCheck]').iCheck({
		checkboxClass: 'icheckbox_minimal',
		increaseArea: '20%' // optional
	});

	//(2)计算主体高度
	var oWindowW = $(window).width();
	var oWindowH = $(window).height();
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( $("html").height() > $("body").height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	$(".aerial_playlist").css({ 
		//"min-height" : $(document).height() - 98 -IESpace,
		      "height" : oWindowH - 98  -IESpace
	});
	$("#danmuarea").css({ 
		  "min-height" : 500 - 52 -IESpace,
		      "height" : oWindowH - 52  -IESpace
	});
	
	$(".aerial_playlist").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	$(".card_dialog .modal_body").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	$(".scene_dialog .modal_body").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top")

	
	
	//(3-1)左侧播放列表选择状态控制
	$(".playlist_list .item").each(function(index, elem) {
		$(".playlist_list .item").eq(0).addClass("icur");
        $(elem).click(function(){
			$(this).addClass("icur").siblings().removeClass("icur");	
		});
    });
	//(3-2)播放列表定时器设置
	playlistAnimate();
	
	//(4)弹幕开关状态
	resumer();
	var tmOnoff = true;
	$(".switch_block .tanmu_bar").click(function(){
		if( tmOnoff == true ){
			$(".switch_block span").addClass("onoff");
			 $("#danmu").danmu("setOpacity",0);
			 pauser();
			tmOnoff = false;
		}else{
			$(".switch_block span").removeClass("onoff");
			$("#danmu").danmu("setOpacity",1)	
			resumer();
			tmOnoff = true;
		}
	});
	
	//(5)复制链接
	$(".btn_copy").click(function(){
		$(".share_dialog .ipt_link").select();
		//document.execCommand("Copy");
	});
	
	//(6)弹幕设置
	//初始化
	$("#danmu").danmu({
		left:"1000px",
		top:"40%",
		height:"100%",
		width:"100%",
		speed:20000,
		opacity:1,
		font_size_small:16,
		font_size_big:24,
		top_botton_danmu_time:6000
	});
	query();//  从后端获取弹幕并添加
	//再添加三个弹幕
	$("#danmu").danmu("addDanmu",[
		{ text:"这是滚动弹幕" ,color:"white",size:1,position:0,time:2},
		//{ text:"这是顶部弹幕" ,color:"yellow" ,size:1,position:1,time:2},
		//{ text:"这是底部弹幕" , color:"red" ,size:1,position:2,time:2}
	]);
	
	
	
	//----------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------
	$(window).resize( resizeFn );	
	
	
});


function resizeFn(){
	$(document).scrollTop(0);
		
	//(4)计算主体高度
	var oWindowW = $(window).width();
	var oWindowH = $(window).height();
	var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
	if( $("html").height() > $("body").height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	$(".aerial_playlist").css({ 
		//"min-height" : $(document).height() - 98 -IESpace,
			  "height" :  oWindowH - 98  -IESpace
	});
	$("#danmuarea").css({ 
		  "min-height" : 500 - 52 -IESpace,
		      "height" : oWindowH - 52  -IESpace
	});
	$(".aerial_playlist").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top")
}

//(3-2)播放列表定时器设置
function playlistAnimate(){
	
	zObj.pTimer = setTimeout(function(){
		$(".aerial_playlist").stop().animate({
			"left" : -210
		},500)	
	},700);
	$("#BarOnoff").click(function(){
		clearTimeout( zObj.pTimer );
		zObj.pTimer = setTimeout(function() {
				$(".aerial_playlist").stop().animate({
					left: 0
				}, 300)
			}, 300);
	});
	$("#BarOnoff").mouseleave(function(){
		clearTimeout( zObj.pTimer );
		zObj.pTimer = setTimeout(function() {
				$(".aerial_playlist").stop().animate({
					left: -210
				}, 300)
			}, 1000);
	});
	$(".aerial_playlist").mousemove(function(){
		clearTimeout( zObj.pTimer );
		zObj.pTimer = setTimeout(function() {
				$(".aerial_playlist").stop().animate({
					left: 0
				}, 300)
			}, 300);
	});
	$(".aerial_playlist").mouseleave(function(){
		clearTimeout( zObj.pTimer );
		zObj.pTimer = setTimeout(function() {
				$(".aerial_playlist").stop().animate({
					left: -210
				}, 300)
			}, 300);
	});
	
}
	
//---------------------------------------------------------------------------------------	
//弹幕
  //一个定时器，监视弹幕时间并更新到页面上
  /*function timedCount(){
    $("#time").text($("#danmu").data("nowTime"));

    t=setTimeout("timedCount()",50)

  }
  timedCount();*/



  function starter(){
	  //让弹幕开始运行
    $("#danmu").danmu("danmuStart");
  }
  function pauser(){ 
  	//暂停弹幕
    $("#danmu").danmu("danmuPause");
  }
  function resumer(){
	  //暂停后继续
    $("#danmu").danmu("danmuResume");
  }
  function stoper(){
	  //停止弹幕
    $("#danmu").danmu("danmuStop");
  }
  function getime(){
    alert($("#danmu").data("nowTime"));
  }
  function getpaused(){
    alert($("#danmu").data("paused"));
  }
  //添加弹幕测试  这个函数没有调用
  function add() {
    var newd =
    {"text": "new2", "color": "green", "size": "1", "position": "0", "time": 60};
    $("#danmu").danmu("addDanmu", newd);
  }
  //向后端添加弹幕测试  这个函数没有调用
  function insert(){
    var newd= { "text":"new2" , "color":"green" ,"size":"1","position":"0","time":50};
    str_newd=JSON.stringify(newd);
    $.post("stone.php",{danmu:str_newd},function(data,status){alert(data)});
  }
  //从后端获取到弹幕并添加
  function query() {
    $.get("query.php",function(data,status){
      var danmu_from_sql=eval(data);
      for (var i=0;i<danmu_from_sql.length;i++){
        var danmu_ls=eval("("+danmu_from_sql[i]+")");
        $("#danmu").danmu("addDanmu",danmu_ls);
      }
    });
  }
  //发送弹幕，使用了文档README.md第7节中推荐的方法
  function send(){
    var text = document.getElementById("text_tanmu").value;
    var color = document.getElementById("color").value;
    var position = document.getElementById("position").value;
    var time = $("#danmu").data("nowTime")+1;
    var size =document.getElementById("text_size").value;
    var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+'}';
    $.post("stone.php",{danmu:text_obj});
    var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+',"isnew":""}';
    var new_obj=eval("("+text_obj+")");
    $("#danmu").danmu("addDanmu",new_obj);
    document.getElementById("text").value="";
  }
  //调整透明度函数
  function op(){
    var op=document.getElementById("op").value;
    $("#danmu").danmu("setOpacity",op/100);
  }

  //调隐藏 显示
  function changehide() {
   // var op = document.getElementById("op").value;
    //op = op / 100;
    if (document.getElementById("ishide").checked) {
      $("#danmu").danmu("setOpacity",1)
    } else {
      $("#danmu").danmu("setOpacity",0)

    }
  }

  //设置弹幕时间
  function settime(){
    var t=document.getElementById("set_time").value;
    t=parseInt(t)
    $("#danmu").danmu("setTime",t);
  }	
