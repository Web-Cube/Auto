import 'jquery-ui/ui/widgets/slider';
require('jquery-ui-touch-punch');

var defaults = {

	events: () => {
		/* viewport width */
		function viewport(){
		    var e = window, 
		        a = 'inner';
		    if ( !( 'innerWidth' in window ) )
		    {
		        a = 'client';
		        e = document.documentElement || document.body;
		    }
		    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		};
		/* viewport width */

		function animateme() {
		    var viewport_height = viewport().height;
		    var viewport_width = viewport().width;
		    var scroll_top = $(window).scrollTop();
		    $(".js-animateme").each(function(){
		        var animate_pos = $(this).offset().top;
		        var animate_offset = $(this).data("animate-offset");
		        var animate_delay = $(this).data("animate-delay");

		        if ( animate_offset ) {
		        	$(this).data("animate-offset");
		        } else {

		        	if ( viewport_width > 580 ) {
		        		animate_offset = 2;
		        	} else {
		        		animate_offset = 1.65;
		        	}
		        }

		        var win_scroll = scroll_top + (viewport_height/animate_offset);
		        $(this).css("transition-delay",animate_delay+"ms");
		        if ( win_scroll >= animate_pos ) {
		            $(this).addClass("show");
		        }
		    });
		}

		//Анимации по странице
		$(window).scroll(function(){
		    animateme();
		});

		//Анимации при загрузке
		$(window).on("load", function(){
		    $(".js-load-animate").each(function(){
		    	$(this).addClass('show');
		    });
		});

		// Калькулятор

		var thousandSeparator = str => {
			var parts = (str + '').split('.'),
				main = parts[0],
				len = main.length,
				output = '',
				i = len - 1;

			while(i >= 0) {
				output = main.charAt(i) + output;
				if ((len - i) % 3 === 0 && i > 0) {
					output = ' ' + output;
				}
				--i;
			}

			if (parts.length > 1) {
				output += '.' + parts[1];
			}
			return output;
		};

		$('.js-calc').each(function(){
			$('#amount').slider({
				range: "min",
				min: 50000,
				max: 1000000,
				step: 1000,
				value: 150000,
				slide: function( event, ui ) {
					var amount = Math.round( ui.value * 1.035 );
					var amountReturn = thousandSeparator( amount );
					var amountPercent = amount - ui.value;
					amountPercent = thousandSeparator( amountPercent );

					$('.js-amount').text(thousandSeparator( ui.value ));
					$('.js-amount-return').text(amountReturn);
					$('.js-amount-percent').text(amountPercent);
					
				}
			});

			$('#amountDate').slider({
				range: "min",
				min: 14,
				max: 365,
				step: 1,
				value: 30,
				slide: function( event, ui ) {

					$('.js-amount-date').text( ui.value );
					
				}
			});
		});

		// Клик вне select
		const select = document.querySelector('.js-select');

		document.onclick = function(e){
		    if ( event.target.className != 'js-select' ) {
		    	select.classList.remove('is-active');
		    };
		};
	},

	toggleMobile: (e) => {
		
		$(e.currentTarget).toggleClass('is-active');
		$('.js-mobile').toggleClass('is-active');
		$('body').toggleClass('js-lock');
		
	},

	select: (e) => {
		
		$(e.currentTarget).parent().toggleClass('is-active');
		
	},

	selectItem: (e) => {

		let value = $(e.currentTarget).data('value');
		let text = $(e.currentTarget).text();
		
		$(e.currentTarget).closest('.js-select').removeClass('is-active');
		$('.js-select.is-active, .js-select-item.is-active').removeClass('is-active');
		$(e.currentTarget).addClass('is-active');

		$(e.currentTarget).closest('.js-select').find('.js-select-input').val(value);
		$(e.currentTarget).closest('.js-select').find('.js-select-label').text(value);
		
	},

	video: (e) => {

		let parrent = $(e.currentTarget).closest('.js-video');
		let video = $(e.currentTarget).data('video');
		
		parrent.addClass('is-active');
		parrent.find('.js-video-html').html(video)
		
	},

	init: () => {

		defaults.events();
		$(document).on('click', '.js-burger', defaults.toggleMobile);
		$(document).on('click', '.js-select-head', defaults.select);
		$(document).on('click', '.js-select-item', defaults.selectItem);
		$(document).on('click', '.js-video-prview', defaults.video);

		$('.js-mobile-close').click(function(){
			$('.js-burger').click();
		});

	}
}

export { defaults }