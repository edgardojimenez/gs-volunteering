/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - AddController");

    angular
        .module('GSVolunteeringEvents')
        .controller('AddController', AddController);

    AddController.$inject = ['repository', "$route", 'cordovaService', 'messageBusService' ];

    function AddController(repoService, $route, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this,
            currentEvent = null;

        vm.state = null;
        vm.event = null;
        vm.addEvent = addEvent;
        vm.clearEvent = clearEvent;

        init();

        function init() {

            if ($route.current.params.id) {
                vm.state = "Update";
                currentEvent = repoService.getEvent($route.current.params.id);

                vm.event = repoService.getNewEvent({
                    date: currentEvent.date,
                    name: currentEvent.name,
                    hours: currentEvent.hours
                });

            } else {
                vm.state = "Add";
                vm.event = repoService.getNewEvent();
            }
        }

        function clearEvent() {
            currentEvent = null;
            vm.event = repoService.getNewEvent();
        }

        function addEvent(event) {
            try {
                var errors = validate(event);
                if (errors.length > 0) {
                    cordovaService.alert(errors.join('\r\n'), 'Validation');
                    return;
                }

                if (!currentEvent) {
                    repoService.addEvent(event)
                    cordovaService.notify("Event was added!", 'short', 'top');
                    vm.event = repoService.getNewEvent();
                    messageBusService.pub("stats.up");
                } else {
                    currentEvent.date = vm.event.date;
                    currentEvent.name = vm.event.name;
                    currentEvent.hours = vm.event.hours;
                    messageBusService.pub("stats.up");
                    cordovaService.notify("Event was updated!", 'short', 'top');
                }

            } catch (ex) {
                cordovaService.notify("ERROR - " + ex.message, 'long', 'center');
            }
        }

        function validate(event) {
            var error = [];
            if (!event.name)
                error.push("Event name is required!");

            if (event.hours === null)
                error.push("Event hours is required!");

            if (event.hours !== null && isNaN(event.hours))
                error.push("Event hours must be a number");

            if (event.hours !== null && !isNaN(event.hours) && !(event.hours > 0 && event.hours < 25))
                error.push("Event hours must be a number from 1 - 24!");

            return error;
        }
    }

})();
