(function ($) {

	"use strict";

	// =====================================================
	//      PRELOADER
	// =====================================================
	$(window).on("load", function () {
		'use strict';
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		var $hero = $('.hero-home .content');
		var $hero_v = $('#hero_video .content ');
		$hero.find('h3, p, form').addClass('fadeInUp animated');
		$hero.find('.btn-1').addClass('fadeIn animated');
		$hero_v.find('.h3, p, form').addClass('fadeInUp animated');
		$(window).scroll();
	})

	// =====================================================
	//      BACK TO TOP BUTTON
	// =====================================================
	function scrollToTop() {
		$('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
	}

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			$('#toTop').fadeIn('slow');
		} else {
			$('#toTop').fadeOut('slow');
		}
	});

	$('#toTop').on('click', function () {
		scrollToTop();
		return false;
	});

	// =====================================================
	//      NAVBAR
	// =====================================================
	$(window).on('scroll load', function () {

		if ($(window).scrollTop() >= 1) {
			$('.main-header').addClass('active');
		} else {
			$('.main-header').removeClass('active');
		}

	});

	// =====================================================
	//      STICKY SIDEBAR SETUP
	// =====================================================
	$('#mainContent, #sidebar').theiaStickySidebar({
		additionalMarginTop: 90
	});

	// =====================================================
	//      MOBILE MENU
	// =====================================================	
	var $menu = $("nav#menu").mmenu({
		"extensions": ["pagedim-black", "theme-dark"], // "theme-dark" can be changed to: "theme-white"
		counters: true,
		keyboardNavigation: {
			enable: true,
			enhance: true
		},
		navbar: {
			title: 'MENU'
		},
		navbars: [{ position: 'bottom', content: ['<a href="#">© 2021 Costy</a>'] }]
	},
		{
			// configuration
			clone: true,
		});
	var $icon = $("#hamburger");
	var API = $menu.data("mmenu");
	$icon.on("click", function () {
		API.open();
	});
	API.bind("open:finish", function () {
		setTimeout(function () {
			$icon.addClass("is-active");
		}, 100);
	});
	API.bind("close:finish", function () {
		setTimeout(function () {
			$icon.removeClass("is-active");
		}, 100);
	});

	// =====================================================
	//      FAQ NICE SCROLL

	// Init =====================================================		
	$('select').niceSelect();

	// =====================================================
	var position;

	$('a.nice-scroll-faq').on('click', function (e) {
		e.preventDefault();
		position = $($(this).attr('href')).offset().top - 125;
		$('body, html').animate({
			scrollTop: position
		}, 500, 'easeInOutExpo');
	});

	$('ul#faqNav li a').on('click', function () {
		$('ul#faqNav li a.active').removeClass('active');
		$(this).addClass('active');
	});

	// =====================================================
	//      FAQ ACCORDION
	// =====================================================
	function toggleChevron(e) {
		$(e.target).prev('.card-header').find('i.indicator').toggleClass('icon-minus icon-plus');
	}
	$('.faq-accordion').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

	// =====================================================
	//      GALLERY
	// =====================================================
	// Single Image
	$('#openImage1').magnificPopup({
		items: {
			src: 'img/gallery/1.jpg',
			title: 'Image related to Option Single 1'
		},
		type: 'image',
		fixedContentPos: false,
	});

	$('#openSimpleMailSummaryImage').magnificPopup({
		items: {
			src: 'img/presentation/simple-mail-summary.jpg',
			title: 'Simple Mail Summary'
		},
		type: 'image',
		fixedContentPos: false,
	});

	// Single Video
	$('#openVideo1').magnificPopup({
		items: {
			src: 'https://vimeo.com/158520582'
		},
		type: 'iframe',
		fixedContentPos: false,
	});

	// Image Gallery
	$('#openGallery1').magnificPopup({
		items: [
			{
				src: 'img/gallery/1.jpg',
				title: 'Image related to Option 1.1'
			},
			{
				src: 'img/gallery/2.jpg',
				title: 'Image related to Option 1.2'
			},
			{
				src: 'img/gallery/3.jpg',
				title: 'Image related to Option 1.3'
			}
		],
		gallery: {
			enabled: true
		},
		type: 'image',
		fixedContentPos: false,
	});

	// =====================================================
	//      CALCULATOR ELEMENTS
	// =====================================================	

	// Function to format item prices usign priceFormat plugin
	function formatItemPrice() {
		$('.price').priceFormat({
			prefix: '$ ',
			centsSeparator: '.',
			thousandsSeparator: ','
		});
	}

	// Function to format total price usign priceFormat plugin
	function formatTotalPrice() {
		$('#total').priceFormat({
			prefix: '$ ',
			centsSeparator: '.',
			thousandsSeparator: ','
		});
	}

	// Function to set total title and price initially
	function setTotalOnStart() {

		$('#totalTitle').val('Total');
		$('#total').val('$ 0.00');

	}

	// Variables for calculation
	var singleOption1IsChecked = false;
	var singleOption1Title = '';
	var singleOption1Price = 0;
	var actualQty1 = 0;
	var subSum1 = 0;
	var duration1 = 0;

	var singleOption2IsChecked = false;
	var singleOption2Title = '';
	var singleOption2Price = 0;
	var actualQty2 = 0;
	var subSum2 = 0;
	var duration2 = 0;

	var singleOption3IsChecked = false;
	var singleOption3Title = '';
	var singleOption3Price = 0;
	var actualQty3 = 0;
	var subSum3 = 0;
	var duration3 = 0;

	var singleOption4IsChecked = false;
	var singleOption4Title = '';
	var singleOption4Price = 0;
	var actualQty4 = 0;
	var subSum4 = 0;
	var duration4 = 0;

	var singleOption5IsChecked = false;
	var singleOption5Title = '';
	var singleOption5Price = 0;
	var actualQty5 = 0;
	var subSum5 = 0;
	var duration5 = 0;

	var total = 0;

	// Function to manage the calculations and update summary
	function updateSummary() {
		console.log("Yes");
		// Get the current data from option1Single elements
		singleOption1IsChecked = $('#option1Single').is(':checked');
		singleOption1Title = $('#option1SingleTitle').text();
		singleOption1Price = $('#option1Single').val();
		actualQty1 = $('#option1SingleQty').val();
		duration1 = $('#duration1').val();

		// Update order summary with option1Single details
		if (singleOption1IsChecked && (actualQty1 != 0)) {
			console.log("true");
			subSum1 = (singleOption1Price * 1) * (actualQty1 * 1) * duration1;
			$('#option1SingleSum').html('<a href="javascript:;" id="option1SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption1Title + ' x ' + actualQty1 + ' x ' + duration1 + '<span class="price">' + subSum1.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked
			console.log("false");
			subSum1 = 0;
			clearSummaryLine('option1SingleSum');

		}

		// Get the current data from option2Single elements		
		singleOption2IsChecked = $('#option2Single').is(':checked');
		singleOption2Title = $('#option2SingleTitle').text();
		singleOption2Price = $('#option2Single').val();
		actualQty2 = $('#option2SingleQty').val();
		duration2 = $('#duration2').val();

		// Update order summary with option2Single details
		if (singleOption2IsChecked && (actualQty2 != 0)) {

			subSum2 = (singleOption2Price * 1) * (actualQty2 * 1) * duration2;
			$('#option2SingleSum').html('<a href="javascript:;" id="option2SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption2Title + ' x ' + actualQty2 + ' x ' + duration2 + '<span class="price">' + subSum2.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum2 = 0;
			clearSummaryLine('option2SingleSum');

		}

		// Get the current data from option3Single elements
		singleOption3IsChecked = $('#option3Single').is(':checked');
		singleOption3Title = $('#option3SingleTitle').text();
		singleOption3Price = $('#option3Single').val();
		actualQty3 = $('#option3SingleQty').val();
		duration3 = $('#duration3').val();

		// Update order summary with option3Single details
		if (singleOption3IsChecked && (actualQty3 != 0)) {

			subSum3 = (singleOption3Price * 1) * (actualQty3 * 1) * duration3;
			$('#option3SingleSum').html('<a href="javascript:;" id="option3SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption3Title + ' x ' + actualQty3 + ' x ' + duration3 + '<span class="price">' + subSum3.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum3 = 0;
			clearSummaryLine('option3SingleSum');

		}

		// Get the current data from option4Single elements
		singleOption4IsChecked = $('#option4Single').is(':checked');
		singleOption4Title = $('#option4SingleTitle').text();
		singleOption4Price = $('#option4Single').val();
		actualQty4 = $('#option4SingleQty').val();
		duration4 = $('#duration4').val();

		// Update order summary with option3Single details
		if (singleOption4IsChecked && (actualQty4 != 0)) {

			subSum4 = (singleOption4Price * 1) * (actualQty4 * 1) * duration4;
			$('#option4SingleSum').html('<a href="javascript:;" id="option4SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption4Title + ' x ' + actualQty4 + ' x ' + duration4 + '<span class="price">' + subSum4.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum4 = 0;
			clearSummaryLine('option4SingleSum');

		}

		// Get the current data from option5Single elements
		singleOption5IsChecked = $('#option5Single').is(':checked');
		singleOption5Title = $('#option5SingleTitle').text();
		singleOption5Price = $('#option5Single').val();
		actualQty5 = $('#option5SingleQty').val();
		duration5 = $('#duration5').val();

		// Update order summary with option3Single details
		if (singleOption5IsChecked && (actualQty5 != 0)) {

			subSum5 = (singleOption5Price * 1) * (actualQty5 * 1) * duration5;
			$('#option5SingleSum').html('<a href="javascript:;" id="option5SingleSumReset"><i class="fa fa-times-circle"></i></a> ' + singleOption5Title + ' x ' + actualQty5 + ' x ' + duration5 + '<span class="price">' + subSum5.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			subSum5 = 0;
			clearSummaryLine('option5SingleSum');

		}
		
		// Update total in order summary		
		total = subSum1 + subSum2 + subSum3 + subSum4 + subSum5;
		$('#total').val(total.toFixed(2));
		formatTotalPrice();

	}

	// Function to save actual values with updating the hidden fields
	function saveState() {

		// Update hidden fields with option1Single details
		$('#option1Title').val(singleOption1Title);
		$('#option1Price').val(singleOption1Price);
		$('#subSum1').val(subSum1);

		// Update hidden fields with option2Single details
		$('#option2Title').val(singleOption2Title);
		$('#option2Price').val(singleOption2Price);
		$('#subSum2').val(subSum2);

		// Update hidden fields with option3Single details		
		$('#option3Title').val(singleOption3Title);
		$('#option3Price').val(singleOption3Price);
		$('#subSum3').val(subSum3);

		// Update hidden fields with option4Single details		
		$('#option4Title').val(singleOption4Title);
		$('#option4Price').val(singleOption4Price);
		$('#subSum4').val(subSum4);

		// Update hidden fields with option5Single details		
		$('#option5Title').val(singleOption5Title);
		$('#option5Price').val(singleOption5Price);
		$('#subSum5').val(subSum3);

		// Update hidden field total
		$('#totalDue').val(total);

	}

	// Function to clear line in order summary
	function clearSummaryLine(summaryLineName) {

		if (summaryLineName == 'all') {
			$('#option1SingleSum').html('');
			$('#option2SingleSum').html('');
			$('#option3SingleSum').html('');
			$('#option4SingleSum').html('');
			$('#option5SingleSum').html('');
		}
		if (summaryLineName == 'option1SingleSum') {
			$('#option1SingleSum').html('');
		}
		if (summaryLineName == 'option2SingleSum') {
			$('#option2SingleSum').html('');
		}
		if (summaryLineName == 'option3SingleSum') {
			$('#option3SingleSum').html('');
		}
		if (summaryLineName == 'option4SingleSum') {
			$('#option4SingleSum').html('');
		}
		if (summaryLineName == 'option5SingleSum') {
			$('#option5SingleSum').html('');
		}

	}

	// Function to activate a given checkbox
	function activateSingleOption(singleOptionName) {

		if (singleOptionName == 'option1Single') {
			$('#option1Single').prop('checked', true);
		}
		if (singleOptionName == 'option2Single') {
			$('#option2Single').prop('checked', true);
		}
		if (singleOptionName == 'option3Single') {
			$('#option3Single').prop('checked', true);
		}
		if (singleOptionName == 'option4Single') {
			$('#option4Single').prop('checked', true);
		}
		if (singleOptionName == 'option5Single') {
			$('#option5Single').prop('checked', true);
		}
	}

	// Function to reset the given checkbox
	function resetCheckbox(optionName) {

		if (optionName == 'all') {
			$('#option1Single').prop('checked', false);
			$('#option2Single').prop('checked', false);
			$('#option3Single').prop('checked', false);
			$('#option4Single').prop('checked', false);
			$('#option5Single').prop('checked', false);
		}
		if (optionName == 'option1Single') {
			$('#option1Single').prop('checked', false);
		}
		if (optionName == 'option2Single') {
			$('#option2Single').prop('checked', false);
		}
		if (optionName == 'option3Single') {
			$('#option3Single').prop('checked', false);
		}
		if (optionName == 'option4Single') {
			$('#option4Single').prop('checked', false);
		}
		if (optionName == 'option5Single') {
			$('#option5Single').prop('checked', false);
		}

	}

	// Function to re-validate total price
	function reValidateTotal() {

		$('#total').parsley().validate();
	}

	// Set total title and price initially
	setTotalOnStart();

	// When option1Single is clicked
	$('#option1Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When option2Single is clicked
	$('#option2Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When option3Single is clicked
	$('#option3Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When option4Single is clicked
	$('#option4Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When option5Single is clicked
	$('#option5Single').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Duration Select is changed
	$('#duration1').on('change', function () {
		if (!singleOption1IsChecked) {
			activateSingleOption('option1Single');
		}
		updateSummary();
		saveState();
		reValidateTotal();
	});

	$('#duration2').on('change', function () {
		if (!singleOption2IsChecked) {
			activateSingleOption('option2Single');
		}
		updateSummary();
		saveState();
		reValidateTotal();
	});

	$('#duration3').on('change', function () {
		if (!singleOption3IsChecked) {
			activateSingleOption('option3Single');
		}
		updateSummary();
		saveState();
		reValidateTotal();
	});

	$('#duration4').on('change', function () {
		if (!singleOption4IsChecked) {
			activateSingleOption('option4Single');
		}
		updateSummary();
		saveState();
		reValidateTotal();
	});

	$('#duration5').on('change', function () {
		if (!singleOption5IsChecked) {
			activateSingleOption('option5Single');
		}
		updateSummary();
		saveState();
		reValidateTotal();
	});
	// ---------------------------------------------

	// Delete line 1 in summary list
	$('#option1SingleSum').delegate('#option1SingleSumReset', 'click', function () {
		clearSummaryLine('option1SingleSum');
		resetCheckbox('option1Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 2 in summary list
	$('#option2SingleSum').delegate('#option2SingleSumReset', 'click', function () {
		clearSummaryLine('option2SingleSum');
		resetCheckbox('option2Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 3 in summary list
	$('#option3SingleSum').delegate('#option3SingleSumReset', 'click', function () {
		clearSummaryLine('option3SingleSum');
		resetCheckbox('option3Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 4 in summary list
	$('#option4SingleSum').delegate('#option4SingleSumReset', 'click', function () {
		clearSummaryLine('option4SingleSum');
		resetCheckbox('option4Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 5 in summary list
	$('#option5SingleSum').delegate('#option5SingleSumReset', 'click', function () {
		clearSummaryLine('option5SingleSum');
		resetCheckbox('option5Single');
		updateSummary();
		saveState();
		reValidateTotal();
	});


	// If reset is clicked, set the selected item to default	
	$('#resetBtn').on('click', function () {
		clearSummaryLine('all');
		resetCheckbox('all');
		updateSummary();
		scrollToTop();
	});

	// =====================================================
	//      RANGE SLIDER 1
	// =====================================================	
	var $range = $('#option1SingleRangeSlider'),
		$input = $('#option1SingleQty'),
		instance,
		min = 1,
		max = 100;

	$range.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min,
		max: max,
		from: 50,
		hide_min_max: true,
		onStart: function (data) {
			$input.prop('value', data.from);
		},
		onChange: function (data) {
			$input.prop('value', data.from);
			if (!singleOption1IsChecked) {
				activateSingleOption('option1Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance = $range.data("ionRangeSlider");

	$input.on('input', function () {
		var val = $(this).prop('value');

		// Validate
		if (val < min) {
			val = min;
			$input.val(min);
		} else if (val > max) {
			val = max;
			$input.val(max);
		}

		instance.update({
			from: val
		});

		if (!singleOption1IsChecked) {
			activateSingleOption('option1Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================
	//      RANGE SLIDER 2
	// =====================================================	
	var $range2 = $('#option2SingleRangeSlider'),
		$input2 = $('#option2SingleQty'),
		instance2,
		min2 = 0,
		max2 = 50;

	$range2.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min2,
		max: max2,
		from: 25,
		step: 5,
		hide_min_max: true,
		onStart: function (data) {
			$input2.prop('value', data.from);
		},
		onChange: function (data) {
			$input2.prop('value', data.from);
			if (!singleOption2IsChecked) {
				activateSingleOption('option2Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance2 = $range2.data("ionRangeSlider");

	$input2.on('input', function () {
		var val2 = $(this).prop('value');

		// Validate
		if (val2 < min2) {
			val2 = min2;
			$input2.val(min2);
		} else if (val2 > max2) {
			val2 = max2;
			$input2.val(max2);
		}

		instance2.update({
			from: val2
		});

		if (!singleOption2IsChecked) {
			activateSingleOption('option2Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================
	//      RANGE SLIDER 3
	// =====================================================	
	var $range3 = $('#option3SingleRangeSlider'),
		$input3 = $('#option3SingleQty'),
		instance3,
		min3 = 0,
		max3 = 100;

	$range3.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min3,
		max: max3,
		from: 50,
		step: 10,
		hide_min_max: true,
		onStart: function (data) {
			$input3.prop('value', data.from);
		},
		onChange: function (data) {
			$input3.prop('value', data.from);
			if (!singleOption3IsChecked) {
				activateSingleOption('option3Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance3 = $range3.data("ionRangeSlider");

	$input3.on('input', function () {
		var val3 = $(this).prop('value');

		// Validate
		if (val3 < min3) {
			val3 = min3;
			$input3.val(min3);
		} else if (val3 > max3) {
			val3 = max3;
			$input3.val(max3);
		}

		instance3.update({
			from: val3
		});

		if (!singleOption3IsChecked) {
			activateSingleOption('option3Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================

	//      RANGE SLIDER 4
	// =====================================================	
	var $range4 = $('#option4SingleRangeSlider'),
		$input4 = $('#option4SingleQty'),
		instance4,
		min4 = 0,
		max4 = 100;

	$range4.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min4,
		max: max4,
		from: 50,
		step: 10,
		hide_min_max: true,
		onStart: function (data) {
			$input4.prop('value', data.from);
		},
		onChange: function (data) {
			$input4.prop('value', data.from);
			if (!singleOption4IsChecked) {
				activateSingleOption('option4Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance4 = $range4.data("ionRangeSlider");

	$input4.on('input', function () {
		var val4 = $(this).prop('value');

		// Validate
		if (val4 < min4) {
			val4 = min4;
			$input4.val(min4);
		} else if (val4 > max4) {
			val4 = max4;
			$input4.val(max4);
		}

		instance4.update({
			from: val4
		});

		if (!singleOption4IsChecked) {
			activateSingleOption('option4Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================

	//      RANGE SLIDER 5
	// =====================================================	
	var $range5 = $('#option5SingleRangeSlider'),
		$input5 = $('#option5SingleQty'),
		instance5,
		min5 = 0,
		max5 = 100;

	$range5.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min5,
		max: max5,
		from: 50,
		step: 10,
		hide_min_max: true,
		onStart: function (data) {
			$input5.prop('value', data.from);
		},
		onChange: function (data) {
			$input5.prop('value', data.from);
			if (!singleOption5IsChecked) {
				activateSingleOption('option5Single');
			}
			updateSummary();
			reValidateTotal();
			saveState();
		}
	});

	instance5 = $range5.data("ionRangeSlider");

	$input5.on('input', function () {
		var val5 = $(this).prop('value');

		// Validate
		if (val5 < min5) {
			val5 = min5;
			$input5.val(min5);
		} else if (val5 > max5) {
			val5 = max5;
			$input5.val(max5);
		}

		instance5.update({
			from: val5
		});

		if (!singleOption5IsChecked) {
			activateSingleOption('option5Single');
		}

		updateSummary();
		reValidateTotal();
		saveState();

	});

	// =====================================================
	//      FORM LABELS
	// =====================================================		
	new FloatLabels('#personalDetails', {
		style: 1
	});

	// =====================================================
	//      FORM INPUT VALIDATION
	// =====================================================

	// Quantity inputs
	$('.qty-input').on('keypress', function (event) {
		if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
			event.preventDefault();
		}
	});

	$('#optionGroup1Qty').on('keypress', function () {
		selectedItem1Title = $('#optionGroup1List option:selected').text();
		if (selectedItem1Title == chooseItemText) {
			$('#alertModal1').modal();
		}
	});

	$('#optionGroup2Qty').on('keypress', function () {
		selectedItem2Title = $('#optionGroup2List option:selected').text();
		if (selectedItem2Title == chooseItemText) {
			$('#alertModal2').modal();
		}
	});

	$('#optionGroup3Qty').on('keypress', function () {
		selectedItem3Title = $('#optionGroup3List option:selected').text();
		if (selectedItem3Title == chooseItemText) {
			$('#alertModal3').modal();
		}
	});

	$('#optionGroup4Qty').on('keypress', function () {
		selectedItem4Title = $('#optionGroup4List option:selected').text();
		if (selectedItem4Title == chooseItemText) {
			$('#alertModal4').modal();
		}
	});

	$('#optionGroup5Qty').on('keypress', function () {
		selectedItem5Title = $('#optionGroup5ist option:selected').text();
		if (selectedItem5Title == chooseItemText) {
			$('#alertModal5').modal();
		}
	});

	// Empty order validation
	window.Parsley.addValidator('emptyOrder', {
		validateString: function (value) {
			return value !== '$ 0.00';
		},
		messages: {
			en: 'Order is empty.'
		}
	});

	// Whole form validation
	$('#orderForm').parsley();
	
	// Clear parsley empty elements
	if ('#orderForm'.length > 0) {
		$('#orderForm').parsley().on('field:success', function () {
			$('ul.parsley-errors-list').not(':has(li)').remove();
		});
	}

})(window.jQuery);