app.config(function ($routeProvider) {
  console.log('here');
  $routeProvider
    .when('/',{
        templateUrl: 'static/mapvisuals/partials/map.html',
        controller: "MapController",
        controllerAs: "map"
    })
    .when('/piechart',{
    	templateUrl: 'static/mapvisuals/partials/pieChart.html',
    	controller: "PieChartController",
    	controllerAs: "pie"
    })
    .when('/salary', {
        templateUrl: 'static/mapvisuals/partials/salary.html',
        controller: "salaryController",
        controllerAs: "salary"
    })
    .otherwise({
        redirectTo: '/',
    });
});