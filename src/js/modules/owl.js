import "owl.carousel";
import { config } from "../config";
import { defaults } from "./defaults";

/*
 *
 * Data atributes:
 * - settings : object (дополнительные настройки для owl-carousel)
 *
 */

var owl = {
	selector: ".js-owl",

	settings: {
		items: 4,
		autoWidth:true,
		nav: true,
		dots: false,
		loop: true,
		autoplay: false,
		smartSpeed: 500,
		margin: 0,
		center:false,
		navText: [
			'<div class="swiper-button-prev"><svg class="icon icon-prev" viewBox="0 0 64 64"><use xlink:href="/app/icons/sprite.svg#prev"></use></svg></div>',
			'<div class="swiper-button-next"><svg class="icon icon-next" viewBox="0 0 64 64"><use xlink:href="/app/icons/sprite.svg#next"></use></svg></div>',
		],
		afterAction: function(el){
		   //remove class active
		   this
		   .$owlItems
		   .removeClass('active')

		   //add class active
		   this
		   .$owlItems //owl internal $ object containing items
		   .eq(this.currentItem + 1)
		   .addClass('active')    
		}
	},

	bar: (el, value) => {
		$(el).find(".owl-progress-bar").css("width", `${value}%`);
	},

	build: (selector) => {
		let data = $(selector).attr("data-settings")
			? $(selector).data("settings")
			: {};

		let clone = JSON.parse(JSON.stringify(owl.settings));

		let current = Object.assign(clone, data);

		$(selector)
			.addClass("owl-carousel")
			.on("initialized.owl.carousel", (e) => {
				let $slider = $(e.target);
				let $logos = $slider.find(".js-logo:not([style])");

				if ($logos.length) {
					$logos.each((i, el) => {
						if ($(el).hasClass("is-changed")) return false;

						defaults.logoLoading(el);
					});
				}

				// counter
				let $counter = $(e.target).find(".owl-counter");
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($slider.attr("data-progress-bar")) {
					let bar = $slider.data("progress-bar");

					owl.bar(bar, 100 / (length / current));
					console.log("bar is", bar, 100 / (length / current));
				}

				if ($slider.attr("data-counter")) {
					let counter = $slider.data("counter");
					$(counter).html(
						`<div class="owl-counter"><span class="owl-counter-current">${current}</span>/${length}</div>`
					);
				}
			})

			.on("drag.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					e.preventDefault();
				};
			})
			.on("dragged.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					return true;
				};
			})
			.on("changed.owl.carousel", (e) => {
				if (!e.namespace) {
					return;
				}
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($(e.target).attr("data-progress-bar")) {
					let bar = $(e.target).data("progress-bar");

					owl.bar(bar, 100 / (length / current));

					console.log("bar is", bar, 100 / (length / current));
				}

				if ($(e.target).attr("data-counter")) {
					let counter = $(e.target).data("counter");
					$(counter).find('.owl-counter-current').text(current);
				}
			})
			.owlCarousel(current);
		
	},

	destroy: (selector) => {
		if ($(selector).hasClass("owl-loaded"))
			$(selector)
				.trigger("destroy.owl.carousel")
				.removeClass("owl-carousel");
		$(selector).find(".owl-counter").remove();
	},

	run: (selector) => {
		owl.build(selector);
	},

	init: () => {
		if (!$(owl.selector).length) return false;

		$(window).on("load", (e) => {
			$(owl.selector).each((i, el) => {
				owl.run(el);
			});
		});

		$('.js-owl').each(function(){	

			$(this).on('initialized.owl.carousel changed.owl.carousel', function(property) {
				var current = property.item.index-1;
				var src = $(property.target).find(".owl-item").eq(current);
				$(property.target).find('.owl-item.is-current').removeClass('is-current');
				src.addClass('is-current');
		
			});
		});
	},
};

export { owl };