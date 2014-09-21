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
        var vm = this;

        vm.updateStats = updateStats;

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function(){
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $rootScope.loading = false;
            });

            updateStats();
        }

        function updateStats() {
            vm.stats = statsService.stats();
        }

    }

})();
