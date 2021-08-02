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

<!-- <body onLoad="setTimeout('delayedRedirect()', 5000)"> -->

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

// Option Group 2
$errors .= sanitizePostTitle('option2Title', 'Please set a valid option2Title.');
$errors .= validatePostValue('option2Price', 'Please set a valid number for option2Price.');
$errors .= validatePostValue('optionGroup2Qty', 'Please set a valid number for optionGroup2Qty.');

// Option Group 3
$errors .= sanitizePostTitle('option3Title', 'Please set a valid option3Title.');
$errors .= validatePostValue('option3Price', 'Please set a valid number for option3Price.');
$errors .= validatePostValue('optionGroup3Qty', 'Please set a valid number for optionGroup3Qty.');

// Option Group 4
$errors .= sanitizePostTitle('option4Title', 'Please set a valid option4Title.');
$errors .= validatePostValue('option4Price', 'Please set a valid number for option4Price.');
$errors .= validatePostValue('optionGroup4Qty', 'Please set a valid number for optionGroup4Qty.');

// Option Group 3
$errors .= sanitizePostTitle('option5Title', 'Please set a valid option5Title.');
$errors .= validatePostValue('option5Price', 'Please set a valid number for option5Price.');
$errors .= validatePostValue('optionGroup5Qty', 'Please set a valid number for optionGroup5Qty.');


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

	// var_dump($_POST);

	/* Order Generation
	==================================== */
	
	// Header Settings	
	$order->setLogo('phpinvoice/templates/purple/logo.png');	
	$order->setReference('ORDER-'.$timestamp);
	$order->setDate(date('M dS, Y',time()));

	$order->setFrom(array($seller_name, $seller_address));
	$order->setTo(array($customer_name, $customer_address));
	
	// Adding Items (name, description, amount, vat, price, discount) only if selected
	if (isset($_POST['option1Single'])) {
		$selected_option1_title = $_POST['option1Title'];
		$selected_option1_price = $_POST['option1Single'];	
		$option1_qty = $_POST['optionGroup1Qty'];
		$week1 = $_POST['optionGroup1List'];
		$order->addItem($selected_option1_title, '', $option1_qty, "0%", $selected_option1_price, false, $week1);
	}
	if (isset($_POST['option2Single'])) {
		$selected_option2_title = $_POST['option2Title'];
		$selected_option2_price = $_POST['option2Single'];
		$option2_qty = $_POST['optionGroup2Qty'];	
		$week2 = $_POST['optionGroup2List'];
		$order->addItem($selected_option2_title, '', $option2_qty, "0%", $selected_option2_price, false, $week2);
	}
	if (isset($_POST['option3Single'])) {
		$selected_option3_title = $_POST['option3Title'];
		$selected_option3_price = $_POST['option3Single'];
		$option3_qty = $_POST['optionGroup3Qty'];	
		$week3 = $_POST['optionGroup3List'];
		$order->addItem($selected_option3_title, '', $option3_qty, "0%", $selected_option3_price, false, $week3);
	}	
	if (isset($_POST['option4Single'])) {
		$selected_option4_title = $_POST['option4Title'];
		$selected_option4_price = $_POST['option4Single'];
		$option4_qty = $_POST['optionGroup4Qty'];	
		$week4 = $_POST['optionGroup4List'];
		$order->addItem($selected_option4_title, '', $option4_qty, "0%", $selected_option4_price, false, $week4);
	}	
	if (isset($_POST['option5Single'])) {
		$selected_option5_title = $_POST['option5Title'];
		$selected_option5_price = $_POST['option5Single'];
		$option5_qty = $_POST['optionGroup5Qty'];	
		$week5 = $_POST['optionGroup5List'];
		$order->addItem($selected_option5_title, '', $option5_qty, "0%", $selected_option5_price, false, $week5);
	}	

	// Add Totals	
	$order->addTotal("Total", $order->items_total);  	  	

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
		$mail->setFrom('hw.jammy616@outlook.com', 'Costy');

		// Set Reply-to Address	
		$mail->addReplyTo('lixiangde888@gmail.com', 'Costy');

		// Set Recipients	
		$mail->addAddress('websolutions.ultimate@gmail.com', 'Ultimate Websolutions');
		// $mail->addAddress($customer_mail, $customer_name_formatted);

		$mail->addAddress("teresed85n@gmail.com", "Alexandr T");
		
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