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

        messageBusService.sub('stats.up', function(e) {
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
                month:    { events: 0, hours: 0 },
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
                    date: new Date(events[i].date),
                    hours: parseInt(events[i].hours)
                }

                statsData.life.hours += eventData.hours;

                calculateDayTotals(eventData);
                calculateWeekTotals(eventData);
                calculateMonthTotals(eventData);
                calculateYearTotals(eventData);
            }
        }

        function calculateDayTotals(event) {
            if (event.date.getDate() === period.day){
                statsData.day.hours += event.hours;
                statsData.day.events++;
            }
        }

        function calculateWeekTotals(event) {
            if (getWeek(event.date) === period.day){
                statsData.day.hours += event.hours;
                statsData.day.events++;
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
            period.week = getWeek(date);
        }

        function getWeek(date){
            date.setHours(0,0,0);
            date.setDate(date.getDate()+4-(date.getDay()||7));
            return Math.ceil((((date-new Date(date.getFullYear(),0,1))/8.64e7)+1)/7);
        }

        return service;
    }

})();
