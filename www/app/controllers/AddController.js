/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - AddController");

    angular
        .module('GSVolunteeringEvents')
        .controller('AddController', AddController);

    AddController.$inject = ['$rootScope', 'repository', "$route", 'cordovaService',
        'messageBusService', 'validationService', 'utils'];

    function AddController($rootScope, repoService, $route, cordovaService, messageBusService, validationService, utils) {
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

                setPickDate(vm.event.date);
            } else {
                newEvent()
            }
        }

        function newEvent(show) {
            currentEvent = null;
            vm.event = repoService.getNewEvent();
            setPickDate(vm.event.date);
            if (show)
                cordovaService.notify("New event!", 'short', 'top');
        }

        function lastEvent() {
            var lastEvent = repoService.getLastEvent();

            if (!lastEvent) {
                cordovaService.notify("there are no events!", 'long', 'center');
                return;
            }

            vm.event = repoService.getNewEvent({
                date: lastEvent.date,
                name: lastEvent.name,
                hours: lastEvent.hours
            });

            setPickDate(vm.event.date);

            cordovaService.notify("Last event!", 'short', 'top');
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

                processDate(vm.event);
                processHours(vm.event);

                if (!currentEvent) {
                    repoService.addEvent(vm.event);
                } else {
                    currentEvent.date = vm.event.date;
                    currentEvent.name = vm.event.name;
                    currentEvent.hours = vm.event.hours;
                }
                setCurrentEvent();
                messageBusService.pub("stats.up");
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
            var errors = [], error;

            error = validationService.validateName(event.name);
            if (error)
                errors.push(error);

            error = validationService.validateDate(event.date);
            if (error)
                errors.push(error);

            error = validationService.validateHours(event.hours);
            if (error)
                errors.push(error);

            return errors;
        }

        function openCalendar() {
            $rootScope.toggle('calendarOverlay', 'on');
        }

        function closeCalendar() {
            $rootScope.toggle('calendarOverlay', 'off');
            vm.event.date = utils.formatDateNormal(vm.pickadate.date);
        }

        function processDate(event) {
            event.date = utils.padDate(event.date);
        }

        function processHours(event) {
            event.hours = utils.round(event.hours, 2);
        }

        function setPickDate(date) {
            vm.pickadate.date = utils.formatDateStandard(date);
        }
    }

})();
