function MultipleDatePickerController($scope, assetsService, $http) {
	$http.get("/umbraco/Surface/EventsSurface/GetCategories").then(function(response) {
		$scope.categories = response.data;
	});

	//tell the assetsService to load the jQuery UI library from the plugin folder
	assetsService
		.load([
			"/App_Plugins/OtherEventCategories/jQuery-MultiSelect-master/jquery.multiselect.js"
		])
		.then(function () {
			$('.js-multiselect').multiselect();
		});

	//load the separate css for the datepicker to avoid it blocking our js loading
	assetsService.loadCss("/App_Plugins/OtherEventCategories/jQuery-MultiSelect-master/jquery.multiselect.css");
	assetsService.loadCss("/App_Plugins/OtherEventCategories/other-event-cats.css");

	if (!$scope.model.value) {
		$scope.model.value = [];
	}

}

var md = angular.module("umbraco").controller("OtherEventCategories.Controller", MultipleDatePickerController);
