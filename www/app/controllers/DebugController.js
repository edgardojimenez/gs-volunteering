
(function () {
    'use strict';
    console.log("APP - DebugController");

    angular
        .module('GSVolunteeringEvents')
        .controller('DebugController', DebugController);

    DebugController.$inject = ['$window'];

    function DebugController($window) {
        /* jshint validthis: true */
        var vm = this;
        vm.clear = clear;
        vm.logs = $window.console.show();

        function clear() {
            $window.console.clear();
            vm.logs = '';
        }
    }

})();
