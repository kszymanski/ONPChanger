var app = angular.module("ONPChanger", ["ngRoute"]);
app.config(["$routeProvider", "$locationProvider" , function ($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "./views/home.html",
			controller: "homeController"
		})
		.when("/about",{
			templateUrl: "/views/about.html"
		});
	$locationProvider.html5Mode(true);
}]);