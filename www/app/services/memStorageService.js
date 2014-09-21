/**
 * Created by ejimenez on 8/24/2014.
 */


(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('memoryStorageService', storageService);

    storageService.$inject = ['$q'];

    function storageService($q) {
        var data = [
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

        var service = {
            getData: getData,
            setData: setData
        };

        function getData() {
            var deferred = $q.defer();

            deferred.resolve(data);

            return deferred.promise;
        }

        function setData(data) {
            var deferred = $q.defer();

            data = data;
            deferred.resolve(data);

            return deferred.promise;
        }

        return service;
    }

})();
