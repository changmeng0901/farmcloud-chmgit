


//(8)地图航线
;(function ($) {
	/**
	* author: 前端小菜鸟
	* date: 2016-07-12
	* resizeFn 		  ==> 初始化窗口
	* playlistAnimate ==> 播放列表定时器设置
	* getFlightPlanSite ==> 初始化调用后端接口api，获取数据
	* sliderMapBar ==> 通过getFlightPlanSite函数获取的数据，动态渲染左侧菜单dom
	* initBindDomEvent ==> 初始化页面所有需要绑定事件的dom元素
	* initializeGoogelMaps ==> 谷歌地图render，此方法还需拆分，具体根据返回数据查分不同模块@todu
	*/

	var FirstMarker,
		LastMarker,
		AnimateMarker,
		playTimer;

	var zObj = {};
	var flightPlanSite;
	var dataFlightPlanSite;

	var AerialVideoView = {
		init: function () {
			AerialVideoView.resizeFn();
			$(window).resize( AerialVideoView.resizeFn );
			AerialVideoView.playlistAnimate();
			AerialVideoView.initBindDomEvent()
			//AerialVideoView.sliderMapBar();
			AerialVideoView.getFlightPlanSite();
		},
		makeParameterMethod: function (string) {
			var Method = '&method=' + string;
			return Method;
		},
		makeParameterField: function (IDtype, ID) { //base_id
			return encodeURI('&field={"data":{"' + IDtype + '":"' + ID + '"}}');
		},
		getFlightPlanSite: function () {

			var ParameterMethod = AerialVideoView.makeParameterMethod("aerial.video.group.data"),
				groupId = AerialVideoView.makeParameterField("group_id","17");

			var url = "http://192.168.21.55:8080/rest/1.0/aerialVideo?v=1.0&format=json"+ ParameterMethod + groupId;


			 $.ajax({
			 	type: "GET",
			 	timeout: 1000,
			 	url: url,
			 	dataType: "jsonp",
			 	jsonp: 'callback',
			 	success: function(response) {
			 		//var data=$.parseJSON(response)
			 		//alert(response.invoke_result);
			 		//groupInfo(response.groupstr);
			 		//console.log(response.groupstr.list);
					AerialVideoView.initializeGoogelMaps(response.groupstr.list);

					var groupstr = response.groupstr;
					var enterpriseInfoData = {
						logo_img : groupstr.logo_img,
						group_name : groupstr.group_name,
					 	business_name: groupstr.business_name,
					 	business_tel: groupstr.business_tel,
					 	business_email: groupstr.business_email,
						business_weibo: groupstr.business_weibo,
						business_address: groupstr.business_address,
						business_card_introduce:groupstr.business_card_introduce,
						description : groupstr.list[0].description,
						file_url : groupstr.list[0].file_url
					 };
					 //alert(groupstr.list[0].file_url)
					 
					 
					 
					 AerialVideoView.enterpriseInfoModal(enterpriseInfoData);
					 //初始化完地图，再去往左侧菜单添加数据
					 AerialVideoView.sliderMapBar(response.groupstr.list);
			 	},
			 	error: function(e) {
			 		try {
			 			console.log(opt)
			 		} catch (e) {}
			 	}
			 });

		},
		sliderMapBar: function (data) {
			var $playlistList = $('.playlist_list'),
				sliderItemStr = '';
				//console.log(data);
			for (var item in data) {
				//console.log(data[item].description);
				currentStyle = item == 0 ? 'icur' : '';

				sliderItemStr  += '<li class="item video-url '+ currentStyle+
								  '" data-video-url="'+ data[item].file_url +'">'+
								  '<img class="mn_pic" src="'+ data[item].thumbnail_image_url +'" />'+
								  '<p class="text_con"><img class="icon_mn" src="../images/map/icon_mnplay.png" />'+data[item].aerial_name+
								  '</p><i class="bg_opa50"></i></li>';
			}
			$playlistList.append(sliderItemStr);

		},
		enterpriseInfoModal : function(data){
			
			//@@航拍页面弹框等基础数据初始化
			$('#qy_logo').attr('src',data.logo_img);
			$('#qycard_name').html( data.business_name );
			$('#qycard_phone').html( data.business_tel );
			$('#qycard_mail').html( data.business_email );
			$('#qycard_weibo').html( data.business_weibo );
			$('#qycard_addr').html( data.business_address );
			$('#qycard_intro').html( data.business_card_introduce );
			$('#scene_description').append(data.description);
			
			var scriptAdd = "<script> var vID = 'HLSPlayer2';var vWidth = '100%';var vHeight = '100%';var vPlayer = '../ffdshow/player.swf';var vHLSset = '../ffdshow/HLS.swf';var vPic = '../images/commons/videosImg.jpg';var vHLSurl = '"+data.file_url+"';a.init('videoimg');<\/script>";
			$("#HLSPlayer2").html(scriptAdd);

		},
		initBindDomEvent: function(){
			
			//左侧菜单选中状态
			$('.playlist_list').on('click','.video-url',function () {
				var that = $(this);				
				that.addClass('icur').siblings().removeClass('icur');
				
				var ParameterMethod = AerialVideoView.makeParameterMethod("aerial.track.data"),
				groupId = AerialVideoView.makeParameterField("aerial_video_id","1");

				var url = "http://192.168.21.55:8080/rest/1.0/aerialVideo?v=1.0&format=json"+ ParameterMethod + groupId;
	
	//var scriptAdd = "<script> var vID = 'HLSPlayer2';var vWidth = '100%';var vHeight = '100%';var vPlayer = '../ffdshow/player.swf';var vHLSset = '../ffdshow/HLS.swf';var vPic = '../images/commons/videosImg.jpg'; var vHLSurl = 'http://img1.farmeasy.cn/video/20160413/ditu/playlist.m3u8';a.init('videoimg');<\/script>";   
	//				jQuery("#HLSPlayer2").html(scriptAdd);
				 $.ajax({
					type: "GET",
					timeout: 1000,
					url: url,
					dataType: "jsonp",
					jsonp: 'callback',
					success: function(response) {

						AerialVideoView.initializeGoogelMaps(response.trackstr);
						var scriptAdd = "<script> var vID = 'HLSPlayer2';var vWidth = '100%';var vHeight = '100%';var vPlayer = '../ffdshow/player.swf';var vHLSset = '../ffdshow/HLS.swf';var vPic = '../images/commons/videosImg.jpg';var vHLSurl = '"+that.attr("data-video-url")+"';a.init('videoimg');<\/script>";
			$("#HLSPlayer2").html(scriptAdd);
						
					},
					error: function(e) {
						try {
							console.log(opt)
						} catch (e) {}
					}
				 });
				
			});
			
			// 文本域获取焦点和失去焦点状态
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
			//复选框插件
			$('input[class=iCheck]').iCheck({
				checkboxClass: 'icheckbox_minimal',
				increaseArea: '20%' // optional
			});
			//复制链接
			$(".btn_copy").click(function(){
				$(".share_dialog .ipt_link").select();
				//document.execCommand("Copy");
			});
			
		},
		resizeFn: function () {

			$(document).scrollTop(0);

			//(4)计算主体高度
			var oWindowW = $(window).width();
			var oWindowH = $(window).height();
			var oHeaderH = $('.video_header_wap').outerHeight();
			var oFooterH = $('.video_footer_wap').outerHeight();
			var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
			if( $("html").height() > $("body").height() ){
				IESpace	= 4;
			}else{
				IESpace	=0
			}
			$(".aerial_playlist").css({
				//"min-height" : $(document).height() - oHeaderH -IESpace,
					  "height" :  oWindowH - oHeaderH  -IESpace
			});
			$("#HLSPlayer2").css({
				  "min-height" : 500 - oHeaderH -IESpace,
					  "height" : oWindowH - oHeaderH  -IESpace
			});
			$("#danmuarea").css({
				  "min-height" : 500 - oHeaderH -IESpace,
					  "height" : oWindowH - oHeaderH  -IESpace
			});
			$(".aerial_playlist").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false});
			$(".card_dialog .modal_body").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false});
			$(".scene_dialog .modal_body").niceScroll({cursorcolor:"#919191",cursorwidth:6,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false});
			oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top")

		},
		initializeGoogelMaps: function (data) {
			var flightPlanSite = [],
				arrLat = [],
				arrLing = [],
				abLen = data[0].track_list;

			for (var indx in data) {
				var list = data[indx].track_list;
				for (var item in list) {
					var gps = list[item].GPS;
					gps = gps.replace(/[()]/g, "");
					gps = gps.split(",");
					var temp = new google.maps.LatLng( parseFloat(gps[1]), parseFloat(gps[0]) );
					var tempLat =  parseFloat(gps[1]);
					var tempLing = parseFloat(gps[0]);
					flightPlanSite.push( temp );
					arrLat.push( tempLat );
					arrLing.push( tempLing );
				}
			}

			console.log(flightPlanSite);
			
			LatPlanSite = arrLat;
			LingPlanSite = arrLing;

			var myLatLng = flightPlanSite[0];
			var myOptions = {
				zoom: 20,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.TERRAIN,
				mapTypeControl: true,//false表示不显示控件，即头部地图类型不显示
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,//HORIZONTAL_BAR普通类型
					position: google.maps.ControlPosition.TOP_LEFT  
				},
				zoomControl: false,//取消放大缩小
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_BOTTOM 
				},
				scaleControl: true,
				streetViewControl: false,// 取消街景
	 			mapTypeControl:false,//取消地图切换
				streetViewControlOptions: {
					position: google.maps.ControlPosition.RIGHT_BOTTOM 
				}
				//disableDefaultUI: true, //取消默认的试图,即右侧放大和缩小
				//navigationControl: true, //true表示显示控件

			};
		    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);//初始化地图

			// Define a symbol using SVG path notation, with an opacity of 1.
			var lineSymbol = {
				path: 'M 0,-1 0,1',
				strokeOpacity: 1,
				scale: 2
			};
		    var flightPath = new google.maps.Polyline({//类型为直线的
				path: flightPlanSite,
				strokeColor: "#FF0000",
				//strokeOpacity: 1.0,
				//strokeWeight: 2,
				strokeOpacity: 0,
				icons: [{
				  icon: lineSymbol,
				  offset: '0',
				  repeat: '10px'//许仙密度
				}]
		    });


			FirstMarker = new google.maps.Marker({  //起点
					icon:"../images/commons/icon_plane2.png",
					map: map,
					position:  flightPlanSite[0],
				});
			LastMarker = new google.maps.Marker({  //终点
					icon:"../images/commons/icon_plane3.png",
					map: map,
					position:  flightPlanSite[flightPlanSite.length-1],
				});
			AnimateMarker = new google.maps.Marker({  //动态滑动点
					icon:"../images/commons/icon_plane3.png",
					map: map,
				});

			flightPath.setMap( map );

			var index_ = 0;
			function timeout(){
				if( index_ < flightPlanSite.length ){
					var aPosition = flightPlanSite[index_];
					AnimateMarker.setPosition( aPosition );
					map.setCenter(aPosition);
					$("#longitude").html( LatPlanSite[index_] );
					$("#latitude").html( LingPlanSite[index_] );
					index_++;
				}else{
					clearInterval( playTimer );
				}
			}
			playTimer = setInterval(function(){
				timeout();
			},1000);



		},
		playlistAnimate: function () {
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
	};
	AerialVideoView.init();
})($);

