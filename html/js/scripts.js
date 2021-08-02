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
			src: 'https://vimeo.com/432854555'
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

	// Variables for showing prices next to each dropdown item which has price
	var itemPrice = 0;

	// Function to show prices next to each dropdown item which has price
	function showItemPrices(optionGroupListName) {

		if (optionGroupListName == 'optionGroup1List') {
			$('#optionGroup1 .price-list .list li').each(function () {
				itemPrice = $(this).data('value');
				if (itemPrice != 0) { $(this).append('<span class="price">' + itemPrice + '</span>'); }
				formatItemPrice();
			});
		}
		if (optionGroupListName == 'optionGroup2List') {
			$('#optionGroup2 .price-list .list li').each(function () {
				itemPrice = $(this).data('value');
				if (itemPrice != 0) { $(this).append('<span class="price">' + itemPrice + '</span>'); }
				formatItemPrice();
			});
		}
		if (optionGroupListName == 'optionGroup3List') {
			$('#optionGroup3 .price-list .list li').each(function () {
				itemPrice = $(this).data('value');
				if (itemPrice != 0) { $(this).append('<span class="price">' + itemPrice + '</span>'); }
				formatItemPrice();
			});
		}
		if (optionGroupListName == 'all') {
			$('.price-list .list li').each(function () {
				itemPrice = $(this).data('value');
				if (itemPrice != 0) { $(this).append('<span class="price">' + itemPrice + '</span>'); }
				formatItemPrice();
			});
		}

	}

	// Function to set total title and price initially
	function setTotalOnStart() {

		$('#totalTitle').val('Total');
		$('#total').val('$ 0.00');

	}

	// Variables for showing the price on the right of the selected dropdown item
	var selectedOptionItem = '';
	var selectedOption = '';
	var selectedItemPrice = 0;

	// Function to show the price on the right of the selected dropdown item
	function showSelectedItemPrice(optionGroupName) {
		selectedOptionItem = $(optionGroupName + ' option:selected');
		selectedOption = selectedOptionItem.text();
		selectedItemPrice = selectedOptionItem.val();

		if (selectedItemPrice != 0) {
			$(optionGroupName + ' .current').html(selectedOption + '<span class="price">' + selectedItemPrice + '</span>');
			formatItemPrice();
		}
	}

	// Variables for calculation
	var chooseItemText = 'Select';

	var selectedItem1Title = '';
	var selectedItem1Price = 0;
	var actualQty1 = 0;
	var subSum1 = 0;

	var selectedItem2Title = '';
	var selectedItem2Price = 0;
	var actualQty2 = 0;
	var subSum2 = 0;

	var selectedItem3Title = '';
	var selectedItem3Price = 0;
	var actualQty3 = 0;
	var subSum3 = 0;

	var extraOption1IsChecked = false;
	var extraOption1Title = '';
	var extraOption1Price = 0;

	var extraOption2IsChecked = false;
	var extraOption2Title = '';
	var extraOption2Price = 0;

	var total = 0;

	// Function to manage the calculations and update summary
	function updateSummary() {

		// Get the current data from optionGroup1 elements
		selectedItem1Title = $('#optionGroup1List option:selected').text();
		selectedItem1Price = $('#optionGroup1List option:selected').val();
		actualQty1 = $('#optionGroup1Qty').val();
		subSum1 = (selectedItem1Price * 1) * (actualQty1 * 1);

		// Update order summary with optionGroup1 details
		if ((selectedItem1Title != chooseItemText) && (actualQty1 != 0)) {

			$('#optionGroup1Sum').html('<a href="javascript:;" id="optionGroup1SumReset"><i class="fa fa-times-circle"></i></a> ' + selectedItem1Title + ' x ' + actualQty1 + '<span class="price">' + subSum1.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If optionGroup slider is 0
			clearSummaryLine('optionGroup1Sum');
		}

		// Get the current data from optionGroup2 elements
		selectedItem2Title = $('#optionGroup2List option:selected').text();
		selectedItem2Price = $('#optionGroup2List option:selected').val();
		actualQty2 = $('#optionGroup2Qty').val();
		subSum2 = (selectedItem2Price * 1) * (actualQty2 * 1);

		// Update order summary with optionGroup1 details
		if ((selectedItem2Title != chooseItemText) && (actualQty2 != 0)) {

			$('#optionGroup2Sum').html('<a href="javascript:;" id="optionGroup2SumReset"><i class="fa fa-times-circle"></i></a> ' + selectedItem2Title + ' x ' + actualQty2 + '<span class="price">' + subSum2.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If optionGroup slider is 0
			clearSummaryLine('optionGroup2Sum');
		}

		// Get the current data from optionGroup3 elements
		selectedItem3Title = $('#optionGroup3List option:selected').text();
		selectedItem3Price = $('#optionGroup3List option:selected').val();
		actualQty3 = $('#optionGroup3Qty').val();
		subSum3 = (selectedItem3Price * 1) * (actualQty3 * 1);

		// Update order summary with optionGroup3 details
		if ((selectedItem3Title != chooseItemText) && (actualQty3 != 0)) {

			$('#optionGroup3Sum').html('<a href="javascript:;" id="optionGroup3SumReset"><i class="fa fa-times-circle"></i></a> ' + selectedItem3Title + ' x ' + actualQty3 + '<span class="price">' + subSum3.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If optionGroup slider is 0
			clearSummaryLine('optionGroup3Sum');
		}

		// Get the current data from extraOption1 
		extraOption1IsChecked = $('#extraOption1').is(':checked');
		extraOption1Title = $('#extraOption1Title').text();
		extraOption1Price = $('#extraOption1').val();

		if (extraOption1IsChecked) {

			extraOption1Price = extraOption1Price * 1;
			$('#extraOption1Sum').html('<a href="javascript:;" id="extraOption1SumReset"><i class="fa fa-times-circle"></i></a> ' + extraOption1Title + '<span class="price">' + extraOption1Price.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option in not checked			

			extraOption1Price = 0;
			clearSummaryLine('extraOption1Sum');

		}

		// Get the current data from extraOption2 
		extraOption2IsChecked = $('#extraOption2').is(':checked');
		extraOption2Title = $('#extraOption2Title').text();
		extraOption2Price = $('#extraOption2').val();

		if (extraOption2IsChecked) {

			extraOption2Price = extraOption2Price * 1;
			$('#extraOption2Sum').html('<a href="javascript:;" id="extraOption2SumReset"><i class="fa fa-times-circle"></i></a> ' + extraOption2Title + '<span class="price">' + extraOption2Price.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option in not checked			

			extraOption2Price = 0;
			clearSummaryLine('extraOption2Sum');

		}

		// Update total in order summary
		total = subSum1 + subSum2 + subSum3 + extraOption1Price + extraOption2Price;
		$('#total').val(total.toFixed(2));
		formatTotalPrice();

	}

	// Function to save actual values with updating the hidden fields
	function saveState() {

		// Update hidden fields with optionGroup1 details
		$('#option1Title').val(selectedItem1Title);
		$('#option1Price').val(selectedItem1Price);
		$('#subSum1').val(subSum1);

		// Update hidden fields with optionGroup2 details
		$('#option2Title').val(selectedItem2Title);
		$('#option2Price').val(selectedItem2Price);
		$('#subSum2').val(subSum2);

		// Update hidden fields with optionGroup3 details
		$('#option3Title').val(selectedItem3Title);
		$('#option3Price').val(selectedItem3Price);
		$('#subSum3').val(subSum3);

		// Update hidden field total
		$('#totalDue').val(total);

	}

	// Function to clear line in order summary
	function clearSummaryLine(summaryLineName) {

		if (summaryLineName == 'all') {
			$('#optionGroup1Sum').html('');
			$('#optionGroup2Sum').html('');
			$('#optionGroup3Sum').html('');
			$('#extraOption1Sum').html('');
			$('#extraOption2Sum').html('');
		}
		if (summaryLineName == 'optionGroup1Sum') {
			$('#optionGroup1Sum').html('');
		}
		if (summaryLineName == 'optionGroup2Sum') {
			$('#optionGroup2Sum').html('');
		}
		if (summaryLineName == 'optionGroup3Sum') {
			$('#optionGroup3Sum').html('');
		}
		if (summaryLineName == 'extraOption1Sum') {
			$('#extraOption1Sum').html('');
		}
		if (summaryLineName == 'extraOption2Sum') {
			$('#extraOption2Sum').html('');
		}

	}

	// Function to reset the given dropdown list
	function resetDropdown(optionGroupListName) {

		if (optionGroupListName == 'all') {
			$('#optionGroup1List').val(0).niceSelect('update');
			$('#optionGroup2List').val(0).niceSelect('update');
			$('#optionGroup3List').val(0).niceSelect('update');
		}
		if (optionGroupListName == 'optionGroup1List') {
			$('#optionGroup1List').val(0).niceSelect('update');
		}
		if (optionGroupListName == 'optionGroup2List') {
			$('#optionGroup2List').val(0).niceSelect('update');
		}
		if (optionGroupListName == 'optionGroup3List') {
			$('#optionGroup3List').val(0).niceSelect('update');
		}

	}

	// Function to reset the given checkbox
	function resetCheckbox(extraOptionName) {

		if (extraOptionName == 'all') {
			$('#extraOption1').prop('checked', false);
			$('#extraOption2').prop('checked', false);
		}
		if (extraOptionName == 'extraOption1') {
			$('#extraOption1').prop('checked', false);
		}
		if (extraOptionName == 'extraOption2') {
			$('#extraOption2').prop('checked', false);
		}

	}

	// Function to re-validate total price
	function reValidateTotal() {

		$('#total').parsley().validate();

	}

	// Set total title and price initially
	setTotalOnStart();

	// When optionGroup1List is changed
	$('#optionGroup1List').on('change', function () {
		showSelectedItemPrice('#optionGroup1');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When optionGroup2List is changed
	$('#optionGroup2List').on('change', function () {
		showSelectedItemPrice('#optionGroup2');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When optionGroup3List is changed
	$('#optionGroup3List').on('change', function () {
		showSelectedItemPrice('#optionGroup3');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When extraOption1 is checked
	$('#extraOption1').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// When extraOption2 is checked
	$('#extraOption2').on('click', function () {
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 1 in summary list
	$('#optionGroup1Sum').delegate('#optionGroup1SumReset', 'click', function () {
		clearSummaryLine('optionGroup1Sum');
		resetDropdown('optionGroup1List');
		showItemPrices('optionGroup1List');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 2 in summary list
	$('#optionGroup2Sum').delegate('#optionGroup2SumReset', 'click', function () {
		clearSummaryLine('optionGroup2Sum');
		resetDropdown('optionGroup2List');
		showItemPrices('optionGroup2List');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 3 in summary list
	$('#optionGroup3Sum').delegate('#optionGroup3SumReset', 'click', function () {
		clearSummaryLine('optionGroup3Sum');
		resetDropdown('optionGroup3List');
		showItemPrices('optionGroup3List');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 4 in summary list
	$('#extraOption1Sum').delegate('#extraOption1SumReset', 'click', function () {
		clearSummaryLine('extraOption1Sum');
		resetCheckbox('extraOption1');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// Delete line 5 in summary list
	$('#extraOption2Sum').delegate('#extraOption2SumReset', 'click', function () {
		clearSummaryLine('extraOption2Sum');
		resetCheckbox('extraOption2');
		updateSummary();
		saveState();
		reValidateTotal();
	});

	// If reset is clicked, set the selected item to default	
	$('#resetBtn').on('click', function () {
		clearSummaryLine('all');
		resetDropdown('all');
		resetCheckbox('all');
		updateSummary();
		showItemPrices('all');
		scrollToTop();
	});

	// =====================================================
	//      INIT DROPDOWNS
	// =====================================================		
	$('select').niceSelect();
	showItemPrices('all');

	// =====================================================
	//      RANGE SLIDER 1
	// =====================================================	
	var $range = $('#optionGroup1RangeSlider'),
		$input = $('#optionGroup1Qty'),
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
			updateSummary();
			saveState();
		},
		onFinish: function () {
			selectedItem1Title = $('#optionGroup1List option:selected').text();
			if (selectedItem1Title == chooseItemText) {
				$('#alertModal1').modal();
			}
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

		updateSummary();
		saveState();

	});

	// =====================================================
	//      RANGE SLIDER 2
	// =====================================================	
	var $range2 = $('#optionGroup2RangeSlider'),
		$input2 = $('#optionGroup2Qty'),
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
			updateSummary();
			saveState();
		},
		onFinish: function () {
			selectedItem2Title = $('#optionGroup2List option:selected').text();
			if (selectedItem2Title == chooseItemText) {
				$('#alertModal2').modal();
			}
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

		updateSummary();
		saveState();

	});

	// =====================================================
	//      RANGE SLIDER 3
	// =====================================================	
	var $range3 = $('#optionGroup3RangeSlider'),
		$input3 = $('#optionGroup3Qty'),
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
			updateSummary();
			saveState();
		},
		onFinish: function () {
			selectedItem3Title = $('#optionGroup3List option:selected').text();
			if (selectedItem3Title == chooseItemText) {
				$('#alertModal3').modal();
			}
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

		updateSummary();
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
	if ($('#orderForm').length > 0) {
		$('#orderForm').parsley().on('field:success', function () {
			$('ul.parsley-errors-list').not(':has(li)').remove();
		});
	}

})(window.jQuery);