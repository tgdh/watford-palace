(function($){
	'use strict';

	//@todo Define the isModern function globally - Probably within head.js

    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    if( window.IsModern ){
        console.log('js fired from window IsModern');
        var setHeight = function(){
        	var coverHeight = $('.c-cover__main').height();
        	
        	$('.c-cover__aside').height(coverHeight);
        };

        var singleGallery = function(){
            $('.js-single__galery').owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                items: 1,
                dots: true,
                navContainer: ".js-single__galery",
                navText: ["<i class='ico-arrow ico-arrow--left'></i>","<i class='ico-arrow ico-arrow--right'></i>"]
            })
        };

		$(window).ready(function(){ 
            singleGallery();
       		setHeight();
		});
		$(window).resize(function(){ 
       		setHeight();
		});
	




    }

})(jQuery);