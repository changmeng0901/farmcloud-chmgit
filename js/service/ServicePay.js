$(function(){

    // 支付页面--选择支付方式状态
    $('.payway_list .w_item').each(function(index, elem) {
    	$( elem ).click(function(){
    		$(this).addClass('w_cur').siblings().removeClass('w_cur');
    	});	
    });			

    
});