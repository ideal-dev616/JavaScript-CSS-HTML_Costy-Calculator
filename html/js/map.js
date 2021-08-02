var mapObject,
	markers = [],
	markersData = {
		'Marker': [
			{
				logoUrl: 'img/map/infoimg.png',
				address: 'New York',
				title: 'Costy Office',
				mail: 'info@yourdomain.com',
				phone: '+3630123456789',
				latitude: 40.697149,
				longitude: -74.259865
			}
		]

	};

var mapOptions = {
	zoom: 14,
	center: new google.maps.LatLng(40.697149, -74.259865),
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: false,
	panControl: false,
	zoomControl: true,
	zoomControlOptions: {
		style: google.maps.ZoomControlStyle.LARGE,
		position: google.maps.ControlPosition.RIGHT_CENTER
	},
	scrollwheel: false,
	streetViewControl: true,
	streetViewControlOptions: {
		position: google.maps.ControlPosition.RIGHT_BOTTOM
	},
	styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
};

var marker;

mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);

for (var key in markersData) {
	markersData[key].forEach(function (item) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(item.latitude, item.longitude),
			map: mapObject,
			icon: 'img/map/marker.png',
		});
		if ('undefined' === typeof markers[key]) {
			markers[key] = [];
		}
		markers[key].push(marker);
		google.maps.event.addListener(marker, 'click', (function () {
			closeInfoBox();
			getInfoBox(item).open(mapObject, this);
			mapObject.setCenter(new google.maps.LatLng(item.latitude, item.longitude));
		}));

	});
}

function getInfoBox(item) {
	return new InfoBox({
		content:
			'<div id="markerInfo">' +
			'<img src="' + item.logoUrl + '" alt=""/>' +
			'<span>' +
			'<em>' + item.address + '</em>' +
			'<h3>' + item.title + '</h3>' +
			'<strong>' + '<a href="mailto:' + item.mail + '">' + item.mail + '</a>' + '</strong>' +
			'<a href="tel:' + item.phone + '" id="infoboxPhone">' + item.phone + '</a>' +
			'</span>' +
			'</div>',
		disableAutoPan: false,
		maxWidth: 0,
		pixelOffset: new google.maps.Size(10, 92),
		closeBoxMargin: '',
		closeBoxURL: "img/map/close.png",
		isHidden: false,
		alignBottom: true,
		pane: 'floatPane',
		enableEventPropagation: true
	});


};

function closeInfoBox() {
	$('div.infoBox').remove();
};
