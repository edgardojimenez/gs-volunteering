/**
 * Created with JetBrains WebStorm.
 * User: ejimenez
 * Date: 8/7/13
 * Time: 6:12 PM

 */

(function () {
    'use strict';

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

            vm.updateStats = updateStats;

            updateStats();
        }

        function updateStats() {
            vm.stats = statsService.stats();
        }

    }

})();
