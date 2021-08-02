<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Cost Calculator and Order Wizard">
	<meta name="author" content="UWS">
	<title>COSTY | Cost Calculator and Order Wizard</title>

	<!-- Favicon -->
	<link href="../img/favicon.png" rel="shortcut icon">

	<!-- Google Fonts - Poppins, Karla -->
	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Karla:300,400,500,600,700" rel="stylesheet">

	<!-- Font Awesome CSS -->
	<link href="../vendor/fontawesome/css/all.min.css" rel="stylesheet">

	<!-- Custom Font Icons -->
	<link href="../vendor/icomoon/css/iconfont.min.css" rel="stylesheet">

	<!-- Vendor CSS -->
	<link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="../vendor/animate/css/animate.min.css" rel="stylesheet">
	<link href="../vendor/dmenu/css/menu.css" rel="stylesheet">
	<link href="../vendor/hamburgers/css/hamburgers.min.css" rel="stylesheet">
	<link href="../vendor/mmenu/css/mmenu.min.css" rel="stylesheet">
	<link href="../vendor/range-slider/css/ion.rangeSlider.css" rel="stylesheet">
	<link href="../vendor/magnific-popup/css/magnific-popup.css" rel="stylesheet">
	<link href="../vendor/float-labels/css/float-labels.min.css" rel="stylesheet">

	<!-- Main CSS -->
	<link href="../css/style.css" rel="stylesheet">

</head>

<body onLoad="setTimeout('delayedRedirect()', 5000)">

<?php

/* Setup PHPMailer
==================================== */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php'; 

$mail = new PHPMailer(true);

/* Setup
==================================== */

require 'phpinvoice/phpinvoice.php';

$order = new phpinvoice('purple','A4', '$'); // Put '&euro;' or 'CHF' etc. instead of '$'

$timestamp = time();
$default_option = 'Select';
$errors = '';

// Setup Seller Details
$seller_name = 'Seller Name';
$seller_address = '123 Juanita Ave, Glendora, CA 91740, USA';
$seller_notice = 'Contact data';
$seller_company_name = 'Your Company';

/* Validate User Inputs
==================================== */

// Name 
if ($_POST['username'] != '') {
	
	// Sanitizing
	$_POST['username'] = filter_var($_POST['username'], FILTER_SANITIZE_STRING);

	if ($_POST['username'] == '') {
		$errors .= 'Please enter a valid name.<br/>';
	}
}
else { 
	// Required to fill
	$errors .= 'Please enter your name.<br/>';
}

// Email 
if ($_POST['email'] != '') {

	// Sanitizing 
	$_POST['email'] = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

	// After sanitization validation is performed
	$_POST['email'] = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
	
	if($_POST['email'] == '') {
		$errors .= 'Please enter a valid email address.<br/>';
	}
}
else {
	// Required to fill
	$errors .= 'Please enter your email address.<br/>';
}

// Phone 
if ($_POST['phone'] != '') {

	// Sanitizing
	$_POST['phone'] = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);

	// After sanitization validation is performed
	$pattern_phone = array('options'=>array('regexp'=>'/^\+{1}[0-9]+$/'));
	$_POST['phone'] = filter_var($_POST['phone'], FILTER_VALIDATE_REGEXP, $pattern_phone);
	
	if($_POST['phone'] == '') {
		$errors .= 'Please enter a valid phone number like: +363012345<br/>';
	}
}

// Address
if ($_POST['address'] != '') {

	// Sanitizing
	$_POST['address'] = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
	
	if($_POST['address'] == '') {
		$errors .= 'Please enter a valid address.<br/>';
	}
}

// Message
if ($_POST['message'] != '') {

	// Sanitizing
	$_POST['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
	
	if($_POST['message'] == '') {
		$errors .= 'Please enter a valid message.<br/>';
	}
}

/* Validate Hidden Inputs
==================================== */

function sanitizePostTitle($postName, $invalidMessage) {
	
	if ($_POST[$postName] != '') {
		
		// Sanitizing
	  	$_POST[$postName] = filter_var($_POST[$postName], FILTER_SANITIZE_STRING);
		  
		if ($_POST[$postName] == '') {
			return $invalidMessage . '<br/>';
	  	}

	}
	return '';
}

function validatePostValue($postValue, $invalidMessage) {

	if ($_POST[$postValue] != '') {

		// Sanitizing
		$_POST[$postValue] = filter_var($_POST[$postValue], FILTER_SANITIZE_STRING);		

		// After sanitization validation is performed
		if ($_POST[$postValue] != '0') {
			$_POST[$postValue] = filter_var($_POST[$postValue], FILTER_VALIDATE_FLOAT);
		}		

		if ($_POST[$postValue] == '') {
			return $invalidMessage . '<br/>';
		}

	}	
	return '';
}

function validatePostTotal($postValue, $invalidMessage) {

	if ($_POST[$postValue] != '') {
		
		if (!filter_var($_POST[$postValue], FILTER_VALIDATE_FLOAT)) {			
			return $invalidMessage . '<br/>';
		}

	}	
	return '';
}

// Option Group 1
$errors .= sanitizePostTitle('option1Title', 'Please set a valid option1Title.');
$errors .= validatePostValue('option1Price', 'Please set a valid number for option1Price.');
$errors .= validatePostValue('optionGroup1Qty', 'Please set a valid number for optionGroup1Qty.');

// Continue if NO errors found after validation
if (!$errors) {

	// Customer Details
	$customer_name = $_POST['username'];
	$customer_mail = $_POST['email'];
	$customer_phone = $_POST['phone'];
	$customer_address = $_POST['address'];	
	$customer_message = $_POST['message'];
	
	// Handle empty customer inputs
	if (empty($customer_phone)) {
		$customer_phone = 'Was not provided.';
	}
	if (empty($customer_address)) {
		$customer_address = 'Address: was not provided.';
	}
	if (empty($customer_message)) {
		$customer_message = 'Was not provided.';
	}

	// Option Group 1
	$selected_option1_title = $_POST['option1Title'];
	$selected_option1_price = $_POST['option1Price'];
	$option1_qty = $_POST['optionGroup1Qty'];		

	/* Order Generation
	==================================== */
	
	// Header Settings	
	$order->setLogo('phpinvoice/templates/purple/logo.png');	
	$order->setReference('ORDER-'.$timestamp);
	$order->setDate(date('M dS, Y',time()));

	$order->setFrom(array($seller_name, $seller_address));
	$order->setTo(array($customer_name, $customer_address));

	// Adding Items (name, description, amount, vat, price, discount) only if selected
	if ($selected_option1_title !== $default_option) {
		$order->addItem($selected_option1_title, '', $option1_qty, '0%', $selected_option1_price, false);
	}	

	// Add Totals	
	$order->addTotal('Total', $order->items_total);

	// Add Title
	$order->addTitle($seller_notice);

	// Add Paragraph
	$order->addParagraph('Email: ' . $customer_mail);
	$order->addParagraph('Phone: ' . $customer_phone . '<br/><br />');
	$order->addParagraph('<strong>Message:</strong> ' . '<br />' . $customer_message);

	// Set Footer Note
	$order->setFooternote('Created with <a href="https://ultimatewebsolutions.net/costy/" target="_blank">Costy 2.0</a>');

	// Render
	$order->render('phpinvoice/pdf/order_' . $timestamp . '.pdf','F');

	/* Mail Sending
	==================================== */
	
	try {    

		// Set Sender	
		$mail->setFrom('noreply@yourdomain.com', 'Costy');

		// Set Reply-to Address	
		$mail->addReplyTo('replyto@yourdomain.com', 'Costy');

		// Set Recipients	
		$mail->addAddress('websolutions.ultimate@gmail.com', 'Ultimate Websolutions');
		$mail->addAddress($customer_mail, $customer_name_formatted);

		// Set Subject
		$mail->Subject = 'Order Request from Costy';

		// Get HTML Mail Template
		$email_html = file_get_contents('phpmailer/email.html');

		// Set HTML Content	
		$body = str_replace(array('customerName'), array($customer_name), $email_html);
		$mail->MsgHTML($body);	
		
		// Attach Invoice
		$file = 'phpinvoice/pdf/order_' . $timestamp . '.pdf';
		$mail->addAttachment($file);
		
		$mail->send();

	} catch (Exception $e) {

		echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;

	} finally { // Clean Up

		$files = glob('phpinvoice/pdf/*');

		foreach($files as $file) {
			if(is_file($file))
			unlink($file);
		}
	}
	
	// Success Page
	echo '<div id="success">';
    echo '<div class="icon icon-order-success svg">';
    echo '<svg width="72px" height="72px">';
    echo '<g fill="none" stroke="#02b843" stroke-width="2">';
    echo '<circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>';
	echo '<path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>';
    echo '</g>';
	echo '</svg>';
	echo '</div>';    
	echo '<h4>Thank you for your order.</h4>';
	echo '<small>Check your mailbox.</small>';
	echo '</div>';
	echo '<script src="../js/redirect.js"></script>';

} else {

	// Error Page
	echo '<div style="color: #e9431c">' . $errors . '</div>';
	echo '<div id="success">';    
	echo '<h4>Something went wrong.</h4>';
	echo '<a class="animated-link" href="../index.html">Go Back</small>';
	echo '</div>';

}

?>
<!-- END PHP -->

</body>
</html>