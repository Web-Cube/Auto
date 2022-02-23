import Swiper from 'swiper';

var sliders = {

	build: () => {

		$(".js-slider").each(function(){
			let dataSettings = $(this).data("settings");
			let id = $(this).attr("id");
			let autoplay = $(this).data("autoplay");
			let autoplayDelay = $(this).data("autoplay-delay")*1;
			id = "#"+id;

			let navPrev = $(id).closest("section").find('.swiper-button-prev');
			let navNext = $(id).closest("section").find('.swiper-button-next');
			let navScrollbar = $(id).closest("section").find('.swiper-scrollbar');

			let settings = {
				loop: true,
				slidesPerView: "auto",
				freeMode: true,
				Navigation: {
					nextEl: navNext,
					prevEl: navPrev,
				},
				scrollbar: {
			      el: '.swiper-scrollbar',
			      hide: false,
			      draggable: true,
			      snapOnRelease: true
			    },
			    on: {
					init: function () {
						var length = $(id).closest("section").find('.swiper-slide:not(.swiper-slide-duplicate)').length;
				    	var index = $(id).closest("section").find('.swiper-slide-active').data('swiper-slide-index')+1;
				    	var percent = index/length*100;
						$(id).closest("section").find('.swiper-progress-load').width( percent +"%");
				    },
				},
			};

			if ( dataSettings ) {
				settings = $(this).data("settings");
			}

			const mySwiper = new Swiper(
				id,
				settings,
			);

			if ( autoplay ) {
				setInterval(function(){
					mySwiper.slideNext();
				}, autoplayDelay);
			}

			navNext.click(function(){
				mySwiper.slideNext();
			});

			navPrev.click(function(){
				mySwiper.slidePrev();
			});

			mySwiper.on('transitionStart', function() {
				var length = $(id).closest("section").find('.swiper-slide:not(.swiper-slide-duplicate)').length;
		    	var index = $(id).closest("section").find('.swiper-slide-active').data('swiper-slide-index')+1;
		    	var percent = index/length*100;
				$(id).closest("section").find('.swiper-progress-load').width( percent +"%");
			});

		});
		
	},

	init: () => {
		if (!$('.js-slider').length) return false;

		$(window).on("load", function() {
			sliders.build();
		});
	},
};

export { sliders };