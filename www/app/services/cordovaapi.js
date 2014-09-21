/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('cordovaApi', cordovaApi);

    cordovaApi.$inject = ['$window', '$document', 'dataSource'];

    function cordovaApi($window, $document, dataSource) {

        var storage,

            api = {
                init: init,
                alert: alert,
                prompt: prompt,
                confirm: confirm,
                notify: notify,
                vibrate: vibrate,
                isConnected: isConnected,
                connectionType: connectionType
            };

        function init () {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|MSIE)/)) {
                console.log("Mobile");

                $document.addEventListener("deviceready", onDeviceReady, false);
                $document.addEventListener("pause", onPause, false);
                $document.addEventListener("resume", onResume, false);
                $document.addEventListener("online", onOnline, false);
                $document.addEventListener("offline", onOffline, false);
                $document.addEventListener("backbutton", onBackButton, false);
            } else {
                console.log("browser");
                ready();
            }
        }

        function onDeviceReady() {
            console.log("APP - onDeviceReady");

            storage = angular.injector(['GSVolunteeringEvents']).get('deviceStorageService');
            storage.getData().then(function (data) {
                if (data)
                    dataSource.data = JSON.parse(data);

                bootstrap();
                splashHide();
            }).fail(function(e){
                bootstrap();
                splashHide();
                alert(e.code + ' - ' + e.error, 'Error');
            });
        }

        function ready() {
            console.log("APP - ready");

            storage = angular.injector(['GSVolunteeringEvents']).get('memoryStorageService');
            storage.getData().then(function (data) {
                if (data)
                    dataSource.data = data;

                bootstrap();
            }).fail(function(e){
                bootstrap();
                alert(e.code + ' - ' + e.error, 'Error');
            });
        }

        function bootstrap() {
            angular.bootstrap($document, ['GSVolunteeringEvents']);
        }


        function alert(message, title) {
            if ($window.navigator.notification) {
                $window.navigator.notification.alert(message, function () {
                }, title, "OK");
            } else {
                $window.alert(message);
            }
        }

        function prompt(message) {

        }

        function confirm(message, title, onConfirm) {
            if ($window.navigator.notification) {
                $window.navigator.notification.confirm(message, onConfirm, title);
            } else {
                if ($window.confirm(message)) {
                    onConfirm(1);
                }
            }
        }

        function notify(message, duration, position) {
            if ($window.plugins && $window.plugins.toast) {
                $window.plugins.toast.show(message, duration, position, function () {
                }, function () {
                });
            } else {
                $window.alert(message);
            }
        }

        function splashHide() {
            if ($window.navigator.splashscreen) {
                $window.navigator.splashscreen.hide();
            }
        }

        function vibrate(time) {
            if ($window.navigator.notification) {
                $window.navigator.notification.vibrate(time);
            }
        }

        function onPause() {
            console.log("APP - OnPause");
            storage.setData(JSON.stringify(dataSource.data)).then(function(e) {
                console.log("APP - post set data");
            });
        }

        function onResume() {
            console.log("APP - onResume");
    //                storage.getData().then(function (data){
    //                    if (data)
    //                        dataSource.data = JSON.parse(data);
    //                    console.log("APP - post get data");
    //                });
        }

        function onOnline() {
            console.log("APP - onOnline");
            notify("online", "short", "bottom");
        }

        function onOffline() {
            console.log("APP - onOffline");
            notify("No Internet Connection", "short", "bottom");
        }

        function onBackButton() {
            console.log("APP - onBackButton");
            notify("backButton", "short", "bottom");
        }

        function isConnected() {
            if ($window.navigator.connection) {
                return $window.navigator.connection.type !== Connection.NONE;
            }

            return false;
        }

        function connectionType() {
            var networkState;

            if ($window.navigator.connection) {
                networkState = $window.navigator.connection.type;

                var states = {};
                states[Connection.UNKNOWN] = 'Unknown';
                states[Connection.ETHERNET] = 'Ethernet';
                states[Connection.WIFI] = 'WiFi';
                states[Connection.CELL_2G] = '2G';
                states[Connection.CELL_3G] = '3G';
                states[Connection.CELL_4G] = '4G';
                states[Connection.CELL] = 'Cell';
                states[Connection.NONE] = 'None';

                return states[networkState];
            }

            return "null";
        }

        function onError(error) {
            console.log(error);
        }

        return api;

    }

})();
