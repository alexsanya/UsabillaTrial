angular.module('dashboard')
    .factory('statisticsData', function ($rootScope, $resource) {
        return $resource('apidemo.json').get().$promise.then(function (data) {
            $rootScope.dataIsReady = true;
            return data;
        });
    });