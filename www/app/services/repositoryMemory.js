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
        var service, filterParams;

        init();

        service = {
            getEvent: getEvent,
            getNewEvent: getNewEvent,
            getEvents: getEvents,
            addEvent: addEvent,
            removeEvent: removeEvent
        };

        function init() {
        }

        function getEvent(id) {
            var len = dataSource.data.length;
            for (var i = 0; i < len; i++) {
                if (dataSource.data[i].id === id) {
                    return dataSource.data[i];
                }
            }
        }

        function getNewEvent(options) {
            if (options)
                return { "id": options.id, "date": $filter("date")(options.date, 'MM/dd/yyyy'), "name": options.name, "hours": options.hours }

            return { "id": utils.getId(), "date": $filter("date")(Date.now(), 'MM/dd/yyyy'), "name": null, "hours": null };
        }

        function getEvents() {
            return utils.sortByDate(dataSource.data);
        }

        function addEvent(event) {
            dataSource.data.push(event);
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

            return removeEvent;
        }

        return service;
    }

})();