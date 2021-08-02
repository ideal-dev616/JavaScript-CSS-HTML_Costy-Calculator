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

/* Setup
==================================== */

$timestamp = time();
$default_option = 'Select';
$currency = '$ ';
$errors = '';

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

// Extra Option 1
$errors .= sanitizePostTitle('extraOption1Title', 'Please set a valid extraOption1Title.');
$errors .= validatePostValue('extraOption1', 'Please set a valid number for extraOption1.');

// Extra Option 2
$errors .= sanitizePostTitle('extraOption2Title', 'Please set a valid extraOption2Title.');
$errors .= validatePostValue('extraOption2', 'Please set a valid number for extraOption2.');

// Total Due
$errors .= validatePostTotal('totalDue', 'Total should be a valid number.');

// Continue if NO errors found after validation
if (!$errors) {	

	// Customer Details
	$customer_name = $_POST['username'];
	$customer_mail = $_POST['email'];
	$customer_phone = $_POST['phone'];
	$customer_address = $_POST['address'];	
	$customer_message = $_POST['message'];	

	// Option Group 1
	$selected_option1_title = $_POST['option1Title'];
	$selected_option1_price = $_POST['option1Price'];
	$option1_qty = $_POST['optionGroup1Qty'];
	$optionGroup1Sum = $selected_option1_price * $option1_qty;

	// Option Group 2
	$selected_option2_title = $_POST['option2Title'];
	$selected_option2_price = $_POST['option2Price'];
	$option2_qty = $_POST['optionGroup2Qty'];
	$optionGroup2Sum = $selected_option2_price * $option2_qty;

	// Option Group 3
	$selected_option3_title = $_POST['option3Title'];
	$selected_option3_price = $_POST['option3Price'];
	$option3_qty = $_POST['optionGroup3Qty'];
	$optionGroup3Sum = $selected_option3_price * $option3_qty;

	// Extra Option 1
	$extra_option_1 = $_POST['extraOption1'];
	$extra_option_1_title = $_POST['extraOption1Title'];

	// Extra Option 2
	$extra_option_2 = $_POST['extraOption2'];
	$extra_option_2_title = $_POST['extraOption2Title'];

	// Total Due
	$total = $_POST['totalDue'];

	/* Order Generation
	==================================== */

	// Adding Items
	if ($selected_option1_title !== $default_option) {
		$order .= $selected_option1_title . ' x ' . $option1_qty . ' x ' . $currency . number_format($selected_option1_price, 2, '.',',') . ' = ' . $currency . number_format($optionGroup1Sum, 2, '.',',') . "\n";
	}
	if ($selected_option2_title !== $default_option) {
		$order .= $selected_option2_title . ' x ' . $option2_qty . ' x ' . $currency . number_format($selected_option2_price, 2, '.',',') . ' = ' . $currency . number_format($optionGroup2Sum, 2, '.',',') . "\n";
	}
	if ($selected_option3_title !== $default_option) {
		$order .= $selected_option3_title . ' x ' . $option3_qty . ' x ' . $currency . number_format($selected_option3_price, 2, '.',',') . ' = ' . $currency . number_format($optionGroup3Sum, 2, '.',',') . "\n";
	}
	
	// Adding Extra Items
	if (isset($extra_option_1)) {
		$order .= $extra_option_1_title . ' x ' . '1' . ' x ' . $currency . number_format($extra_option_1, 2, '.',',') . ' = ' . $currency . number_format($extra_option_1, 2, '.',',') . "\n";
	}
	if (isset($extra_option_2)) {
		$order .= $extra_option_2_title . ' x ' . '1' . ' x ' . $currency . number_format($extra_option_2, 2, '.',',') . ' = ' . $currency . number_format($extra_option_2, 2, '.',',') . "\n";
	}

	// Adding Total 
	$order .= "\n" . "Total: " . $currency . number_format($total, 2, '.',',');

	// Handle empty customer inputs
	if (empty($customer_phone)) {
		$customer_phone = 'Was not provided.';
	}
	if (empty($customer_address)) {
		$customer_address = 'Was not provided.';
	}
	if (empty($customer_message)) {
		$customer_message = 'Was not provided.';
	}

	/* Mail Sending
	==================================== */

	// Setup for site owner
	$to = "websolutions.ultimate@gmail.com"; // Your email goes here	
	$subject = "Order request";
	$headers = "From: Costy <replyto@yourdomain.com>";	
	$message = "Order request is arrived with the details below. Order ID: " . $timestamp . ". " . "\n\n";
	$message .= "CONTACT DATA" . "\n";
	$message .= "--\n";
	$message .= "Name: " . $customer_name . "\n";
	$message .= "Email: " . $customer_mail . "\n";
	$message .= "Phone: " . $customer_phone . "\n";
	$message .= "Address: " . $customer_address . "\n";
	$message .= "Message: " . $customer_message . "\n\n";	
	$message .= "ORDER SUMMARY" . "\n";
	$message .= "--\n";
	$message .= $order;
												
	// Send to site owner
	mail($to, $subject, $message, $headers);
	
	// Setup for the user
	$user = $_POST['email'];
	$usersubject = "Order confirmation";
	$usermessage = "Dear " . $customer_name . "," . "\n\n" . "Thank you for your request. Your order ID is: " . $timestamp . ". " . "Please find the summary below." . "\n\n";	
	$usermessage .= "ORDER SUMMARY" . "\n";
	$usermessage .= "--\n";
	$usermessage .= $order;

	// Send to the user
	mail($user, $usersubject, $usermessage, $headers);

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
	echo '<h4>Thank you for contacting us.</h4>';
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