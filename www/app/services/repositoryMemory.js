/**
 * Created by ejimenez on 5/26/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('repository', repository);

    repository.$inject = ['$q', '$filter','utils', 'dataSource'];

    function repository($q, $filter, utils, dataSource) {

        return {

            getEvent: function (id) {
                var deferred = $q.defer(),
                    result;
                for (var i = 0; i < dataSource.data.length; i++) {
                    if (dataSource.data[i].id === id) {
                        result = dataSource.data[i];
                        break;
                    }
                }

                deferred.resolve(result);

                return deferred.promise;
            },

            getNewEvent: function (options) {
                if (options)
                    return { "id": options.id, "date": $filter("date")(options.date, 'yyyy-MM-dd'), "name": options.name, "hours": options.hours }

                return { "id": 0, "date": $filter("date")(Date.now(), 'yyyy-MM-dd'), "name": null, "hours": null };
            },

            getEvents: function () {
                var deferred = $q.defer();

                deferred.resolve(utils.sortByDate(dataSource.data));

                return deferred.promise;
            },

            //        getEventNames: function () {
            //            var events = [];
            //            dataSource.data().forEach(function (item) {
            //                if (events.indexOf(item.name) == -1)
            //                    events.push(item.name);
            //            });
            //
            //            return events.sort();
            //        },

            addEvent: function (event) {
                var deferred = $q.defer();
                dataSource.data.push(event);
                console.log(dataSource.data);
                deferred.resolve(event);

                return deferred.promise;
            },

            removeEvent: function (event) {
                var deferred = $q.defer();
                var index = -1, removeEvent;
                dataSource.data.forEach(function(item, i) {
                    if (item.id == event.id)
                        index = i;
                });

                if (index >= 0)
                    removeEvent = dataSource.data.splice(index,1);

                deferred.resolve(removeEvent);

                return deferred.promise;
            }

        };
    }
})();