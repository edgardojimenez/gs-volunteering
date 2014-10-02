/**
 * Created by ejimenez on 8/24/2014.
 */


(function () {
    'use strict';
    console.log("APP - memoryStorageService");

    angular
        .module('GSVolunteeringEvents')
        .factory('memoryStorageService', storageService);

    storageService.$inject = ['$q'];

    function storageService($q) {
        var data = [
            { "id": "1",  "date": "2014-05-09", "name": "1", "hours": 1 },
            { "id": "2",  "date": "2014-05-06", "name": "12", "hours": 2 },
            { "id": "3",  "date": "2014-05-05", "name": "123", "hours": 3 },
            { "id": "4",  "date": "2014-05-06", "name": "1234", "hours": 4 },
            { "id": "5",  "date": "2014-05-08", "name": "12345", "hours": 5 },
            { "id": "6",  "date": "2014-05-05", "name": "123456", "hours": 6 },
            { "id": "7",  "date": "2014-05-08", "name": "1234567", "hours": 7 }
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
