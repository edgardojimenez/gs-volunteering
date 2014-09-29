/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';
    console.log("APP - repository");

    angular
        .module('GSVolunteeringEvents')
        .factory('repository', repository);

    repository.$inject = ['$filter','utils', 'dataSource'];

    function repository($filter, utils, dataSource) {
        var currentData, service;

        init();

        service = {
            getEvent: getEvent,
            getNewEvent: getNewEvent,
            getEvents: getEvents,
            addEvent: addEvent,
            removeEvent: removeEvent,
            searchEvents: searchEvents
        };

        function init() {
            currentData = dataSource.data;
        }

        function getEvent(id) {
            var len = currentData.length;
            for (var i = 0; i < len; i++) {
                if (currentData[i].id === id) {
                    return currentData[i];
                }
            }
        }

        function getNewEvent(options) {
            if (options)
                return { "id": options.id, "date": $filter("date")(options.date, 'yyyy-MM-dd'), "name": options.name, "hours": options.hours }

            return { "id": 0, "date": $filter("date")(Date.now(), 'yyyy-MM-dd'), "name": null, "hours": null };
        }

        function getEvents() {
            return utils.sortByDate(currentData);
        }

        function addEvent(event) {
            currentData.push(event);
        }

        function removeEvent(event) {
            var index = -1, removeEvent;
            currentData.forEach(function(item, i) {
                if (item.id == event.id)
                    index = i;
            });

            if (index >= 0)
                removeEvent = currentData.splice(index,1);

            return removeEvent;
        }

        function searchEvents(filter) {
            if (filter) {
                currentData = dataSource.data;
                var data = currentData.filter(function(item){
                    return (item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
                });

                currentData = data;
            } else {
                currentData = dataSource.data;
            }

            return currentData
        }

        return service;
    }

})();