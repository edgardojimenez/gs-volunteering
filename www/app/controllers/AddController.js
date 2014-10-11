/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - AddController");

    angular
        .module('GSVolunteeringEvents')
        .controller('AddController', AddController);

    AddController.$inject = ['$rootScope', 'repository', "$route", 'cordovaService', 'messageBusService' ];

    function AddController($rootScope, repoService, $route, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this,
            currentEvent = null;

        vm.event = null;
        vm.saveEvent = saveEvent;
        vm.newEvent = newEvent;
        vm.lastEvent = lastEvent;
        vm.copyEvent = copyEvent;
        vm.openCalendar = openCalendar;
        vm.closeCalendar = closeCalendar;
        vm.pickadate = {
            minDate: '2014-01-01'
        };

        init();

        function init() {

            if ($route.current.params.id) {
                currentEvent = repoService.getEvent($route.current.params.id);

                vm.event = repoService.getNewEvent({
                    id: currentEvent.id,
                    date: currentEvent.date,
                    name: currentEvent.name,
                    hours: currentEvent.hours
                });
            }
        }

        function newEvent() {
            currentEvent = null;
            vm.event = repoService.getNewEvent();
            setPickDate(vm.event.date);
            cordovaService.notify("New event!", 'short', 'top');
        }

        function lastEvent() {
            var tempEvent = repoService.getLastEvent();

            if (!tempEvent) {
                cordovaService.notify("there are no events!", 'long', 'center');
                return;
            }

            vm.event = repoService.getNewEvent({
                date: tempEvent.date,
                name: tempEvent.name,
                hours: tempEvent.hours
            });

            setPickDate(vm.event.date);

            cordovaService.notify("Got last event!", 'short', 'top');
        }

        function copyEvent() {
            currentEvent = null;
            cordovaService.notify("Copied event!", 'short', 'top');
        }

        function saveEvent() {
            try {
                var errors = validate(vm.event);
                if (errors.length > 0) {
                    cordovaService.alert(errors.join('\r\n'), 'Validation');
                    return;
                }

                if (!currentEvent) {
                    repoService.addEvent(vm.event);
                    messageBusService.pub("stats.up");
                } else {
                    currentEvent.date = vm.event.date;
                    currentEvent.name = vm.event.name;
                    currentEvent.hours = vm.event.hours;
                    messageBusService.pub("stats.up");
                }
                setCurrentEvent();
                cordovaService.notify("Saved event!", 'short', 'top');

            } catch (ex) {
                cordovaService.notify("ERROR - " + ex.message, 'long', 'center');
            }
        }

        function clearEvent() {
            vm.event = null;
        }

        function setCurrentEvent() {
            currentEvent = {
                id: vm.event.id,
                date: vm.event.date,
                name: vm.event.name,
                hours: vm.event.hours
            };
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

        function openCalendar() {
            $rootScope.toggle('calendarOverlay', 'on');
        }

        function closeCalendar() {
            $rootScope.toggle('calendarOverlay', 'off');
            vm.event.date = formatFromPickDate(vm.pickadate.date);
        }

        function setPickDate(date) {
            vm.pickadate.date = formatToPickDate(date);
        }

        function formatToPickDate(date) {
            //12/24/2014
            return date.substr(6,4) + "-" + date.substr(0,2) + "-" + date.substr(3,2);
        }

        function formatFromPickDate(date) {
            //2014-12-24
            return date.substr(5,2) + "/" + date.substr(8,2) + "/" + date.substr(0,4);
        }
    }

})();
