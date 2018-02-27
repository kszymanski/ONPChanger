import '../styles/main.css';

import { homeController } from './homeController.js';
import { notationConverter } from './notationConverter';

var app = angular.module("ONPChanger", ["ngRoute", "ngMessages", "ui.bootstrap"]);

app.config(["$routeProvider", "$locationProvider" , function ($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			template: require("../views/home.html"),
			controller: "homeController"
		})
		.when("/about",{
			template: require("../views/about.html")
		}).when("/notations",{
			template: require("../views/notations.html")
		})
		.otherwise("/");
	$locationProvider.html5Mode(true);
}]);
app.service(notationConverter.name, notationConverter);
app.controller(homeController.name, homeController);