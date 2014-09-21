/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .controller('ListController', ListController);

    ListController.$inject = ['$rootScope', 'repository', 'cordovaService', 'messageBusService'];

    function ListController($rootScope, repoService, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this;

        vm.events;
        vm.removeEvent = removeEvent;
        vm.search = search;
        vm.searchElement = "";

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function(){
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $rootScope.loading = false;
            });

            vm.events = repoService.getEvents();
        }

        function removeEvent(event, evt) {
            evt.preventDefault();
            cordovaService.confirm("Do you want to remove event?", "Remove Event", function(button) {
                if (button === 1) {
                    repoService.removeEvent(event);
                    messageBusService.pub("stats.up");
                }
            })
        }

        function search() {
            vm.events = repoService.searchEvents(vm.searchElement);
            messageBusService.pub("stats.up");
        }


    }

})();