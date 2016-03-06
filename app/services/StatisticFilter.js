angular.module('dashboard')
    .service('StatisticFilter', function (){
        this.filterByRating = function (items) {
            var filtered = {};
            items.forEach(function (item) {
                if (!filtered[item.rating]) {
                    filtered[item.rating] = [item];
                } else {
                    filtered[item.rating].push(item);
                }
            });
            return filtered;
        }
    });