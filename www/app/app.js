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
                }).when('/settings', {
                    templateUrl: 'app/views/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm'
                }).when('/about', {
                    templateUrl: 'app/views/about.html',
                    controller: 'AboutController',
                    controllerAs: 'vm'
                }).otherwise({ redirectTo: '/' });
        });
})();


