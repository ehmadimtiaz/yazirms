
<style type="text/css">
    .required_star{
        color: #dd4b39;
    }

    .radio_button_problem{
        margin-bottom: 19px;
    }
</style>  

<section class="content-header">
    <h1>
        Send <?php echo ucfirst($type); ?> SMS
    </h1>  
</section>

<section class="content">
    <div class="row">
        <!-- left column -->
        <div class="col-md-12">
            <!-- general form elements -->
            <div class="box box-primary">

                <!-- /.box-header -->
                <!-- form start -->
                <?php echo form_open(base_url('Short_message_service/sendSMS/'.$type)); ?>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-6">

                            <div class="form-group">
                                <label>Outlet Name <span class="required_star">*</span></label>
                                <input tabindex="1" type="text" name="outlet_name" class="form-control" placeholder="Outlet Name" value="<?php echo $outlet_name; ?>">
                            </div>
                            <?php if (form_error('outlet_name')) { ?>
                                <div class="alert alert-error" style="padding: 5px !important;">
                                    <p><?php echo form_error('outlet_name'); ?></p>
                                </div>
                            <?php } ?>
                            
                            <?php if($type == "test"){?>
                                <div class="form-group">
                                    <label>Number <span class="required_star">*</span></label><small> Must include country code, otherwise sms will fail</small>
                                    <input tabindex="1" type="text" name="number" class="form-control" placeholder="Number" >
                                </div>
                                <?php if (form_error('number')) { ?>
                                    <div class="alert alert-error" style="padding: 5px !important;">
                                        <p><?php echo form_error('number'); ?></p>
                                    </div>
                                <?php } ?>
                            <?php } ?>

                            <div class="form-group">
                                <label>Message <span class="required_star">*</span></label> 
                                <textarea tabindex="5" class="form-control" rows="4" name="message" placeholder="Enter ..."><?php echo $message; ?></textarea>
                            </div>
                            <?php if (form_error('message')) { ?>
                                <div class="alert alert-error" style="padding: 5px !important;">
                                    <p><?php echo form_error('message'); ?></p>
                                </div>
                            <?php } ?>

                            <?php if($type == 'birthday' || $type == 'anniversary'){?>
                                <div class="form-group">
                                    There are <b><?php echo count($sms_count); ?></b> customer has <?php echo $type; ?> today.
                                </div> 
                            <?php } ?>

                            <?php if($type == 'custom'){?>
                                <div class="form-group">
                                    Only <b><?php echo count($sms_count); ?></b> customer has valid phone number, you can send sms to these customers.
                                </div> 
                            <?php } ?>

                            <div class="form-group">
                                Your Current Credit Balance <label><b><?php echo $balance;?></b></label> 
                                Please make sure that your current balance is sufficient to send sms.
                            </div>  
                            

                        </div> 
                    </div> 
                    <!-- /.box-body --> 
                </div>
                <div class="box-footer">
                    <button type="submit" name="submit" value="submit" class="btn btn-primary">Submit</button>
                    <a href="<?php echo base_url() ?>Short_message_service/smsService"><button type="button" class="btn btn-primary">Back</button></a>
                </div>
                <?php echo form_close(); ?>
            </div>
        </div>
</section>