var app = angular.module("ONPChanger", ["ngRoute", "ngMessages", "ui.bootstrap"]);
app.config(["$routeProvider", "$locationProvider" , function ($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "./views/home.html",
			controller: "homeController"
		})
		.when("/about",{
			templateUrl: "/views/about.html"
		}).when("/notations",{
			templateUrl: "/views/notations.html"
		})
		.otherwise("/");
	$locationProvider.html5Mode(true);
}]);