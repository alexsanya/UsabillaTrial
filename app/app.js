(function () {
    'use strict';
    angular.module('templates', []);
    angular.module('dashboard', ['templates', 'ngResource']).value('ratingOptions', [
        {
            label: 'Very bad',
            score: 1
        },
        {
            label: 'Bad',
            score: 2
        },
        {
            label: 'Average',
            score: 3
        },
        {
            label: 'Good',
            score: 4
        },
        {
            label: 'Amazing!',
            score: 5
        }
    ]);
})();
