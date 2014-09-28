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

    angular
        .module('GSVolunteeringEvents')
        .controller('MasterController', MasterController);

    MasterController.$inject = ['$rootScope', 'statsService'];

    function MasterController($rootScope, statsService) {
        console.log('-- In MasterController');
        var vm = this;

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function(){
                console.log('--- In MasterController  $rootScope.loading = true');
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                console.log('--- In MasterController  $rootScope.loading = false');
                $rootScope.loading = false;
            });

            console.log("APP - before updateStats");
            vm.updateStats = updateStats;

            updateStats();
            console.log("APP - before updateStats");
        }

        function updateStats() {
            vm.stats = statsService.stats();
        }

    }


})();


