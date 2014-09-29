/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - AboutController");

    angular
        .module('GSVolunteeringEvents')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$rootScope'];

    function AboutController($rootScope) {
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
