$(function(){

    // 支付页面--选择支付方式状态
    $('.payway_list .w_item').each(function(index, elem) {
    	$( elem ).click(function(){
    		$(this).addClass('w_cur').siblings().removeClass('w_cur');
    	});	
    });	
	
	//支付页面--立即支付弹出框
	$('#pay_btn').click(function(){
		$('#paytip_modal').show();
	});	
	$('#paytip_modal .m_close,#paytip_modal .pay_success,#paytip_modal .pay_again').click(function(){
		$('#paytip_modal').hide();
	});	

    
});