/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - ListController");

    angular
        .module('GSVolunteeringEvents')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', 'repository', 'cordovaService', 'messageBusService'];

    function ListController($scope, repoService, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this;

        vm.events;
        vm.removeEvent = removeEvent;
        vm.searchElement;

        init();

        function init() {
            vm.events = repoService.getEvents();
        }

        function removeEvent(event, evt) {
            evt.preventDefault();
            cordovaService.confirm("Do you want to remove event?", "Remove Event", function(button) {
                    if (button === 1) {
                        $scope.$apply(function(){
                            repoService.removeEvent(event);
                            messageBusService.pub("stats.up");
                        });
                    }
            }, function() {
                    repoService.removeEvent(event);
                    messageBusService.pub("stats.up");
            })
        }
    }

})();