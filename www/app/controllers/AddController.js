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

        vm.state = null;
        vm.event = null;
        vm.addEvent = addEvent;
        vm.clearEvent = clearEvent;
        vm.openCalendar = openCalendar;
        vm.closeCalendar = closeCalendar;
        vm.pickadate = {
            minDate: '2014-01-01'
        };
        vm.slider = {

            model: 12
        };

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
                vm.pickadate.date = formatToPickDate(vm.event.date);
            }
            //var elem = document.querySelector("#calendarOverlay .overlay-body");
            //elem.addEventListener("click", closeCalendar, false);
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

        function openCalendar() {
            $rootScope.toggle('calendarOverlay', 'on');
        }

        function closeCalendar() {
            $rootScope.toggle('calendarOverlay', 'off');
            vm.event.date = formatFromPickDate(vm.pickadate.date);
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
