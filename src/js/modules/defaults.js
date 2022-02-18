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
	},

	toggleMobile: (e) => {
		
		$(e.currentTarget).toggleClass('is-active');
		$('.js-mobile').toggleClass('is-active');
		$('body').toggleClass('js-lock');
		
	},

	init: () => {

		defaults.events();
		$(document).on('click', '.js-burger', defaults.toggleMobile);

		$('.js-mobile-close').click(function(){
			$('.js-burger').click();
		});

	}
}

export { defaults }