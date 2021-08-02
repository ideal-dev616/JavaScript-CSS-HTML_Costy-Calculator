(function ($) {

	"use strict";

	// =====================================================
	//      PRELOADER
	// =====================================================
	$(window).on('load', function () {
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

	// Function to set total title and price initially
	function setTotalOnStart() {

		$('#option1SingleSum').html('<span><i class="fa fa-arrow-circle-right"></i></span> ' + singleOption1Title + ' x ' + actualQty1 + '<span class="price">' + subSum1.toFixed(2) + '</span>');
		$('#option2SingleSum').html('<span><i class="fa fa-arrow-circle-right"></i></span> ' + singleOption2Title + ' x ' + actualQty2 + '<span class="price">' + subSum2.toFixed(2) + '</span>');
		$('#option3SingleSum').html('<span"><i class="fa fa-arrow-circle-right"></i></span> ' + singleOption3Title + ' x ' + actualQty3 + '<span class="price">' + subSum3.toFixed(2) + '</span>');

		$('#totalTitle').val('Total');
		$('#total').val(total.toFixed(2));

		formatItemPrice();		
		formatTotalPrice();
	}

	// Variables for calculation	
	var singleOption1Title = 'Option 1';
	var singleOption1Price = 49;
	var actualQty1 = 50;
	var subSum1 = (singleOption1Price * 1) * (actualQty1 * 1);

	var singleOption2Title = 'Option 2';
	var singleOption2Price = 129;
	var actualQty2 = 25;
	var subSum2 = (singleOption2Price * 1) * (actualQty2 * 1);

	var singleOption3Title = 'Option 3';
	var singleOption3Price = 150;
	var actualQty3 = 7;
	var subSum3 = (singleOption3Price * 1) * (actualQty3 * 1);

	var extraOption1IsChecked = false;
	var extraOption1Title = '';
	var extraOption1Price = 0;

	var total = subSum1 + subSum2 + subSum3;	

	// Function to manage the calculations and update summary
	function updateSummary() {

		// Get the current data from option1Single elements		
		actualQty1 = $('#option1SingleQty').val();

		// Update order summary with option1Single details
		if (actualQty1 != 0) {

			subSum1 = (singleOption1Price * 1) * (actualQty1 * 1);
			$('#option1SingleSum').html('<span><i class="fa fa-arrow-circle-right"></i></span> ' + singleOption1Title + ' x ' + actualQty1 + '<span class="price">' + subSum1.toFixed(2) + '</span>');
			formatItemPrice();

		}

		// Get the current data from option2Single elements		
		actualQty2 = $('#option2SingleQty').val();

		// Update order summary with option2Single details
		if (actualQty2 != 0) {

			subSum2 = (singleOption2Price * 1) * (actualQty2 * 1);
			$('#option2SingleSum').html('<span><i class="fa fa-arrow-circle-right"></i></span> ' + singleOption2Title + ' x ' + actualQty2 + '<span class="price">' + subSum2.toFixed(2) + '</span>');
			formatItemPrice();

		}

		// Get the current data from option3Single elements		
		actualQty3 = $('#option3SingleQty').val();

		// Update order summary with option3Single details
		if (actualQty3 != 0) {

			subSum3 = (singleOption3Price * 1) * (actualQty3 * 1);
			$('#option3SingleSum').html('<span"><i class="fa fa-arrow-circle-right"></i></span> ' + singleOption3Title + ' x ' + actualQty3 + '<span class="price">' + subSum3.toFixed(2) + '</span>');
			formatItemPrice();

		}

		// Get the current data from extraOption1 
		extraOption1IsChecked = $('#extraOption1').is(':checked');
		extraOption1Title = $('#extraOption1Title').text();
		extraOption1Price = $('#extraOption1').val();

		if (extraOption1IsChecked) {

			extraOption1Price = extraOption1Price * 1;
			$('#extraOption1Sum').html('<span id="extraOption1SumReset"><i class="fa fa-arrow-circle-right"></i></span> ' + extraOption1Title + '<span class="price">' + extraOption1Price.toFixed(2) + '</span>');
			formatItemPrice();

		} else { // If option is not checked

			extraOption1Price = 0;
			clearSummaryLine('extraOption1Sum');

		}

		// Update total in order summary		
		total = subSum1 + subSum2 + subSum3 + extraOption1Price;
		$('#total').val(total.toFixed(2));
		formatTotalPrice();

	}

	// Function to clear line in order summary
	function clearSummaryLine(summaryLineName) {

		if (summaryLineName == 'extraOption1Sum') {
			$('#extraOption1Sum').html('');
		}
	}

	// Set total title and price initially
	setTotalOnStart();

	// When extraOption1 is checked
	$('#extraOption1').on('click', function () {
		updateSummary();
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
			updateSummary();
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

	});

	// =====================================================
	//      RANGE SLIDER 2
	// =====================================================	
	var $range2 = $('#option2SingleRangeSlider'),
		$input2 = $('#option2SingleQty'),
		instance2,
		min2 = 1,
		max2 = 50;

	$range2.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min2,
		max: max2,
		from: 25,
		step: 1,
		hide_min_max: true,
		onStart: function (data) {
			$input2.prop('value', data.from);
		},
		onChange: function (data) {
			$input2.prop('value', data.from);
			updateSummary();
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

	});

	// =====================================================
	//      RANGE SLIDER 3
	// =====================================================	
	var $range3 = $('#option3SingleRangeSlider'),
		$input3 = $('#option3SingleQty'),
		instance3,
		min3 = 1,
		max3 = 20;

	$range3.ionRangeSlider({
		skin: 'round',
		type: 'single',
		min: min3,
		max: max3,
		from: 7,
		step: 1,
		hide_min_max: true,
		onStart: function (data) {
			$input3.prop('value', data.from);
		},
		onChange: function (data) {
			$input3.prop('value', data.from);
			updateSummary();
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


})(window.jQuery);