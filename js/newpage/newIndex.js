// 进度条
$(document).ready(function() {
	if(($('.blue').width()/$('.growth').width()*100)>80){
	 	$('.manage').addClass('newRight');
	};
	// 点击签到
	$('.topContentLeft .sign').click(function() {
		$(this).addClass('cur');
		$('.topContentLeft .sign .points').css('display','block');
		setTimeout("$('.topContentLeft .sign .points').css('display','none')",1000)
	});

	getSlider();
	newSlider();
	// 新闻资讯
	$('.news .item li').click(function() {
		var index = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.news .box').eq(index).addClass('current').siblings().removeClass('current');
	});

	// 运营情况
	var dial1 = echarts.init(document.getElementById('dial1'));
	var dial2 = echarts.init(document.getElementById('dial2'));
	var dial3 = echarts.init(document.getElementById('dial3'));
	var dial4 = echarts.init(document.getElementById('dial4'));
	var dial5 = echarts.init(document.getElementById('dial5'));
	var dial6 = echarts.init(document.getElementById('dial6'));
	var dial7 = echarts.init(document.getElementById('dial7'));
	var option1 = getOption(30,'#fa8564');
	var option2 = getOption(40,'#9cc8ec');
	var option3 = getOption(60,'#ed8dc0');
	var option4 = getOption(30,'#b0e8ac');
	var option5 = getOption(50,'#8eeaf3');
	var option6 = getOption(80,'#96eab9');
	var option7 = getOption(60,'#63a8eb');
	dial1.setOption(option1); 
	dial2.setOption(option2);
	dial3.setOption(option3);
	dial4.setOption(option4); 
	dial5.setOption(option5);
	dial6.setOption(option6);
	dial7.setOption(option7);               
});
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
function newSlider(){//新闻资讯--成功案例
	var num = 0;
	var itemW = $('.newsBox .case:eq(0) li').outerWidth(true)*3;
	var len = $('.newsBox .case:eq(0) li').length;
	$('.newsBox .case:eq(0)').css( 'width' , $('.newsBox .case:eq(0) li').outerWidth(true)*len )
	if(len<=3){
		$('.btns').hide();
	}else{
		$('.btns').show();
	}
	var nub = Math.ceil(len/3);
	var html = " ";
	for(var i = 0; i<nub; i++){
		html+="<li></li>";
	}
	$('.circleBtn').html(html);
	$('.circleBtn li:first').addClass('cur');
	//上一个
	$('.btns .leftBtn') .click(function(){
		if( num <=0 ){
			num =0;	
		}else{
			num--;	
		}
		$('.newsBox .case:eq(0)').css( 'left' , -(itemW*num));
		$('.circleBtn li').eq(num).addClass('cur').siblings().removeClass('cur');
	});	
	//下一个
	$('.btns .rightBtn') .click(function(){
		if( num >= Math.floor(len/3)){
			num = Math.floor(len/3);	
		}else{
			num++;
		}
		$('.newsBox .case:eq(0)').css( 'left' , -(itemW*num) );
		$('.circleBtn li').eq(num).addClass('cur').siblings().removeClass('cur');
	});
	$('.circleBtn li').click(function() {
		var num = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.newsBox .case:eq(0)').css( 'left' , -(itemW*num) );
	});	
}

function getOption(v,_color) {
	option = {
	    tooltip : {
	      show:false,
	        formatter: "{a} <br/>{b} : {c}%"
	    },
	    toolbox: {
	        show : false,
	        feature : {
	            mark : {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    series : [
	        {
	            name:'业务指标',
	            type:'gauge',
	            startAngle: 180,
	            endAngle: 0,
	            center : ['50%', '90%'],    // 默认全局居中
	            radius : ['12','40'],
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    width: 20,
						color: [
							[(v/100), _color],
							[1, '#f1f1f1']
						]
	                }
	            },
				splitNumber:0,

	            axisTick: {            // 坐标轴小标记
	                splitNumber: 2,   // 每份split细分多少段
	                length :5,        // 属性length控制线长
	            },
	            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
	                formatter: function(v){
	                    switch (v+''){
	                        case '10': return '低';
	                        case '50': return '中';
	                        default: return '';
	                    }
	                },
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#fff',
	                    fontSize: 15,
	                    fontWeight: 'bolder'
	                }
	            },
	            pointer: {//meng:指针yangshi
	                width:5,
	                length: '90%',
	                color: 'rgba(59, 59, 67, 0.8)'
	            },
	            title : {
	                show : false,
	                offsetCenter: [0, '-60%'],       // x, y，单位px
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#fff',
	                    fontSize: 14
	                }
	            },
	            detail : {
	                show : false,
	                backgroundColor: 'rgba(0,0,0,0)',
	                borderWidth: 0,
	                borderColor: '#ccc',
	                width: 20,
	                height: 10,
	                offsetCenter: [0, -40],       // x, y，单位px
	                formatter:'{value}%',
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontSize : 14
	                }
	            },
	            data:[{value: v, name: ''}]
	        }
	    ]
	};
	return option;
}