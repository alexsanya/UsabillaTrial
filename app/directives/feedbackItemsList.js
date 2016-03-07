angular.module('dashboard').directive('feedbackItemsList', function (){
    return {
        restrict: 'E',
        templateUrl: 'feedback-items-list.html',
        controller: function ($scope, statisticData, ratingOptions) {
            $scope.pattern = '';
            $scope.ratingOptions = ratingOptions.map(function (option) {
                return {
                    score: option.score,
                    disabled: false
                }
            });
            var feedbacks;
            statisticData.then(function (data) {
                feedbacks = data.items;
            });

            $scope.filteredFeedbacks = function () {
                if (!feedbacks) return [];
                return feedbacks.filter(function (feedback) {
                    return ratingOptions.some(function (option) {
                        return option.score === feedback.rating && !option.disabled;
                    }) && feedback.comment.includes($scope.pattern);
                });
            }
        }
    }
});