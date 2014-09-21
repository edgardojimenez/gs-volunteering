/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope','$rootScope', 'volunteerService', 'cordovaService', 'messageBusService'];

    function ListController($scope, $rootScope, service, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this;

        vm.events;
        vm.removeEvent = removeEvent;
        vm.search = search;
        vm.clearSearch = clearSearch;
        vm.searchElement = "";
        vm.stats = {
            count: 0,
            total: 0
        };

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function(){
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function(){
                $rootScope.loading = false;
            });

            service.getVolunteerEvents().then(function (data) {
                vm.events = data;
                //messageBusService.pub("stats.up", true);
            });
        }

        function removeEvent(event, evt) {
            evt.preventDefault();
            cordovaService.confirm("Do you want to remove event?", "Remove Event", function(button) {
                if (button === 1) {
                    service.removeVolunteerEvents(event).then(function(event){
//                        service.getVolunteerEvents().then(function (data) {
//                            vm.events = data;
//                        });
                        messageBusService.pub("stats.up");
                    });
                }
            })
        }

        function search() {
            if (vm.searchElement) {
                var data = vm.events.filter(function(item){
                    return (item.name.toLowerCase().indexOf(vm.searchElement.toLowerCase()) > -1);
                });

                vm.events = data;
                messageBusService.pub("stats.data", data);
            } else {
                clearSearch();
            }
        }

        function clearSearch() {
            service.getVolunteerEvents().then(function (data) {
                vm.events = data;
                messageBusService.pub("stats.up");
            });
        }
    }

})();