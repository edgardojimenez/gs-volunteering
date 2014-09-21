///**
// * Created with JetBrains WebStorm.
// * User: ejimenez
// * Date: 8/7/13
// * Time: 4:37 PM
//
// */

(function () {
    angular
        .module('GSVolunteeringEvents', [
            "ngRoute",
            "ngTouch",
            "mobile-angular-ui"
        ]);

    angular
        .module('GSVolunteeringEvents')
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'app/views/add.html',
                    controller: 'AddController',
                    controllerAs: 'vm'
                }).when('/add', {
                    templateUrl: 'app/views/add.html',
                    controller: 'AddController',
                    controllerAs: 'vm'
                }).when('/add/:id', {
                    templateUrl: 'app/views/add.html',
                    controller: 'AddController',
                    controllerAs: 'vm'
                }).when('/events', {
                    templateUrl: 'app/views/list.html',
                    controller: 'ListController',
                    controllerAs: 'vm'
                }).otherwise({ redirectTo: '/' });
        });

//
//    angular
//        .module('GSVolunteeringEvents')
//        .value('dataApi', dataInterface);
})();

//app.config(function($routeProvider) {
//    $routeProvider
//    .when('/', {
//        controller: 'addController',
//        templateUrl: 'app/views/add.html'
//    }).when('/add', {
//        controller: 'addController',
//        templateUrl: 'app/views/add.html'
//    }).when('/add/:id', {
//        controller: 'addController',
//        templateUrl: 'app/views/add.html'
//    }).when('/events', {
//        controller: 'listController',
//        templateUrl: 'app/views/list.html'
//    }).otherwise({ redirectTo: '/' });
//});
//
//app.value('phone', cordovaInterface);


