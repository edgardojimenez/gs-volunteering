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
        var currentData, service, filterParams;

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
                return { "id": options.id, "date": $filter("date")(options.date, 'MM/dd/yyyy'), "name": options.name, "hours": options.hours }

            return { "id": utils.getId(), "date": $filter("date")(Date.now(), 'MM/dd/yyyy'), "name": null, "hours": null };
        }

        function getEvents() {
            return utils.sortByDate(currentData);
        }

        function addEvent(event) {
            currentData.push(event);
        }

        function removeEvent(event) {
            var index = -1, removeEvent, len = dataSource.data.length;

            for (var i = 0; i < len; i++) {
                if (dataSource.data[i].id == event.id){
                    index = i;
                    break;
                }
            }

            if (index >= 0)
                removeEvent = dataSource.data.splice(index,1);

            searchEvents(filterParams);

            return removeEvent;
        }

        function searchEvents(filter) {
            filterParams = filter;
            if (filterParams) {
                currentData = dataSource.data;
                var data = currentData.filter(function(item){
                    return (item.name.toLowerCase().indexOf(filterParams.toLowerCase()) > -1);
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