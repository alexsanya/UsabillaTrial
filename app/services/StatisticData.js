angular.module('dashboard')
    .factory('statisticData', function ($rootScope, $resource) {
        return $resource('apidemo.json').get().$promise.then(function (data) {
            $rootScope.dataIsReady = true;
            data.items.sort(function (item1, item2) {
                return item1.creation_date - item2.creation_date;
            });
            return data;
        });
    });