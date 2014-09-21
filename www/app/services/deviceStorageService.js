
(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('deviceStorageService', storageService);

    storageService.$inject = ['$q','$window'];

    function storageService($q, $window) {
        var QUOTA_20MB =  20*1024*1024;
        //var fs = null;


        var service = {
            getData: getData,
            setData: setData
        };

//        function init() {
//            if (fs == null) {
//                $window.requestFileSystem($window.PERSISTENT, QUOTA_20MB, function (fss) {
//                    fs = fss;
//                });
//            }
//        }

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
                            onError(e);
                            defer.reject(e);
                        };
                        reader.onloadend = function (evt) {
                            console.log('APP - Read Completed.');
                            defer.resolve(evt.target.result);
                        };

                        reader.readAsText(file);
                    }, onError);
                }, onError);
            });
        }

        function setStorage(data, defer) {
            //$window.webkitStorageInfo.requestQuota($window.PERSISTENT, QUOTA_20MB, function(a,b) {
            //$window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

                $window.requestFileSystem($window.PERSISTENT, QUOTA_20MB, function (fs) {
                    fs.root.getFile("data.txt", { create: true }, function (fileEntry) {
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onerror = function(e) {
                                console.log('APP - Write Failed.');
                                onError(e);
                                defer.reject(e);
                            };
                            fileWriter.onwriteend = function () {
                                console.log('APP - Truncate completed.');
                                fileWriter.onwriteend = function (e) {
                                    console.log('APP - Write completed.');
                                    defer.resolve(e);
                                };
                                console.log('APP - write started.');
                                fileWriter.write("garo");
                            };
                            console.log('APP - Truncate started.');
                            fileWriter.truncate(0);
                        }, onError);
                    }, onError);
                });
            //}, onError);
        }

        function onError(error) {
            // TODO log a nicer message
            console.log(error);
        }

        //        onGotFileSystem: function(fileSystem) {
        //            fileSystem.root.getFile("readme.txt", null, function(fileEntry) {
        //                fileEntry.file(function (file) {
        //                    var reader = new FileReader();
        //                    reader.onloadend = function(evt) {
        //                        console.log("Read as text");
        //                        console.log(evt.target.result);
        //                        data = evt.target.result;
        //                    };
        //                    reader.readAsText(file);
        //                }, onError);
        //            }, onError);
        //        }

        return service;
    }

})();