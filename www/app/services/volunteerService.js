/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - volunteerService");

    angular
        .module('GSVolunteeringEvents')
        .factory('volunteerService', volunteerService);

    volunteerService.$inject =  ['repository'];

    function volunteerService(repo) {
        var service = {
            getVolunteerEvents: getVolunteerEvents,
            getVolunteerEventNames: getVolunteerEventNames,
            getVolunteerEvent: getVolunteerEvent,
            getNewVolunteerEvent: getNewVolunteerEvent,
            addVolunteerEvent: addVolunteerEvent,
            removeVolunteerEvents: removeVolunteerEvents,
            updateVolunteerEvents: updateVolunteerEvents
        };

        function getVolunteerEvents() {
            return repo.getEvents();
        }

        function getVolunteerEventNames() {
            return repo.getEventNames();
        }

        function getVolunteerEvent(id) {
            return repo.getEvent(id);
        }

        function getNewVolunteerEvent(options) {
            return repo.getNewEvent(options);
        }

        function addVolunteerEvent(volunteerEvent) {
            return repo.addEvent(volunteerEvent);
        }

        function removeVolunteerEvents(volunteerEvent) {
            return repo.removeEvent(volunteerEvent);
        }

        function updateVolunteerEvents(volunteerEvent) {
            return repo.updateEvent(volunteerEvent);
        }

        return service;
    }

})();