/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - ListController");

    angular
        .module('GSVolunteeringEvents')
        .controller('ListController', ListController);

    ListController.$inject = ['repository', 'cordovaService', 'messageBusService'];

    function ListController(repoService, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this;

        vm.events;
        vm.removeEvent = removeEvent;
        vm.search = search;
        vm.searchElement = "";

        init();

        function init() {
            vm.events = repoService.getEvents();
        }

        function removeEvent(event, evt) {
            evt.preventDefault();
            cordovaService.confirm("Do you want to remove event?", "Remove Event", function(button) {
                if (button === 1) {
                    repoService.removeEvent(event);
                    init();
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