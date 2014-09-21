/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$rootScope'];

    function SettingsController($rootScope) {
        /* jshint validthis: true */
        var vm = this;

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function() {
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function() {
                $rootScope.loading = false;
            });
        }
    }

})();
