angular.module('dashboard')
    .service('StatisticTimelineReport', function (){
        this.getTimelineReport = function (items) {
            var step = Math.trunc((items[items.length-1].creation_date - items[0].creation_date) / 13);
            var start = items[0].creation_date;
            var createdTill = start+step;
            var averageRating = 0;
            var itemsCount = 0;
            var resultList = [];

            items.forEach(function (item) {
                if (item.creation_date < createdTill) {
                    averageRating += item.rating;
                    itemsCount++;
                } else {
                    averageRating = averageRating / itemsCount;
                    resultList.push({
                        tillDate: createdTill,
                        averageRating: averageRating
                    });
                    averageRating = 0;
                    itemsCount = 0;
                    createdTill += step;
                }
            });

            return resultList;
        }
    });