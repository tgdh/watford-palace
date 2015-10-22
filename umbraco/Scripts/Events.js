var Events = (function () {

    var settings = {
        numEvents: 5,
        selects: ".filter-js",
        categorySelect: "#filter-category",
        timeSelect: "#filter-time",
        timeSelectOptions: "#filter-time option",
        previousButton: "#load-previous",
        string: [ "cat=", "date=", "page=" ],
        groupInMonth: false,
        pageNumber: 0,
        eventCount: 0,
        customFilter: false,
        customScroll: false,
        customPageNumber: 0,
        activePage: 0,
        pagePrevious: 0,
        dateFilter: "",
        categoryFilter: ""
    };

    var busyloading = false;
    // jQuery prototype method to capitalize the first symbol of a text string [].capitalize();
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }


    getStats =  function() {
        // $('.active-page').html( settings.activePage );
        // $('.next-page').html( settings.pageNumber + 1 );
        // $('.previous-page').html( settings.pagePrevious - 1);
        // $('.category-filter').html( settings.categoryFilter );
        // $('.date-filter').html( settings.dateFilter );
        // $('.page-number').html( settings.pageNumber );
        // if ( $('.activeBlock').html() === 'true') {
        //     $('.activeBlock').css('color', 'green');
        // } else {
        //     $('.activeBlock').css('color', 'red');
        // }
        // $('.chidren').html( temp.children );
    };

    // Function that listens for scroll and loads more events if the statement is true
    bindScroll = function () {
        // if ( $(window).scrollTop() + 200 >= ( $(document).height() - $(window).height() ) ) {
        //     if (busyloading === false) { // Keeps the loader from fetching more than once.
        //         busyloading = true; // Set busyloading to true, to make sure we do not trigger this code again before it's done running.
        //         loadMore();
        //     }
        // }
    };
    // Function starts with bindScroll and excecutes Events.getEvents to load more event pages
    loadMore = function () {
        Events.getEvents($(settings.categorySelect).val(), $(settings.timeSelect).val());
        $('#loader').show();
        //umbraco/assets/img/loading.gif
    };
    // Fuctions add all event listeners on load, starts UI
    bindUIActions = function () {
        $('.load-prev-js').hide();
        $(document).on('change', settings.selects, function () {
            $(settings.eventTarget).html("");
            // console.log("hide");
            settings.pageNumber = 0;
            loadMore();
            if (!settings.scrollBound) {
                $(window).scroll(bindScroll);
            }
        });
        $(document).ready(function () {
            $("#event-target").height('auto');
            $(window).scroll(bindScroll);
            settings.scrollBound = true;
        });
        // Action to store active page in settings.activePage and push history to go back on the same page
        $('body').on( 'click', '.o-event-block', function(e){
            var getActive = $(this).data('page');
            settings.activePage = getActive;
            setupHistory();
            sessionStorage.returnClick = true;
            // sessionStorage.number = $(this).data('item');
        });

        $(document).on( 'click', settings.previousButton, function(e){
            Events.getPreviousEvents( $(settings.categorySelect).val(), $(settings.timeSelect).val() );
            $('#loader').show();
        });
        $('.load-more-js').on('click', function(){
            if (busyloading == false) { // Keeps the loader from fetching more than once.
                busyloading = true; // Set busyloading to true, to make sure we do not trigger this code again before it's done running.
                loadMore();
            }
        });
    };
    //
    setupHistory = function() {
        // query string variables
        var qCat = "", // query category
            qDate = "", // query date
            qPage = "", // query page
            qActive = "" // query active page

        // sets qCat to the selected category in the menu
        if( $(settings.categorySelect).val() !== "" ) {
            settings.categoryFilter = $(settings.categorySelect).val();
            qCat = settings.string[0] + $(settings.categorySelect).val(); //  + '&';
            qCat = qCat.replace(/\ /g, '_').toLowerCase();

        } else if( $(settings.categorySelect).val() === "" ){
            qCat = "";
            // console.log( "category is emtpty" );
        }
        // sets qDate to the selected date period in the menu
        if( $(settings.timeSelect).val() !== "" && $("option:selected", settings.timeSelect).text().replace(/\ /g, '_').toLowerCase() !== "choose_a_date" ) {
            settings.dateFilter = $("option:selected", settings.timeSelect).text().replace(/\ /g, '_').toLowerCase();
            // console.log( $("option:selected", settings.timeSelect).text().replace(/\ /g, '_').toLowerCase() );
            qDate = settings.string[1] + $("option:selected", settings.timeSelect).text(); // + '&';
            qDate = qDate.replace(/\ /g, '_').toLowerCase();
        } else if( $(settings.timeSelect).val() === "" ){
            qDate = "";
            // console.log( "date is emtpty" );
        }
        // decides which to use as current history push on loadMore() and going to an event
        if( settings.activePage !== 0 ){
            qActive = settings.string[2] + settings.activePage;
        } else {
            qActive= settings.string[2] + settings.pageNumber;
        }

        // If statement checks is the page < 2 and doesn't add ?page=1 to query string
        if( settings.activePage <= 1 && settings.pageNumber <= 1 ) {
            if( qCat !== "" && qDate !== "" ) {
                history.pushState( null, '', '?' + qCat + '&' + qDate );
            } else if( qCat !== "" || qDate !== "" ){
                history.pushState( null, '', '?' + qCat + qDate );
            } else if( qCat === "" && qDate === "" ){
                history.pushState( null, '', '/whats-on/' ); // LOCATION OF THE PAGE
            }
        } else {
        // Else statement starts adding ?page= when the page >= 2
            if( qCat === "" && qDate === "" ) {
                history.pushState( null, '', '?' + qActive );
            } else if( qCat !== "" && qDate !== "" ) {
                history.pushState( null, '', '?' + qCat + '&' + qDate + '&' + qActive );
            } else {
                history.pushState( null, '', '?' + qCat + qDate + '&' + qActive );
            }
        }

        settings.activePage = 0;
    };
    // On page load function checks the query string and sets the page view accordingly
    checkQueryString = function(){
        var vars = [],
            hash,
            query = location.href.split('?')[1];

            if ( query != undefined){
                query = query.split('&');
                for( var i = 0; i < query.length; i++) {
                    hash = query[i].split('=');
                    // vars.push(hash[1]);
                    vars[hash[0]] = hash[1]
                }
            }
            if( jQuery.isEmptyObject( vars ) ){
                //console.log( "NO query or DOESN'T match a pattern");
            } else if(  vars.page && vars.page > 1 ) {
                // console.log( "Query MATCHES a pattern");
                settings.customFilter = true;
                settings.customPageNumber = vars.page;
                settings.pageNumber = settings.customPageNumber - 1;
            } else {
                //  console.log( "NO query or DOESN'T match a pattern");
            }
            if( vars.active && vars.active !== "" ){
                settings.activePage = vars.active;
                settings.customScroll = true;
            }
            // if statement takes vars.cat from query and sets to match settings.categorySelect format
            if( vars.cat && vars.cat !== "" ){
                vars.cat = vars.cat.capitalize().replace(/\_/g, ' ');
                $(settings.categorySelect).val( vars.cat );
                $(settings.categorySelect).change();
                // console.log( "set this cat value" );


            }
            // if statement takes vars.date from querya nd sets to match settings.date.timeSelect format
            if( vars.date && vars.date !== "" ){
                vars.date =  vars.date.capitalize().replace(/\_/g, ' ');
                $(settings.timeSelectOptions).filter(function(){
                    return $(this).text() == vars.date;
                }).prop('selected', true);
                $(settings.timeSelect).change();

            }
    };

    setScrollTop = function() {
        if( sessionStorage.returnClick ){
            var tempHeight = $("article[data-item='" + sessionStorage.number + "']");

           //  $(window).scrollTop( $(window).scrollTop()+tempHeight.offset().top );
            $(window).scrollTop( $(window).scrollTop()+1 );
            setTimeout(function () {
                sessionStorage.removeItem("returnClick");
               // sessionStorage.removeItem("number");
            }, 500);
        }
    };


    setPrevious = function() {
        if( settings.customFilter ){
            $('.load-prev-js').show()

            if( settings.pageNumber <= 1 ){
            } else {
                settings.pagePrevious = settings.pageNumber - 1;
            }
        }
    };

    return {
        // Function init to bindUIActions, checkQuery string and pass arguments to Events.GetEvents method
        init: function (allEventsUrl, target, groupInMonth) {
            settings.eventsUrl = allEventsUrl;
            settings.eventTarget = target;
            settings.groupInMonth = groupInMonth;
            checkQueryString();
            bindUIActions();
            Events.getEvents( $(settings.categorySelect).val(), $(settings.timeSelect).val() );
        },
        // Gets events based on settings (checkQueryString() does the work)
        getEvents: function (category, dateRange) {
            $.ajax({
                type: "POST",
                url: settings.eventsUrl,
                data: "offset=" + settings.pageNumber + "&category=" + category + "&dateRange=" + dateRange + "&size=" +  settings.numEvents + "&groupInMonth="+ settings.groupInMonth, // (( settings.customFilter ) ? settings.customPageNumber * settings.numEvents : settings.numEvents )
                cache: false,
                success: function (result) {
                    // console.log(result);
                    var $moreBlocks = $(result);
                    if ($(settings.eventTarget + ' .theEnd').length > 0 || $moreBlocks.eq(0).attr('class') === "theEnd" ) {
                        settings.scrollBound = false;
                        $('.load-more-js').hide();
                        // $(window).unbind('scroll');
                        settings.pageNumber--;
                    } else if ( $moreBlocks.hasClass('theEnd') ){
                        settings.scrollBound = false;
                        // $(window).unbind('scroll');
                        $('.load-more-js').hide();
                    } else {
                        $('.load-more-js').show();
                    }
                    setTimeout(function () {
                        var tempItem = 1;
                        // .filter adds data-page and data-item attributes to the page for setScrollTop() and setupHistory() functions
                        $moreBlocks.filter('.o-event-block').each( function() {
                            $(this).attr('data-page', settings.pageNumber);
                            $(this).attr('data-item', tempItem++ );
                        });


                        $(settings.eventTarget).append($moreBlocks);
                        setScrollTop();
                    }, 300);

                },
                complete: function () {
                    setTimeout(function () {
                        busyloading = false;
                        $('#loader').hide();
                    }, 1000);
                    settings.pageNumber++;
                    if( settings.customFilter  ){
                        setPrevious();
                        settings.customFilter = false;
                    } else {

                    }
                    console.log( settings.pageNumber );
                    // console.log( "next: " + settings.activePage );
                    setupHistory();
                    getStats();
                },
                error: function (result) {
                    // console.log("Ajax error: " + result);
                }
            });
        },
        // Additional function to load previousEvents with different data settings
        getPreviousEvents: function (category, dateRange) {
            $.ajax({
                type: "POST",
                url: settings.eventsUrl,
                data: "offset=" + (settings.pagePrevious - 1) + "&category=" + category + "&dateRange=" + dateRange + "&size=" +  settings.numEvents + "&groupInMonth="+ settings.groupInMonth, // (( settings.customFilter ) ? settings.customPageNumber * settings.numEvents : settings.numEvents )
                cache: false,
                success: function (result) {
                    var $moreBlocks = $(result)
                    // console.log( "the previous page is: " + settings.pagePrevious );
                    settings.activePage = settings.pagePrevious;

                    setTimeout(function () {
                        var tempItem = 1;
                        $moreBlocks.filter('.o-event-block').each( function() {
                            $(this).attr('data-page', settings.pagePrevious);
                            $(this).attr('data-item', tempItem++ );
                        });
                        $(settings.eventTarget).prepend($moreBlocks);
                        settings.pagePrevious--;
                        // console.log( "Previous page is: " + settings.pagePrevious );
                    if( settings.pagePrevious <= 0 ){
                        // console.log( "Functions should not load anymore" );
                        settings.customFilter = false;
                        $('.load-prev-js').hide();

                    }
                    }, 300);

                },
                complete: function () {
                    setTimeout(function () {
                        busyloading = false;
                        $('#loader').hide();
                    }, 1000);
                    // console.log( "prev: " + settings.activePage );
                    setupHistory();
                    getStats();
                },
                error: function (result) {
                    // console.log("Ajax error: " + result);
                }
            });

        }
    };

})();
