/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('messageBusService', messageBusService);

    messageBusService.$inject = ['$rootScope'];

    function messageBusService($rootScope) {

        function pub(msg, data) {
            data = data || {};
            $rootScope.$emit(msg, data);
        }

        function sub(msg, func, scope) {
            var unbind = $rootScope.$on(msg, func);
            if (scope) {
                scope.$on('$destroy', unbind);
            }
        }

        return {
            pub: pub,
            sub: sub
        }
    }

})();
