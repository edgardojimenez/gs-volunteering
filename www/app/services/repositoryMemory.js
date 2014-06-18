/**
 * Created by ejimenez on 5/26/2014.
 */

app.factory('repoMemory', ['$q', '$filter','utils', function($q, $filter, utils) {

    var dataSource = [
        { "id": 1,  "date": "2014-05-09", "name": "Participated ", "hours": 1 },
        { "id": 2,  "date": "2014-05-06", "name": "Participated in the Walk 5K 2 in the Walk 5K 2 in the Walk 5K 2", "hours": 2 },
        { "id": 3,  "date": "2014-05-05", "name": "Participated in the Walk 5K 3 in the Walk 5K 2", "hours": 3 },
        { "id": 4,  "date": "2014-05-06", "name": "Participated in the Walk 5K 4 in the Walk 5K 2", "hours": 4 },
        { "id": 5,  "date": "2014-05-08", "name": "Participated in the Walk 5K 5", "hours": 5 },
        { "id": 6,  "date": "2014-05-05", "name": "Participated in the Walk 5K 6", "hours": 6 },
        { "id": 7,  "date": "2014-05-08", "name": "Participated in the Walk 5K 7 in the Walk 5K 2", "hours": 7 },
        { "id": 8,  "date": "2014-05-05", "name": "Participated in the ", "hours": 8 },
        { "id": 9,  "date": "2014-05-08", "name": "Participated in the Walk 5K 9", "hours": 9 },
        { "id": 10, "date": "2014-05-05", "name": "Participated in the", "hours": 10 },
        { "id": 11, "date": "2014-05-08", "name": "Participated in the", "hours": 11 },
        { "id": 12, "date": "2014-05-05", "name": "Participated in the in the Walk 5K 2in the Walk 5K 2", "hours": 12 }
    ];

    return {

        getEvent: function (id) {
            var deferred = $q.defer(),
                result;
            for (var i = 0; i < dataSource.length; i++) {
                if (dataSource[i].id === id) {
                    result = dataSource[i];
                    break;
                }
            }

            deferred.resolve(result);

            return deferred.promise;
        },

        getNewEvent: function (options) {
            if (options)
                return { "id": options.id, "date": $filter("date")(options.date, 'yyyy-MM-dd'), "name": options.name, "hours": options.hours }

            return { "id": 0, "date": $filter("date")(Date.now(), 'yyyy-MM-dd'), "name": null, "hours": 2 };
        },

        getEvents: function () {
            var deferred = $q.defer();

            deferred.resolve(utils.sortByDate(dataSource));

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
            dataSource.push(event);

            deferred.resolve(event);

            return deferred.promise;
        },

        removeEvent: function (event) {
            var deferred = $q.defer();
            var index = -1, removeEvent;
            dataSource.forEach(function(item, i) {
                if (item.id == event.id)
                    index = i;
            });

            if (index >= 0)
                removeEvent = dataSource.splice(index,1);

            deferred.resolve(removeEvent);

            return deferred.promise;
        }

    };
}]);