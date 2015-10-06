angular.module("umbraco.resources").service('SpektrixFactory', function ($http, notificationsService) {
    var Url = '/umbraco/surface/spektrix/';
    var events = [];

    var successCallBack = function (data) {
        if (data.status == "OK") {
            angular.copy(data.data, events);
        } else {
            notificationsService.error("Error", data.status);
        }

    };

    var errorCallback = function (data, status) {
        notificationsService.error("Error", data.status);
    };

    this.getEvents = function () {
        $http.post(Url + 'events/').success(successCallBack).error(errorCallback);
    };

    this.sync = function (publish) {
        $http.post(Url + 'sync/', { publish: publish }).success(successCallBack).error(errorCallback);
    };

    this.syncSingle = function (id) {
        $http.post(Url + 'syncsingle/',{id:id}).success(successCallBack).error(errorCallback);
    };

    this.createSingle = function (id) {
        $http.post(Url + 'createsingle/', { id: id }).success(successCallBack).error(errorCallback);
    };

    this.getEventsModel = function () {
        return events;
    };
    this.clearEventsModel = function () {
        events.length= 0;
    };
});

angular.module("umbraco").controller("SpektrixDashboardController", function ($scope, $routeParams, SpektrixFactory, notificationsService) {
    $scope.Events = SpektrixFactory.getEventsModel();
    SpektrixFactory.getEvents();

    $scope.Sync = function ($event,publish) {
        SpektrixFactory.clearEventsModel();

        SpektrixFactory.sync(publish);
        $event.preventDefault();
    };

    $scope.Refresh = function ($event) {
        SpektrixFactory.clearEventsModel();
        SpektrixFactory.getEvents();
        $event.preventDefault();
    };

    $scope.CreateSingle = function (id) {
        SpektrixFactory.clearEventsModel();
        SpektrixFactory.createSingle(id);
    };
    $scope.SyncSingle = function (id) {
        SpektrixFactory.clearEventsModel();
        SpektrixFactory.syncSingle(id);
    };

});