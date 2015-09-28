(function($){
	'use strict';

	//@todo Define the isModern function globally - Probably within head.js

    if( window.IsModern ){
        console.log('js fired from window IsModern');
        var setHeight = function(){
        	var coverHeight = $('.c-cover__main').height();
        	
        	$('.c-cover__aside').height(coverHeight);
        };

		$(window).ready(function(){ 
       		setHeight();
		});
		$(window).resize(function(){ 
       		setHeight();
		});
	
    }

})(jQuery);