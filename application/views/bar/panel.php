<?php 
	$show_all_orders = '';
	if(count($getUnReadyOrders)>0){
		
		foreach($getUnReadyOrders as $singleOrder){
			if($singleOrder->order_type==1){
				$order_type = "Dine In";
				$order_name = "A ".$singleOrder->sale_no;
			}elseif($singleOrder->order_type==2){
				$order_type = "Take Away";
				$order_name = "B ".$singleOrder->sale_no;
			}elseif($singleOrder->order_type==3){
				$order_type = "Delivery";
				$order_name = "C ".$singleOrder->sale_no;
			}
			$to_time = strtotime(date('Y-m-d H:i:s'));
			$from_time = strtotime($singleOrder->date_time);
			$minutes = round(abs($to_time - $from_time) / 60,2);
			$seconds = abs($to_time - $from_time) % 60;
			$width = 100;
			$total_bar_type_items = $singleOrder->total_bar_type_items;
			$total_bar_type_started_cooking_items = $singleOrder->total_bar_type_started_cooking_items;
			$total_bar_type_done_items = $singleOrder->total_bar_type_done_items;
			// if($total_bar_type_items==0){
			// 	$total_bar_type_items = 1; 	
			// }
			// $splitted_width = round($width/$total_bar_type_items,2);
			
			// $percentage_for_started_cooking = round($splitted_width*$total_bar_type_started_cooking_items,2);
			// $percentage_for_done_cooking = round($splitted_width*$total_bar_type_done_items,2);

			$show_all_orders .= '<div data-order-type="'.$order_type.'" data-selected="unselected" class="single_order fix" id="single_order_'.$singleOrder->sale_id.'">';
			$show_all_orders .= '<div class="inside_single_order_container fix">';
			// $show_all_orders .= '<div class="background_order_started" style="width:'.$percentage_for_started_cooking.'%"></div>';
			// $show_all_orders .= '<div class="background_order_done" style="width:'.$percentage_for_done_cooking.'%"></div>';
			$show_all_orders .= '<div class="single_order_content_holder_inside fix">';
			$show_all_orders .= '<p style="font-size: 18px;font-weight: bold; text-align: center;">Order Number: '.$order_name.'</p>';
			$show_all_orders .= '<p>'.$order_type.'</p>';
			$show_all_orders .= '<p>Table: '.$singleOrder->table_name.'</p>';
			$show_all_orders .= '<p>Items: '.$singleOrder->total_items.'</p>';
			$show_all_orders .= '<p>Order Time: '.date('H:i',strtotime($singleOrder->date_time)).'</p>';
			
			$show_all_orders .= '</div>';
			$show_all_orders .= '<div class="order_condition_on_done_start">';
			$show_all_orders .= '<p class="order_condition_on_progress_items">Started Preparing: '.$total_bar_type_started_cooking_items.'/'.$total_bar_type_items.'</p>';
			$show_all_orders .= '<p class="order_condition_done_items">Done: '.$total_bar_type_done_items.'/'.$total_bar_type_items.'</p>';
			$show_all_orders .= '</div>';
			$show_all_orders .= '<div class="order_condition_on_done_start">';
			$show_all_orders .= '<p style="font-size:18px;">Time Count: <span id="ordered_minute_'.$singleOrder->sale_id.'">'.str_pad(round($minutes), 2, "0", STR_PAD_LEFT).'</span>:<span id="ordered_second_'.$singleOrder->sale_id.'">'.str_pad(round($seconds), 2, "0", STR_PAD_LEFT).'</span> M</p>';
			$show_all_orders .= '</div>';
			$show_all_orders .= '</div>';
			$show_all_orders .= '</div>';
		}
	}

?>
<!DOCTYPE html>
<html>
<head>
	<title>iRestora PLUS</title>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/bar_panel/css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css">
    <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/bar_panel/css/sweetalert2.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/bower_components/select2/dist/css/select2.min.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>asset/plugins/iCheck/minimal/color-scheme.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="<?php echo base_url()?>assets/bar_panel/js/jquery-3.3.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/bar_panel/js/jquery.slimscroll.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/bar_panel/js/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/bower_components/select2/dist/js/select2.full.min.js"></script>

    <base data-base="<?php echo base_url(); ?>"></base>
    <base data-collect-vat="<?php echo $this->session->userdata('collect_vat'); ?>"></base>
    <base data-currency="<?php echo $this->session->userdata('currency'); ?>"></base>
    <base data-role="<?php echo $this->session->userdata('role'); ?>"></base>

    <!-- Favicon -->
    <link rel="shortcut icon" href="<?php echo base_url(); ?>assets/images/favicon.ico" type="image/x-icon">
    <!-- Favicon -->
    <link rel="icon" href="<?php echo base_url(); ?>assets/images/favicon.ico" type="image/x-icon">
</head>
<body>
	<span style="display:none" id="selected_order_for_refreshing_help"></span>
	<div class="wrapper fix">
		<div class="top fix">
			<h1 class="main_header">Bar Panel</h1>  
			<div class="header_button_div">
				<a href="<?php echo base_url(); ?>Authentication/logOut" id="logout_button"><i class="fas fa-sign-out-alt"></i> Logout</a>
				<button id="help_button"><i class="fas fa-question-circle"></i> Help</button>
					
			</div>
			
		</div>
		<div class="bottom fix">
			<div class="bottom_left fix floatleft">
				<div class="all_order_holder" id="order_details_holder">
					<?php echo $show_all_orders; ?>

				</div>
				
			</div>
			<div class="bottom_right fix floatleft">
				<div class="bottom_right_t fix">
					<div id="items_holder_of_order">
					</div>
					
				</div>
				<div class="bottom_right_b fix">
					<button class="floatleft" id="select_all_items">Select All</button><button class="floatleft" id="deselect_all_items">Deselect All</button>
					<button class="floatleft" id="start_cooking">Start Preparing</button><button class="floatleft" id="cooking_done">Done</button>
				</div>
			</div>
		</div>
	</div>	
	
	<!-- The Modal -->
	<div id="help_modal" class="modal">

		<!-- Modal content -->
		<div class="modal-content" id="modal_help_content">
			<p class="cross_button_to_close">&times;</p>
			<!-- <img class="close_button" src="<?php echo base_url();?>assets/images/close_icon.png"> -->
			<h1 class="main_header">Help</h1>
			<p class="help_content">
				You should click on one/multiple item to mark it as Started Preparing or Done. </br>
				You can not select any item for Take Away or Delivery type orders, as you need to deliver these type of orders as a pack Blue color indicates Started Preparing, where green color indicates that the item is Done cooking. <br/> 
				Until an order is closed from POS Panel, that order will remain here
			</p>
		</div>

	</div>
	<!-- end of item modal -->

	<script type="text/javascript" src="<?php echo base_url(); ?>assets/bar_panel/js/marquee.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/bar_panel/js/custom.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/bar_panel/js/datable.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>assets/bar_panel/js/jquery.cookie.js"></script>
</body>
</html>

<!-- 



-->