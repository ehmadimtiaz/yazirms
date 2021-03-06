var base_url = $('base').attr('data-base');
var role = $('base[data-role]').attr('data-role');
$(document).ready(function(){
	$('#help_button').on('click',function(){
		$('#help_modal').fadeIn('500');
	});
	$('.cross_button_to_close').on('click',function(){
		$('#help_modal').fadeOut('500');
	});
	$('#select_all_items').on('click',function(){
		if($('#order_details_holder .single_order[data-selected=selected]').attr('data-order-type')=='Dine In'){
			$('#items_holder_of_order .single_item_in_order').css('background-color','#B5D6F6');
			$('#items_holder_of_order .single_item_in_order').attr('data-selected','selected');
		}else{
			swal({
				title: 'Alert',
				text: "You don't need to select or deselect any item for take away or delivery, because you need to deliver all items in a pack",
                confirmButtonColor: '#b6d6f6' 
			});
		}
		
	});
	$('#deselect_all_items').on('click',function(){
		if($('#order_details_holder .single_order[data-selected=selected]').attr('data-order-type')=='Dine In'){
			$('#items_holder_of_order .single_item_in_order').css('background-color','#ffffff');
			$('#items_holder_of_order .single_item_in_order').attr('data-selected','deselected');
		}else{
			swal({
				title: 'Alert',
				text: "You don't need to select or deselect any item for take away or delivery, because you need to deliver all items in a pack",
                confirmButtonColor: '#b6d6f6' 
			});
			
		}
	});
	$(document).on('click','#items_holder_of_order .single_item_in_order',function(){
		if($('#items_holder_of_order .single_item_in_order[data-order-type="Dine In"]').length>0){
			// $('.single_item_in_order').css('background-color','#ffffff');
			// $('.single_item_in_order').attr('data-selected','unselected');
			if($(this).attr('data-selected')=="selected"){
				$(this).css('background-color','#ffffff');
				$(this).attr('data-selected','unselected');
			}else{
				$(this).css('background-color','#B5D6F6');
				$(this).attr('data-selected','selected');
			}
			
		}
	});
	$('#start_cooking').on('click',function(){
		if($('#order_details_holder .single_order[data-selected=selected]').attr('data-order-type')=='Dine In'){
			if($('#items_holder_of_order .single_item_in_order[data-selected=selected]').length>0){
				// var previous_id = $('#items_holder_of_order .single_item_in_order[data-selected=selected]').attr('id').substr(12);
				var previous_id = '';
				var j = 1;
				var total_items = $('#items_holder_of_order .single_item_in_order[data-selected=selected]').length;
				$('#items_holder_of_order .single_item_in_order[data-selected=selected]').each(function(i, obj) {
					if(j==total_items){
						previous_id += $(this).attr('id').substr(12);	
					}else{
						previous_id += $(this).attr('id').substr(12)+',';
					}
					j++;
				});
				var previous_id_array = previous_id.split(",");
				previous_id_array.forEach(function(entry) {
				    $('#single_item_'+entry).attr('data-selected','selected');
				    $('#single_item_'+entry).css('background-color','#B5D6F6');
				});
				if(previous_id!=''){
					$.ajax({
						url:base_url+"Bar/update_cooking_status_ajax",
						method:"POST",
						data:{
							previous_id : previous_id,
							cooking_status : 'Started Cooking',
							csrf_test_name: $.cookie('csrf_cookie_name')
						},
						success:function(response) {
							swal({
								title: 'Alert',
								text: "Preparing Started!!",
				                confirmButtonColor: '#b6d6f6' 
							});	

						},
						error:function(){
							alert("error");
						}
					});
				}
			}else{
				swal({
					title: "Alert!",
					text: "Please select an item to start cooking!",
					confirmButtonColor: '#b6d6f6' 
				})	
			}
		}else{
			var previous_id = '';
			var j = 1;
			var total_items = $('#items_holder_of_order .single_item_in_order').length;
			$('#items_holder_of_order .single_item_in_order').each(function(i, obj) {
				if(j==total_items){
					previous_id += $(this).attr('id').substr(12);	
				}else{
					previous_id += $(this).attr('id').substr(12)+',';
				}
				j++;
			});
			var previous_id_array = previous_id.split(",");
			previous_id_array.forEach(function(entry) {
			    $('#single_item_'+entry).attr('data-selected','selected');
			    $('#single_item_'+entry).css('background-color','#B5D6F6');
			});
			if(previous_id!=''){
				$.ajax({
					url:base_url+"Bar/update_cooking_status_delivery_take_away_ajax",
					method:"POST",
					data:{
						previous_id : previous_id,
						cooking_status : 'Started Cooking',
						csrf_test_name: $.cookie('csrf_cookie_name')
					},
					success:function(response) {
						swal({
							title: 'Alert',
							text: "Preparing Started!!",
			                confirmButtonColor: '#b6d6f6' 
						});
								
					},
					error:function(){
						alert("error");
					}
				});
			}
		}
	});
	$('#cooking_done').on('click',function(){
		if($('#order_details_holder .single_order[data-selected=selected]').attr('data-order-type')=='Dine In'){
			if($('#items_holder_of_order .single_item_in_order[data-selected=selected]').length>0){
				// var previous_id = $('#items_holder_of_order .single_item_in_order[data-selected=selected]').attr('id').substr(12);
				var previous_id = '';
				var j = 1;
				var total_items = $('#items_holder_of_order .single_item_in_order[data-selected=selected]').length;
				$('#items_holder_of_order .single_item_in_order[data-selected=selected]').each(function(i, obj) {
					if(j==total_items){
						previous_id += $(this).attr('id').substr(12);	
					}else{
						previous_id += $(this).attr('id').substr(12)+',';
					}
					j++;
				});
				var previous_id_array = previous_id.split(",");
				previous_id_array.forEach(function(entry) {
				    $('#single_item_'+entry).attr('data-selected','selected');
				    $('#single_item_'+entry).css('background-color','#B5D6F6');
				});
				if(previous_id!=''){
					$.ajax({
						url:base_url+"Bar/update_cooking_status_ajax",
						method:"POST",
						data:{
							previous_id : previous_id,
							cooking_status : 'Done',
							csrf_test_name: $.cookie('csrf_cookie_name')
						},
						success:function(response) {
							swal({
								title: 'Alert',
								text: "Preparing Done!!",
				                confirmButtonColor: '#b6d6f6' 
							});	
								
						},
						error:function(){
							alert("error");
						}
					});
				}
			}else{
				swal({
					title: "Alert!",
					text: "Please select an item to cooking item done!",
					confirmButtonColor: '#b6d6f6' 
				})	
			}
		}else{
			var previous_id = '';
			var j = 1;
			var total_items = $('#items_holder_of_order .single_item_in_order').length;
			$('#items_holder_of_order .single_item_in_order').each(function(i, obj) {
				if(j==total_items){
					previous_id += $(this).attr('id').substr(12);	
				}else{
					previous_id += $(this).attr('id').substr(12)+',';
				}
				j++;
			});
			var previous_id_array = previous_id.split(",");
			previous_id_array.forEach(function(entry) {
			    $('#single_item_'+entry).attr('data-selected','selected');
			    $('#single_item_'+entry).css('background-color','#B5D6F6');
			});
			if(previous_id!=''){
				$.ajax({
					url:base_url+"Bar/update_cooking_status_delivery_take_away_ajax",
					method:"POST",
					data:{
						previous_id : previous_id,
						cooking_status : 'Done',
						csrf_test_name: $.cookie('csrf_cookie_name')
					},
					success:function(response) {
						swal({
							title: 'Alert',
							text: "Preparing Done!!",
			                confirmButtonColor: '#b6d6f6' 
						});	

					},
					error:function(){
						alert("error");
					}
				});
			}
		}
	});
	$(document).on('click','#order_details_holder .single_order',function(){
		var sale_id = $(this).attr('id').substr(13);
		$('#order_details_holder .single_order').attr('data-selected','unselected');
		$('#order_details_holder .single_order').css('background-color','#ffffff');
		$(this).attr('data-selected','selected');
		$(this).css('background-color','#b6d6f6');
		$('#selected_order_for_refreshing_help').html(sale_id);
		$.ajax({
			url:base_url+"Bar/get_order_details_bar_ajax",
			method:"POST",
			data:{
				sale_id : sale_id,
				csrf_test_name: $.cookie('csrf_cookie_name')
			},
			success:function(response) {
				response = JSON.parse(response);

				var order_type = '';
				if(response.order_type=='1'){
					order_type = "Dine In";
				}else if(response.order_type=='2'){
					order_type = "Take Away";
				}else if(response.order_type=='3'){
					order_type = "Delivery";
				}
				var draw_table_for_order='';
							
				for (var key in response.items) {
					//construct div
					var this_item = response.items[key];
					
					var selected_modifiers = '';
					var selected_modifiers_id = '';
					var selected_modifiers_price = '';
					var modifiers_price = 0;
					var total_modifier = this_item.modifiers.length;
					var i = 1;
					for(var mod_key in this_item.modifiers)
					{
						var this_modifier = this_item.modifiers[mod_key];
						//get selected modifiers
				    	if(i == total_modifier){
			    			selected_modifiers += this_modifier.name;
			    			selected_modifiers_id += this_modifier.modifier_id;
			    			selected_modifiers_price += this_modifier.modifier_price;
				    		modifiers_price = (parseFloat(modifiers_price)+parseFloat(this_modifier.modifier_price)).toFixed(2);
				    	}else{
			    			selected_modifiers += this_modifier.name+',';
			    			selected_modifiers_id += this_modifier.modifier_id+',';
				    		selected_modifiers_price += this_modifier.modifier_price+',';
				    		modifiers_price = (parseFloat(modifiers_price)+parseFloat(this_modifier.modifier_price)).toFixed(2);
				    	}
					    i++;
					}
					var backgroundForSingleItem = '';
					if(this_item.cooking_status=='Done'){
						backgroundForSingleItem ='style="background-color:#598527;"';	
					}else if(this_item.cooking_status=='Started Cooking'){
						backgroundForSingleItem ='style="background-color:#0c5889;"';
					}
					
					draw_table_for_order += '<div '+backgroundForSingleItem+' data-order-type="'+order_type+'" data-selected="unselected" class="single_item_in_order fix floatleft" id="single_item_'+this_item.previous_id+'">';
						draw_table_for_order += '<h3 class="item_name">'+this_item.menu_name+'</h3>';
						draw_table_for_order += '<p class="modifier_name">Modifiers: '+selected_modifiers+'</p>'
						draw_table_for_order += '<p class="note">Note: '+this_item.menu_note+'</p>';
					draw_table_for_order += '</div>';
				}
				//empty order detail segment
				$("#items_holder_of_order").empty();
				//add to top
				$("#items_holder_of_order").prepend(draw_table_for_order);
			
			},
			error:function(){
				alert("error");
			}
		});

	});

	//this is to set height when site load
	window.height_should_be = parseInt($(window).height())-parseInt($('.top').height());
	$('.bottom_left').css('height',height_should_be+'px');
	$('.bottom_right').css('height',height_should_be+'px');
	//end

});
// ==================================================
$(window).on('resize', function(){
	window.height_should_be = parseInt($(window).height())-parseInt($('.top').height());
	$('.bottom_left').css('height',height_should_be+'px');
	$('.bottom_right').css('height',height_should_be+'px');
});
// =============================================
$('.all_order_holder').slimscroll({
	height: '99.5%'
}).parent().css({
	background: '#f5f5f5',
	border: '0px solid #184055'
});
$('#items_holder_of_order').slimscroll({
	height: '430px'
}).parent().css({
	background: '#f5f5f5',
	border: '0px solid #184055'
});



setInterval(function(){ 
	$.ajax({
		url:base_url+"Bar/get_new_orders_ajax",
		method:"POST",
		data:{
			csrf_test_name: $.cookie('csrf_cookie_name')
		},
		success:function(response) {
			response = JSON.parse(response);
			$order_list_left = '';
			var i = 1;
			for (var key in response) {
				// if(i==1){
					// $order_list_left += '<div class="single_order fix" style="margin-top:0px" data-selected="unselected" id="single_order_'+response[key].sales_id+'">';	
				// }else{
				var order_name = '';
				var order_type = '';
				if(response[key].order_type=='1'){
					order_name = 'A '+response[key].sale_no;
					order_type = 'Dine In'
				}else if(response[key].order_type=='2'){
					order_name = 'B '+response[key].sale_no;
					order_type = 'Take Away'
				}else if(response[key].order_type=='3'){
					order_name = 'C '+response[key].sale_no;
					order_type = 'Delivery'
				}

				var selected_unselected = ($('#selected_order_for_refreshing_help').html()==response[key].sales_id)?"selected":"unselected";
				var selected_background = ($('#selected_order_for_refreshing_help').html()==response[key].sales_id)?' style="background-color:#b6d6f6" ':'';
				var width = 100;
				var total_bar_type_items = response[key].total_bar_type_items;
				var total_bar_type_started_cooking_items = response[key].total_bar_type_started_cooking_items;
				var total_bar_type_done_items = response[key].total_bar_type_done_items;
				var splitted_width = (parseFloat(width)/parseFloat(total_bar_type_items)).toFixed(2);
				var percentage_for_started_cooking = (parseFloat(splitted_width)*parseFloat(total_bar_type_started_cooking_items)).toFixed(2);
				var percentage_for_done_cooking = (parseFloat(splitted_width)*parseFloat(total_bar_type_done_items)).toFixed(2);
				
				
				// $order_list_left += '<div class="background_order_started" style="width:'+percentage_for_started_cooking+'%"></div>';	
				// $order_list_left += '<div class="background_order_done" style="width:'+percentage_for_done_cooking+'%"></div>';	
				// }
				
				var table_name = (response[key].table_name!=null)?response[key].table_name:"";
				var waiter_name = (response[key].waiter_name!=null)?response[key].waiter_name:"";
				var customer_name = (response[key].customer_name!=null)?response[key].customer_name:"";
				var booked_time = new Date(Date.parse(response[key].date_time));
				var now = new Date();
				
				var  days = parseInt((now - booked_time) / (1000 * 60 * 60 * 24));
				var  hours = parseInt(Math.abs(now - booked_time) / (1000 * 60 * 60) % 24);
				var  minute = parseInt(Math.abs(now.getTime() - booked_time.getTime()) / (1000 * 60) % 60);
				var  second = parseInt(Math.abs(now.getTime() - booked_time.getTime()) / (1000) % 60);
				minute = minute.toString();
				second = second.toString();
				minute = (minute.length==1)?'0'+minute:minute;
				second = (second.length==1)?'0'+second:second;
				$order_list_left += '<div '+selected_background+' class="single_order fix" data-order-type="'+order_type+'" data-selected="'+selected_unselected+'" id="single_order_'+response[key].sales_id+'">';	
					$order_list_left += '<div class="inside_single_order_container fix">';
						$order_list_left += '<div class="single_order_content_holder_inside fix">';
							$order_list_left += '<p style="font-size: 18px;font-weight: bold; text-align: center;">Order Number: '+order_name+'</p>';
							$order_list_left += '<p>'+order_type+'</p>';
							$order_list_left += '<p>Table: '+table_name+'</p>';
							$order_list_left += '<p>Items: '+response[key].total_items+'</p>';
							$order_list_left += '<p>Order Time: '+booked_time.getHours()+':'+booked_time.getMinutes()+'</p>';
						$order_list_left += '</div>';
						$order_list_left += '<div class="order_condition_on_done_start">';
							$order_list_left += '<p class="order_condition_on_progress_items">Started Preparing: '+total_bar_type_started_cooking_items+'/'+total_bar_type_items+'</p>';
							$order_list_left += '<p class="order_condition_done_items">Done: '+total_bar_type_done_items+'/'+total_bar_type_items+'</p>';
						$order_list_left += '</div>';
						$order_list_left += '<div class="order_condition_on_done_start">';
							$order_list_left += '<p style="font-size:18px;">Time Count: <span id="ordered_minute_'+response[key].sales_id+'">'+minute+'</span>:<span id="ordered_second_'+response[key].sales_id+'">'+second+'</span> M</p>';
						$order_list_left += '</div>';
					$order_list_left += '</div>';
				$order_list_left += '</div>';
				i++;
			}
			$('#order_details_holder').html($order_list_left);
		},
		error:function(){
			console.log('New order refresh error');
		}
	}); 
}, 15000);

setInterval(function(){ 
	$('#order_details_holder .single_order').each(function(i, obj) {
		var order_id = $(this).attr('id').substr(13);
		var minutes = $('#ordered_minute_'+order_id).html();
		var seconds = $('#ordered_second_'+order_id).html();
		upTime($(this),minutes,seconds);
	});
}, 1000);

function upTime(object,minute,second) {
  order_id = object.attr('id').substr(13);
  if($('#ordered_minute_'+order_id).html()=='00' && $('#ordered_second_'+order_id).html()=='00'){
  	return false;
  }
  second++;
  if(second==60){
  	minute++;
  	second=0;
  }
  
  minute = minute.toString();
  second = second.toString();
  minute = (minute.length==1)?'0'+minute:minute;
  second = (second.length==1)?'0'+second:second;
  $('#ordered_minute_'+order_id).html(minute);
  $('#ordered_second_'+order_id).html(second);

  // upTime2.to=setTimeout(function(){ upTime2(object,second,minute,hour); },1000);
}