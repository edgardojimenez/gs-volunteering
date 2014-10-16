/**
 * Created with JetBrains WebStorm.
 * User: ejimenez
 * Date: 8/7/13
 * Time: 6:12 PM

 */

(function () {
    'use strict';
    console.log("APP - MasterController");

    angular
        .module('GSVolunteeringEvents')
        .controller('MasterController', MasterController);

    MasterController.$inject = ['$rootScope', 'statsService'];

    function MasterController($rootScope, statsService) {
        var vm = this;

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function(){
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $rootScope.loading = false;
            });

            vm.updateStats = updateStats;
            updateStats();
        }

        function updateStats() {
            statsService.setPeriod(new Date());
            vm.stats = statsService.stats();
        }
    }

})();
