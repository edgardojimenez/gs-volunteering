/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('statsService', statsService);

    statsService.$inject = ['messageBusService', 'volunteerService'];

    function statsService(messageBusService, volunteerService) {
        var events = [], statsData, service, refresh = true;

        messageBusService.sub('stats.up', function(e) {
            refresh = true;
            events = [];
        });

        messageBusService.sub('stats.up', function(e, data) {
            refresh = true;
            events = data;
        });

        statsData = {
            life:       { events: 2, hours: 0 },
            dayAvg:     { events: 0, hours: 0 },
            weekAvg:    { events: 0, hours: 0 },
            yearAvg:    { events: 0, hours: 0 },
            hoursMax:   { events: 0, hours: 0 },
            hoursMin:   { events: 0, hours: 0 },
            eventsMax:  { events: 0, hours: 0 },
            eventsMin:  { events: 0, hours: 0 }
        };

        service = {
            stats: stats
        };

        function stats() {
            if (refresh) {
                calculate();
                refresh = false;
            }

            return statsData;
        }


        function calculate() {
            if (events.length == 0) {
                volunteerService.getVolunteerEvents().then(function (data) {
                    events = data;

                    calculateLife();
                    calculateDayAvg();
                    calculateWeekAvg();
                    calculateYearAvg();
                    calculateHoursMax();
                    calculateHoursMin();
                    calculateEventsMax();
                    calculateEventsMin();

                    events = [];
                });
            }
        }

        function calculateLife() {
            statsData.life.events = 0;
            statsData.life.hours = 0;

            statsData.life.events = events.length;
            for (var i = 0, len = events.length; i < len; i++) {
                statsData.life.hours += events[i].hours;
            }
        }

        function calculateDayAvg() {

        }

        function calculateWeekAvg() {

        }

        function calculateYearAvg() {

        }

        function calculateHoursMax() {

        }

        function calculateHoursMin() {

        }

        function calculateEventsMax() {

        }

        function calculateEventsMin() {

        }

        return service;
    }

})();
