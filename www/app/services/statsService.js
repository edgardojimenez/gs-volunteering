/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';
    console.log("APP - statsService");
    angular
        .module('GSVolunteeringEvents')
        .factory('statsService', statsService);

    statsService.$inject = ['messageBusService', 'repository'];

    function statsService(messageBusService, repoService) {
        var events = [], statsData, service, refresh = true;

        messageBusService.sub('stats.up', function(e) {
            refresh = true;
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
            events = repoService.getEvents();

            calculateLife();
            calculateDayAvg();
            calculateWeekAvg();
            calculateYearAvg();
            calculateHoursMax();
            calculateHoursMin();
            calculateEventsMax();
            calculateEventsMin();
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
