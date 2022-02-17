import Swiper from "swiper";

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

			let settings = {
				loop: false,
				slidesPerView: "auto",
				Navigation: {
					nextEl: navNext,
					prevEl: navPrev,
				},
			};

			if ( dataSettings ) {
				settings = $(this).data("settings");
			}

			const mySwiper = new Swiper(
				id,
				settings
			);

			const swiper = document.querySelector(id).swiper;

			if ( autoplay ) {
				setInterval(function(){
					swiper.slideNext();
				}, autoplayDelay);
			}

			navNext.click(function(){
				swiper.slideNext();
			});

			navPrev.click(function(){
				swiper.slidePrev();
			});

			const swiperFAQ = document.querySelector(id).swiper;

			if ( id == "#faq" ) {
				swiperFAQ.on('slideChange', function () {
					let index = swiperFAQ.realIndex;

					$('.js-faq-item.is-active').removeClass('is-active');

					$('.js-faq-item:eq(' +index+ ')').addClass('is-active');
				});
			}

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