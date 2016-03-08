angular.module('dashboard').directive('ratingChart', ['numberOfPoints', function (numberOfPoints) {
    var ctx, chart, reportList,
        MONTH_LIST = 'jan. feb. mar. apr. may jun jul. aug. sep. oct. nov. dec.'.split(' ');

    function userFriendlyDate(reportItem) {
        this.odd = !this.odd;
        if (this.odd) return '';
        var date = new Date(reportItem.tillDate);
        return date.getDate() + ' ' + MONTH_LIST[date.getMonth()];
    }
    userFriendlyDate.odd = false;

    function decorate(list) {
        list[0] = '...';
        list[list.length-1] = '...';
        return list;
    }

    function drawChart(){
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
            scaleOverride: true,
            scaleSteps: 4,
            scaleStepWidth: 1,
            scaleStartValue: 1
        });
    }

    return {
        restrict: 'E',
        templateUrl: 'rating-chart.html',
        link: function () {
            Chart.defaults.global.animation = false;
            Chart.defaults.global.showTooltips = false;
            Chart.defaults.global.scaleShowLabels = false;

            ctx = document.getElementById('ratingChart').getContext('2d');
        },
        controller: [
            '$scope', '$window', 'statisticData', 'StatisticTimelineReport',
            function ($scope, $window, statisticData, StatisticTimelineReport) {
                angular.element($window).bind('resize', function(){
                    chart.destroy();
                    drawChart();
                });
                statisticData.then(function (data){
                    reportList = StatisticTimelineReport.getTimelineReport(data.items, numberOfPoints);
                    drawChart();
                });
            }]
    }
}]);
