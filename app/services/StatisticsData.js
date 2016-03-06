angular.module('dashboard')
    .factory('statisticsData', function ($resource) {
        return $resource('apidemo.json').get().$promise;
    });