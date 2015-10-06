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
        var magnificGallery = function(){
            $('.js-magnific-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                }
            });            
        };

        var selectStyle = function(){
            $('.js-select').selectOrDie();

            $('#whoIsYourMessageFor1129').selectOrDie({
                placeholder: "Who is your message for?"
            });
        };

		$(window).ready(function(){ 
            singleGallery();
       		setHeight();
            selectStyle();
            magnificGallery();
		});
		$(window).resize(function(){ 
       		setHeight();
		});
	




    }

})(jQuery);