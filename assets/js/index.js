$(document).ready(function(){
	$('.delete-item').click(function(){
		if(confirm("Are you sure you want to delete this?")){
	        $(this).closest('tr').remove();
	        totalAmount();
	        if($('table>tbody>tr').length  == 0){
	        	$('#submit-btn').hide();
	        }
	    }
	    else{
	        return false;
	    }
		
	});

	$('.buttons .plus').click(function(){
		var value = parseFloat($(this).closest('.qty-input-wrapper').find('input').val());
		if(value>0){
			$(this).closest('.qty-input-wrapper').find('input').val(value+1);
			var price = parseFloat($(this).closest('tr').find('.cost-initial').html());
			$(this).closest('tr').find('.cost-final').html(price*(value+1));
			totalAmount();
		}
	});
	$('.buttons .minus').click(function(){
		var value = parseFloat($(this).closest('.qty-input-wrapper').find('input').val());
		if(value > 1){
			$(this).closest('.qty-input-wrapper').find('input').val(value-1);
			var price = parseFloat($(this).closest('tr').find('.cost-initial').html());
			$(this).closest('tr').find('.cost-final').html(price*(value-1));
			totalAmount();
		}else{
			alert("Minimum qty should be 1 If you don't want this item delete it.")
		}
	});

	$('#gstActive').click(function(){
		totalAmount();
		if(!$(this). prop("checked")){			
			$('.gstWrapper').fadeOut();
		}
	});

	function totalAmount(flag){
		var subtotal = 0, gst = 0;

		$( "table tbody tr" ).each(function() {
		  var eachCost = parseFloat($( this ).find( ".cost-final" ).html());
			subtotal = subtotal + eachCost;
		});

		$('.subtotal').html(subtotal);

		if($(gstActive). prop("checked")){
			gst = (subtotal*18)/100;
			$('.gstAmount').html(gst);
			$('.gstWrapper').fadeIn();
		}

		$('.totalcost').html(subtotal+gst);		
	}

	$('#submit-btn').click(function(){
		var jsonData = {list : []};
		$( "table tbody tr" ).each(function() {
		  	jsonData.list.push({
		  		"productName" : $(this).find(':first-child').html(),
		  		"price" : parseFloat($(this).find(':nth-child(2) .cost-initial').html()),
		  		"quantity" : parseFloat($(this).find(':nth-child(3) input').val()),
		  		"cost" : parseFloat($(this).find(':nth-child(4) .cost-final').html())
		  	});
		});

		jsonData['subtotal'] = parseFloat($('.totalcost').html());
		jsonData['gst'] = parseFloat($('.gstAmount').html());
		jsonData['totalcost'] = parseFloat($('.totalcost').html());

		$('.json-data-wrapper').html(JSON.stringify(jsonData)).show();
		
	});
});