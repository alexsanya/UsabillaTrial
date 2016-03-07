angular.module('dashboard')
    .service('StatisticTimelineReport', function (){
        this.getTimelineReport = function (items, numberOfPoints) {
            var step = Math.trunc((items[items.length-1].creation_date - items[0].creation_date) / numberOfPoints);
            var start = items[0].creation_date;
            var createdTill = start+step;
            var sum = 0;
            var resultList = [];

            items.forEach(function (item, index) {
                sum += item.rating;
                if (item.creation_date > createdTill) {
                    resultList.push({
                        tillDate: createdTill,
                        averageRating: sum / (index+1)
                    });
                    createdTill += step;
                }
            });

            return resultList;
        }
    });