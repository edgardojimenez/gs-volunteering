/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';
    console.log("APP - cordovaApi");

    angular
        .module('GSVolunteeringEvents')
        .factory('cordovaApi', cordovaApi);

    cordovaApi.$inject = ['$window', 'dataSource'];

    function cordovaApi($window, dataSource) {

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
            console.log(navigator.userAgent);
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|MSIE)/)) {
                console.log("APP - Mobile");

                $window.document.addEventListener("deviceready", onDeviceReady, false);
                $window.document.addEventListener("pause", onPause, false);
                $window.document.addEventListener("resume", onResume, false);
                $window.document.addEventListener("online", onOnline, false);
                $window.document.addEventListener("offline", onOffline, false);
                //$window.document.addEventListener("backbutton", onBackButton, false);
                //$window.document.addEventListener("showkeyboard", onShowKeyboard, false);
                //$window.document.addEventListener("hidekeyboard", onHideKeyboard, false);
            } else {
                console.log("APP - browser");
                ready();
            }
        }

        function onDeviceReady() {
            console.log("APP - onDeviceReady");

            storage = angular.injector(['GSVolunteeringEvents']).get('deviceStorageService');
            storage.getData().then(function (data) {
                if (data)
                    dataSource.data = JSON.parse(data);

            }).catch(function(e){
                console.log("APP - catch" + e.code + ' - ' + e.error.code, 'Error');
                alert(e.code + ' - ' + e.error.code, 'Error');
            }).finally(function(){
                console.log("APP - finally");
                bootstrap();
                splashHide();
            });
        }

        function ready() {
            console.log("APP - ready");

            storage = angular.injector(['GSVolunteeringEvents']).get('memoryStorageService');
            storage.getData().then(function (data) {
                if (data)
                    dataSource.data = data;

            }).catch(function(e){
                alert(e.code + ' - ' + e.error.code, 'Error');
            }).finally(function(){
                bootstrap();
            });
        }

        function bootstrap() {
            console.log("APP - Bootstrap");
            angular.bootstrap($window.document, ['GSVolunteeringEvents']);
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

        function confirm(message, title, onConfirmAsync, onConfirm) {
            if ($window.navigator.notification) {
                $window.navigator.notification.confirm(message, onConfirmAsync, title);
            } else {
                if ($window.confirm(message)) {
                    onConfirm();
                }
            }
        }

        function notify(message, duration, position) {
            if ($window.plugins && $window.plugins.toast) {
                $window.plugins.toast.show(message, duration, position, function () {
                }, function () {
                });
            } else {
                console.log(message);
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
            storage.setData(angular.toJson(dataSource.data)).then(function(e) {
                console.log("APP - post set data");
            });
        }

        function onResume() {
            console.log("APP - onResume");
            console.log(console.display());
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

        function onHideKeyboard() {
            console.log("APP - onHideKeyboard");
            notify("onHideKeyboard", "short", "top");
        }

        function onShowKeyboard() {
            console.log("APP - onShowKeyboard");
            notify("onShowKeyboard", "short", "top");
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
