
(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('deviceStorageService', storageService);

    storageService.$inject = ['$q','$window'];

    function storageService($q, $window) {
        var QUOTA_20MB =  20*1024*1024;

        var service = {
            getData: getData,
            setData: setData
        };

        function getData() {
            var deferred = $q.defer();

            getStorage(deferred);

            return deferred.promise;
        }

        function setData(data) {
            var deferred = $q.defer();

            setStorage(data, deferred);

            return deferred.promise;
        }

        function getStorage(defer) {
            //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

            $window.requestFileSystem($window.PERSISTENT, QUOTA_20MB, function (fs) {
                fs.root.getFile("data.txt", null, function (fileEntry) {
                    fileEntry.file(function (file) {
                        var reader = new FileReader();
                        reader.onerror = function(e) {
                            console.log('APP - Read Failed.');
                            defer.reject({code: 'Read', error: e});
                        };
                        reader.onloadend = function (evt) {
                            console.log('APP - Read Completed.');
                            defer.resolve(evt.target.result);
                        };

                        reader.readAsText(file);
                    }, function(e){
                        defer.reject({code: 'Get File Entry', error: e});
                    });
                }, function(e){
                    defer.reject({code: 'Get File', error: e});
                });
            });
        }

        function setStorage(data, defer) {
            $window.requestFileSystem($window.PERSISTENT, QUOTA_20MB, function (fs) {
                fs.root.getFile("data.txt", { create: true }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.onerror = function(e) {
                            console.log('APP - Write Failed.');
                            defer.reject({code: 'Write', error: e});
                        };
                        fileWriter.onwriteend = function () {
                            console.log('APP - Truncate completed.');
                            fileWriter.onwriteend = function (e) {
                                console.log('APP - Write completed.');
                                defer.resolve(e);
                            };
                            console.log('APP - write started.');
                            fileWriter.write(data);
                        };
                        console.log('APP - Truncate started.');
                        fileWriter.truncate(0);
                    }, function(e){
                        defer.reject({code: 'Create Writer', error: e});
                    });
                }, function(e){
                    defer.reject({code: 'Get File', error: e});
                });
            });
        }

        return service;
    }

})();