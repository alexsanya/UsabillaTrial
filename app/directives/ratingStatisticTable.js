angular.module('dashboard').directive('ratingStatisticTable', function (){
    return {
        restrict: 'E',
        templateUrl: 'rating-statistic-table.html',
        controller: function ($scope, statisticsData, StatisticFilter, ratingOptions) {
            $scope.ready = false;
            statisticsData.then(function (data){
                $scope.ready = true;
                $scope.ratingsTotal = {};
                var filteredFeedbacks = StatisticFilter.filterByRating(data.items);
                ratingOptions.forEach(function (option) {
                    option.count = filteredFeedbacks[option.score].length;
                });
                $scope.ratingOptions = ratingOptions;
                console.log(ratingOptions);
            });
        }
    }
});