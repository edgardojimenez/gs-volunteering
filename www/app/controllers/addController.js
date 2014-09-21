/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .controller('AddController', AddController);

    AddController.$inject = ['$rootScope', 'volunteerService', "$route", 'cordovaService', 'messageBusService' ];

    function AddController($rootScope, service, $route, cordovaService, messageBusService) {
        /* jshint validthis: true */
        var vm = this,
            currentEvent = null;

        vm.state = null;
        vm.event = null;
        vm.addEvent = addEvent;
        vm.clearEvent = clearEvent;

        init();

        function init() {
            $rootScope.$on("$routeChangeStart", function() {
                $rootScope.loading = true;
            });

            $rootScope.$on("$routeChangeSuccess", function() {
                $rootScope.loading = false;
            });

            if ($route.current.params.id) {
                vm.state = "Update";
                var id = parseInt($route.current.params.id);
                service.getVolunteerEvent(id).then(function (data) {

                    currentEvent = data;
                    vm.event = service.getNewVolunteerEvent({
                        date: currentEvent.date,
                        name: currentEvent.name,
                        hours: currentEvent.hours
                    });
                });

            } else {
                vm.state = "Add";
                vm.event = service.getNewVolunteerEvent();
            }
        }

        function clearEvent() {
            currentEvent = null;
            vm.event = service.getNewVolunteerEvent();
            //cordovaService.notify(cordovaService.connectionType(), "short", "top");
        }

        function addEvent(event) {
            //mytestscroll();
            try {
                var errors = validate(event);
                if (errors.length > 0) {
                    cordovaService.alert(errors.join('\r\n'), 'Validation');
                    return;
                }

                if (!currentEvent) {
                    service.addVolunteerEvent(event).then(function () {
                        cordovaService.notify("Event was added!", 'short', 'top');
                        vm.event = service.getNewVolunteerEvent();
                        messageBusService.pub("stats.up");
                    });
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
//        function mytestscroll() {
//            var frame = document.getElementById("scroll-pane");
//            var scrollTo = document.getElementById("hours");
//            frame.scrollTop = scrollTo.offsetTop;
//        }
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
