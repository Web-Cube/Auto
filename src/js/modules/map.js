var map = {
	
	create: () => {
		$.getScript( 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', function( data, textStatus, jqxhr ) {
			ymaps.ready(function () {
				$('.js-map').each(function() {

					let size = [88, 88];
					let offset = [-44, -77];

					let winWidth = $(window).width();

					if ( winWidth < 581 ) {
						size = [48, 48];
						offset = [-22, -42];
					}

					var myMap = new ymaps.Map("map", {
			            center: [59.978366, 30.381605],
			            zoom: 10
			        });

				    myMap.geoObjects
				        .add(new ymaps.Placemark([59.894170, 30.427089], {
				            balloonContent: 'Санкт-Петербург, улица Бабушкина, 21'
				        }, {
				            iconLayout: 'default#image',
				            iconImageHref: '/app/img/location.svg',
				            iconImageSize: size,
				            iconImageOffset: offset,
				        }))
				        .add(new ymaps.Placemark([60.030182, 30.334266], {
				            balloonContent: 'Санкт-Петербург, Северный проспект. д.5к3'
				        }, {
				            iconLayout: 'default#image',
				            iconImageHref: '/app/img/location.svg',
				            iconImageSize: size,
				            iconImageOffset: offset,
				        }));

				    myMap.behaviors.disable('scrollZoom');
				});
			});
		});
	},

	init: () => {
		
		if ( $('.js-map').length ) {
			$(window).on('load', function(){
				map.create();
			});
		}

	}
}

export { map }