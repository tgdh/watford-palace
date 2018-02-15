(function($) {
    'use strict';
    // console.log("jquery");
    //@todo Define the isModern function globally - Probably within head.js
    var toggleClass = function(el, className) {
        if (el.hasClass(className + '--open')) {
            el.removeClass(className + '--open');
        } else {
            el.addClass(className + '--open');
        }
    };

    $('[data-toggle]').on("click", function() {
        var $className = $(this).data("toggle");
        toggleClass($('html'), $className);
    });

    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
	});

	var carousel = function() {
		$('.js-carousel').each(function() {
			var $this = $(this);
			var count = $this.children().length;
			var settings = {
				items: $this.data("items") ? $this.data("items") : 1,
				loop: $this.data("loop") ? $this.data("loop") : false,
				nav: $this.data("nav") ? $this.data("nav") : false,
				dots: $this.data("dots") ? $this.data("dots") : false,
				autoPlay: $this.data("auto-play") ? $this.data("auto-play") : false,
				speed: $this.data("speed") ? $this.data("speed") : 5000
			};

			console.log(count);

			if (count > 1) {

				$this.owlCarousel({
					loop: settings.loop,
					margin: 10,
					nav: settings.nav,
					items: settings.items,
					dots: settings.dots,
					autoplay: settings.autoPlay,
					autoplayTimeout: settings.speed,
					animateOut: 'fadeOut',
					// navContainer: ".js-home-carousel-nav",
					navText: ["<i class='ico-arrow ico-arrow--left'></i>", "<i class='ico-arrow ico-arrow--right'></i>"]
				})
			}

	    });
	};

	var homeCarousel = function() {
		$('.js-home-carousel').each(function() {
			var $this = $(this);
			var count = $this.children().length;

			if (count > 1) {
				$this.owlCarousel({
					loop: true,
					margin: 10,
					nav: true,
					items: 1,
					dots: true,
					autoplay: true,
					autoplayTimeout: 10000,
					animateOut: 'fadeOut',
					navContainer: ".js-home-carousel-nav",
					navText: ["<i class='ico-arrow ico-arrow--left'></i>", "<i class='ico-arrow ico-arrow--right'></i>"]
				})
			}
		});
	};

    if (window.IsModern) {
        // console.log('js fired from window IsModern');

        var setHeight = function() {
            var coverHeight = $('.c-cover__main').height();

            // $('.c-cover__aside').height(coverHeight);
		};

		homeCarousel();
		carousel();

        var singleGallery = function() {
            $('.js-single__galery').owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                items: 1,
                dots: true,
                navContainer: ".js-single__galery",
                navText: ["<i class='ico-arrow ico-arrow--left'></i>", "<i class='ico-arrow ico-arrow--right'></i>"]
            })
        };
        var magnificGallery = function() {
            $('.js-magnific-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                }
            });
        };

        var selectStyle = function() {
            $('.js-select').selectOrDie();

            $('.js-select--5').selectOrDie({
                size: 5
            });

            $('#whoIsYourMessageFor1129').selectOrDie({
                placeholder: "Who is your message for?"
            });
        };

        var tabbedContent = function() {
            tabby.init();
            // console.log("familyTabs");
        };

        var startVideo = function() {
            var elem = $(".video-controls-js"),
                video = elem.next("iframe"),
                videoSrc = elem.next("iframe").attr("src"),
                videoChannel = "";

            var getChannel = function(url) {
                if (url.toLowerCase().indexOf("youtube") >= 0) {
                    videoChannel = "youtube";
                    playYoutube();
                } else if (url.toLowerCase().indexOf("vimeo")) {
                    videoChannel = "vimeo";
                    playVimeo();
                }
            }

            var playVimeo = function() {
                video.attr({
                    src: videoSrc + "?autoplay=1"
                });
            };

            var playYoutube = function() {
                video.attr({
                    src: videoSrc + "&autoplay=1"
                });
            };
            var hideControls = function() {
                elem.css("display", "none");
            };

            elem.on('click', function() {
                getChannel(videoSrc);
                hideControls();
            });
        };

        var queries = [{
            context: 'medium-max',
            match: function() {
                // console.log('slide navigation');
                $('#mainNav').menu();

            },
            unmatch: function() {
                location.reload();
            }

        }];

        var fitVid = function() {

            // console.log("FitVid");
            $(".o-page__content").fitVids({
                customSelector: "iframe[src*='youtube.com/'], iframe[src*='vimeo.com/']"
            });
        };

        var fixedSidebar = function() {

            // $('.c-nav--sub').fixedsticky();

            function checkScrollTop() {
                var scrollTop = $(window).scrollTop();

                function doTheMagic() {
                    // console.log(scrollTop);
                    if (scrollTop > 106) {
                        // console.log("change position absolute");
                        // setTimeout(function() {
                        //     $('.c-nav--sub').css("top", scrollTop - 30);
                        // }, 500);
                        $('.c-nav--sub').css("top", scrollTop - 30);
                        // $('.c-nav--sub').css({
                        //     'transform': 'translate3D( -385px, ' + ((scrollTop - 30)) + 'px, 0)'
                        // });
                    } else {
                        $('.c-nav--sub').css("top", 0);
                    }
                    // else if (scrollTop < 300 && coverBackground.hasClass('t-opacity')) {
                    //     coverBackground.removeClass('t-opacity');
                    // }
                };
                requestAnimationFrame(doTheMagic);
            }

            window.FrameEvents.on(window, "scroll", checkScrollTop);
        };


        var safeAjaxUrl = function() {

            // console.log("safeajax()");
            $('.o-page').on('click', '.safe-ajax-js', function(e) {
                e.preventDefault();

                var self = $(this);

                // console.log(self.attr("href") + "?altTemplate=" + self.data("template"));

                self.magnificPopup({
                    mainClass: "event--jax js-event--ajax",
                    items: {
                        src: self.attr("href") + "?altTemplate=" + self.data("template")
                    },
                    type: "ajax",
                    ajax: {
                        tError: 'The content could not be loaded. <a href="/">Return to homepage.</a>'
                    },
                    callbacks: {
                        beforeOpen: function() {
                            $('body').css("bottom", "0px");
                        },
                        ajaxContentAdded: function(item) {
                            $('body').css("bottom", "0px");
                            singleGallery();
                            magnificGallery();
                        },
                        open: function() {
                            $('body').css("bottom", "0px");
                            // $('')
                        },
                        close: function() {
                            $('body').css("bottom", "0px");
                        }
                    }
                }).magnificPopup('open');
            });
        };

        $(document).ready(function() {
            singleGallery();
            setHeight();
            selectStyle();
            magnificGallery();
            startVideo();
            tabbedContent();
            MQ.init(queries);
            fitVid();
            fixedSidebar();
            safeAjaxUrl();
            // stickySidebar();
        });

        $(window).load(function() {
            // console.log("loaded");

        });
        $(window).resize(function() {
            setHeight();
        });

    }

})(jQuery);
