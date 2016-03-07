angular.module('dashboard').directive('ratingChart', function () {
    var canvas;
    return {
        restrict: 'E',
        templateUrl: 'rating-chart.html',
        link: function (scope, element) {
            Chart.defaults.global.animation = false;
            Chart.defaults.global.showTooltips = false;
            Chart.defaults.global.scaleShowLabels = false;

            canvas = element;
            var ctx = document.getElementById('ratingChart').getContext('2d');
            var data = {
                labels: ["January", "", "March", "", "May", "", "July", "", "March", "", "May", "", "July", ""],
                datasets: [
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0)",
                        strokeColor: "rgba(0,169,186,1)",
                        pointColor: "rgba(0,169,186,1)",
                        data: [2.3, 3.5, 4.7, 1.8, 3, 4, 3.7, 2.3, 3.5, 4.7, 1.8, 3, 4, 3.7]
                    }
                ]
            };

            var myLineChart = new Chart(ctx).Line(data, {
                scaleShowVerticalLines: false,
                bezierCurve: false,
                legendTemplate : ""
            });
        }
    }
});
