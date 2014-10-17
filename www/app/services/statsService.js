/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';
    console.log("APP - statsService");
    angular
        .module('GSVolunteeringEvents')
        .factory('statsService', statsService);

    statsService.$inject = ['messageBusService', 'repository', 'utils'];

    function statsService(messageBusService, repoService, utils) {
        var events = [],
            statsData,
            service,
            refresh = true,
            period = {
                day: null,
                week: null,
                month: null,
                year: null
            };

        messageBusService.sub('stats.up', function() {
            refresh = true;
        });

        service = {
            stats: stats,
            setPeriod: setPeriod
        };

        function stats() {
            if (refresh) {
                calculate();
                refresh = false;
            }

            return statsData;
        }

        function initStatData() {
            return {
                life:    { events: 0, hours: 0 },
                day:     { events: 0, hours: 0 },
                week:    { events: 0, hours: 0 },
                month:   { events: 0, hours: 0 },
                year:    { events: 0, hours: 0 }
            }
        }

        function calculate() {
            var eventData;
            events = repoService.getEvents();

            statsData = initStatData();

            statsData.life.events = events.length;
            for (var i = 0, len = events.length; i < len; i++) {
                eventData = {
                    date: utils.convertToDate(events[i].date),
                    hours: events[i].hours
                };

                statsData.life.hours += eventData.hours;

                calculateDayTotals(eventData);
                calculateWeekTotals(eventData);
                calculateMonthTotals(eventData);
                calculateYearTotals(eventData);
            }

            roundAllHours();
        }

        function roundAllHours() {
            statsData.life.hours = utils.round(statsData.life.hours, 2);
            statsData.day.hours = utils.round(statsData.day.hours, 2);
            statsData.week.hours = utils.round(statsData.week.hours, 2);
            statsData.month.hours = utils.round(statsData.month.hours, 2);
            statsData.year.hours = utils.round(statsData.year.hours, 2);
        }

        function calculateDayTotals(event) {
            if (event.date.getDate() === period.day){
                statsData.day.hours += event.hours;
                statsData.day.events++;
            }
        }

        function calculateWeekTotals(event) {
            if (utils.getWeek(event.date) === period.week){
                statsData.week.hours += event.hours;
                statsData.week.events++;
            }
        }

        function calculateMonthTotals(event) {
            if (event.date.getMonth() === period.month){
                statsData.month.hours += event.hours;
                statsData.month.events++;
            }
        }

        function calculateYearTotals(event) {
            if (event.date.getFullYear() === period.year){
                statsData.year.hours += event.hours;
                statsData.year.events++;
            }
        }

        function setPeriod(date) {
            period.month = date.getMonth();
            period.year = date.getFullYear();
            period.day = date.getDate();
            period.week = utils.getWeek(date);
        }

        return service;
    }

})();
