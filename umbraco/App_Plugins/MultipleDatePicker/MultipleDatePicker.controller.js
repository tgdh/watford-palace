function MultipleDatePickerController($scope, assetsService) {

    //tell the assetsService to load the jQuery UI library from the plugin folder
    assetsService
        .load([
            "/App_Plugins/MultipleDatePicker/jquery-ui-1.10.4.custom.min.js"
        ])
        .then(function () {
            assetsService
                .load([
                    "/App_Plugins/MultipleDatePicker/jquery.maskedinput.min.js"
                ]).then(function () {
                    //this function will execute when all dependencies have loaded   
                    $.datepicker.setDefaults({
                        // When a date is selected from the picker
                        onSelect: function (newValue) {
                            if (window.angular && angular.element)
                                // Update the angular model
                                angular.element(this).controller("ngModel").$setViewValue(newValue);
                        }
                    });
                });
            $('.dp').datepicker({ dateFormat: 'dd/mm/yy' });
        });

    //load the separate css for the datepicker to avoid it blocking our js loading
    assetsService.loadCss("/App_Plugins/MultipleDatePicker/jquery-ui-1.10.4.custom.css");

    if (!$scope.model.value) {
        $scope.model.value = [];
    }

    ////add any fields that don't have values
    //if ($scope.model.value.length > 0) {
    //    for (var i = 0; i < $scope.model.value.length; i++) {
    //        if ((i + 1) > $scope.model.value.length) {
    //            $scope.model.value.push({ value: "" });
    //        }
    //    }
    //}

    $scope.add = function () {
            $scope.model.value.push({ value: "" });
    };

    $scope.remove = function (index) {
        var remainder = [];
        for (var x = 0; x < $scope.model.value.length; x++) {
            if (x !== index) {
                remainder.push($scope.model.value[x]);
            }
        }
        $scope.model.value = remainder;
    };

}

var md = angular.module("umbraco").controller("Thamesconsulting.MultidateController", MultipleDatePickerController);

md.directive('timemask', function() {
    return  {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel)
        {
            element.mask("99:99");
            element.on('change', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(element.val());
                });
            });
        }
    };
});


md.directive('jqdatepicker', function () {

    return function (scope, element, attrs) {

        scope.$watch("jqdatepicker", function () {
            try {
                $.datepicker.setDefaults({
                    // When a date is selected from the picker
                    onSelect: function (newValue) {
                        if (window.angular && angular.element)
                            // Update the angular model
                            angular.element(this).controller("ngModel").$setViewValue(newValue);
                    }
                });

                $('.dp').datepicker({ dateFormat: 'dd/mm/yy' });
            }
            catch (e) {
                //console.log(e);
            }
        });
    };

});