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

app.config(function($routeProvider, $locationProvider) {
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


//app.controller('MainController', function($rootScope, $scope, analytics){
//
//    $rootScope.$on("$routeChangeStart", function(){
//        $rootScope.loading = true;
//    });
//
//    $rootScope.$on("$routeChangeSuccess", function(){
//        $rootScope.loading = false;
//    });
//
//    var scrollItems = [];
//
//    for (var i=1; i<=100; i++) {
//        scrollItems.push("Item " + i);
//    }
//
//    $scope.scrollItems = scrollItems;
//    $scope.invoice = {payed: true};
//
//    $scope.userAgent =  navigator.userAgent;
//    $scope.chatUsers = [
//        { name: "Carlos  Flowers", online: true },
//        { name: "Byron Taylor", online: true },
//        { name: "Jana  Terry", online: true },
//        { name: "Darryl  Stone", online: true },
//        { name: "Fannie  Carlson", online: true },
//        { name: "Holly Nguyen", online: true },
//        { name: "Bill  Chavez", online: true },
//        { name: "Veronica  Maxwell", online: true },
//        { name: "Jessica Webster", online: true },
//        { name: "Jackie  Barton", online: true },
//        { name: "Crystal Drake", online: false },
//        { name: "Milton  Dean", online: false },
//        { name: "Joann Johnston", online: false },
//        { name: "Cora  Vaughn", online: false },
//        { name: "Nina  Briggs", online: false },
//        { name: "Casey Turner", online: false },
//        { name: "Jimmie  Wilson", online: false },
//        { name: "Nathaniel Steele", online: false },
//        { name: "Aubrey  Cole", online: false },
//        { name: "Donnie  Summers", online: false },
//        { name: "Kate  Myers", online: false },
//        { name: "Priscilla Hawkins", online: false },
//        { name: "Joe Barker", online: false },
//        { name: "Lee Norman", online: false },
//        { name: "Ebony Rice", online: false }
//    ];
//
//});
