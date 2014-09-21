/**
 * Created by ejimenez on 5/26/2014.
 *
 * Life	5	135
 Day Avg	25	256
 Week Avg	25	256
 Year Avg	25	256
 Max Hours	25	256
 Min Hours	25	256
 Max Events	25	256
 Min Events	25	256
 *
 *
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .controller('StatsController', StatsController);

    StatsController.$inject = ['statsService'];

    function StatsController(statsService) {
        /* jshint validthis: true */
        var vm = this;

        init();

        function init() {
            vm.stats = statsService.stats();
        }
    }

})();
