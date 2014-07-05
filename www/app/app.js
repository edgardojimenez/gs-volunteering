///**
// * Created with JetBrains WebStorm.
// * User: ejimenez
// * Date: 8/7/13
// * Time: 4:37 PM
//
// */
//
//
//
//    var app = angular.module("gsVolunteerEvents", [ "kendo.directives", "ngRoute" ]);
//
//    app.config([ "$routeProvider", "$sceDelegateProvider", function (routeProvider, sceDelegateProvider){
//        // required so we can run in simulator
//        sceDelegateProvider.resourceUrlWhitelist([ "**" ]);
//
//        routeProvider
//            .when('/', {
//                controller: 'addController',
//                templateUrl: 'app/views/add.html'
//            }).when('/add/:id', {
//                controller: 'addController',
//                templateUrl: 'app/views/add.html'
//            }).when('/list', {
//                controller: 'listController',
//                templateUrl: 'app/views/list.html'
//            }).otherwise({ redirectTo: '/' });
//    }]);
//
//
//
//

var app = angular.module('GSVolunteeringEvents', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui"
]);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'addController',
        templateUrl: 'app/views/add.html'
    }).when('/add/:id', {
        controller: 'addController',
        templateUrl: 'app/views/add.html'
    }).when('/events', {
        controller: 'listController',
        templateUrl: 'app/views/list.html'
    }).otherwise({ redirectTo: '/' });
});

app.value('phone', cordovaInterface);


