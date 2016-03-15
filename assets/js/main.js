(function($) {
    'use strict';
    console.log("jquery");
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

    if (window.IsModern) {
        console.log('js fired from window IsModern');

        var setHeight = function() {
            var coverHeight = $('.c-cover__main').height();

            // $('.c-cover__aside').height(coverHeight);
        };

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
            console.log("familyTabs");
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
                console.log('slide navigation');
                $('#mainNav').menu();

            },
            unmatch: function() {
                location.reload();
            }

        }];

        var fitVid = function() {

            console.log("FitVid");
            $(".o-page__content").fitVids({
                customSelector: "iframe[src*='youtube.com/'], iframe[src*='vimeo.com/']"
            });
        };

        var fixedSidebar = function() {

            // $('.c-nav--sub').fixedsticky();

            function checkScrollTop() {
                var scrollTop = $(window).scrollTop();

                function doTheMagic() {
                    console.log(scrollTop);
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
            // stickySidebar();
        });

        $(window).load(function() {
            console.log("loaded");

        });
        $(window).resize(function() {
            setHeight();
        });

    }

})(jQuery);
