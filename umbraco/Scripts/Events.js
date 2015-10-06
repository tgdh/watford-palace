var Events = (function () {

    var settings = {
        numEvents: 5,
        selects: ".filter-select",
        categorySelect: "#filter-category",
        timeSelect: "#filter-time",
        pageNumber: 0
    };

    var busyloading = false;

    bindScroll = function () {

        if ($(window).scrollTop() + 200 >= ($(document).height() - ($(window).height()))) {
            if (busyloading == false) { // Keeps the loader from fetching more than once.
                busyloading = true; // Set busyloading to true, to make sure we do not trigger this code again before it's done running.
                loadMore();
            }
        }
    };

    loadMore = function () {
        Events.getEvents($(settings.categorySelect).val(), $(settings.timeSelect).val());
        $('#loader').show();
        //umbraco/assets/img/loading.gif
    };

    bindUIActions = function () {
        $(document).on('change', settings.selects, function () {
            $(settings.eventTarget).html("");
            settings.pageNumber = 0;
            loadMore();
            if (!settings.scrollBound) {
                $(window).scroll(bindScroll);
            }
            console.log('changed');
        });
        $(document).ready(function () {
            $("#event-target").height('auto');
            $(window).scroll(bindScroll);
            settings.scrollBound = true;
        });
    };
  

    return {
        init: function (allEventsUrl, target) {
            settings.eventsUrl = allEventsUrl;
            settings.eventTarget = target;
            bindUIActions();
            Events.getEvents("", "");
        },
        getEvents: function (category, dateRange) {
            $.ajax({
                type: "POST",
                url: settings.eventsUrl,
                data: "offset=" + settings.pageNumber + "&category=" + category + "&dateRange=" + dateRange + "&size=" + settings.numEvents,
                cache: false,
                success: function (result) {
                    var $moreBlocks = $(result);
                    if ($(settings.eventTarget + ' .theEnd').length > 0) {
                        settings.scrollBound = false;
                        $(window).unbind('scroll');
                    }
                    setTimeout(function () {
                        $(settings.eventTarget).append($moreBlocks);
                    }, 1000);
                },
                complete: function () {
                    setTimeout(function () {
                        busyloading = false;
                        $('#loader').hide();
                    }, 1000);
                },
                error: function (result) {
                    console.log("Ajax error: " + result);
                }
            });
            settings.pageNumber++;
        }
    };

})();
