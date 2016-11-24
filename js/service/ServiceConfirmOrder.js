$(function(){

    // 确认订单页面相关js
    
    //单选和复选插件
    $('input[class=iRadio]').iCheck({  
        radioClass: 'iradio_minimal-blue',
     });
    $('input[class=iCheckbox]').iCheck({ 
        checkboxClass: 'icheckbox_minimal-blue',
     });

    // 下拉框插件
    $('.selectpicker').selectpicker();  

    // 发票选择方式
    $('.invoice_mode .items').each(function(index, elem) {
    	$('.invoice_mode .items').eq(0).find('input').on('ifChecked',function(event){
    		$('.need_invoice').hide();
    		$('.tax_invoice').hide();
    	});
    	$('.invoice_mode .items').eq(1).find('input').on('ifChecked',function(event){
    		$('.need_invoice').show();
    		$('.tax_invoice').hide();
    	});
    	$('.invoice_mode .items').eq(2).find('input').on('ifChecked',function(event){
    		$('.tax_invoice').show();
    		$('.need_invoice').hide();
    	});
    });		
    
});