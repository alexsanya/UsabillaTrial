angular.module('dashboard').directive('ratingChart', function () {
    var ctx, chart;
    var MONTH_LIST = 'jan. feb. mar. apr. may jun jul. aug. sep. oct. nov. dec.'.split(' ');

    function userFriendlyDate(reportItem) {
        this.odd = !this.odd;
        if (this.odd) return '';
        var date = new Date(reportItem.tillDate);
        return date.getDate() + ' ' + MONTH_LIST[date.getMonth()];
    }

    function decorate(list) {
        list[0] = '...';
        list[list.length-1] = '...';
        return list;
    }

    userFriendlyDate.odd = false;
    return {
        restrict: 'E',
        templateUrl: 'rating-chart.html',
        link: function (scope, element) {
            Chart.defaults.global.animation = false;
            Chart.defaults.global.showTooltips = false;
            Chart.defaults.global.scaleShowLabels = false;

            ctx = document.getElementById('ratingChart').getContext('2d');
        },
        controller: function ($scope, statisticData, StatisticTimelineReport) {
            statisticData.then(function (data){
                var reportList = StatisticTimelineReport.getTimelineReport(data.items);
                var data = {
                    labels: decorate(reportList.map(userFriendlyDate)),
                    datasets: [
                        {
                            fillColor: "rgba(151,187,205,0)",
                            strokeColor: "rgba(0,169,186,1)",
                            pointColor: "rgba(0,169,186,1)",
                            data: reportList.map(function (item) {
                                return item.averageRating;
                            })
                        }
                    ]
                };

                chart = new Chart(ctx).Line(data, {
                    scaleShowVerticalLines: false,
                    bezierCurve: false,
                    legendTemplate : ""
                });
            });
        }
    }
});
