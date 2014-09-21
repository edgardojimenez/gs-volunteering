/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .factory('cordovaService', cordovaService);

    cordovaService.$inject = ['cordovaApi'];

    function cordovaService(phone) {
        var vibrationMiliseconds = 120;

        return {
            alert: function (message, title) {
                phone.vibrate(vibrationMiliseconds);
                phone.alert(message, title);
            },

            prompt: function (message) {

            },

            confirm: function (message, title, onConfirm) {
                phone.confirm(message, title, onConfirm);
            },

            notify: function (message, duration, position) {
                phone.vibrate(vibrationMiliseconds);
                phone.notify(message, duration, position);
            },

            vibrate: function (time) {
                phone.vibrate(time);
            },

            isConnected: function () {
                return phone.isConnected();
            },

            connectionType: function () {
                return phone.connectionType();
            }
        };
    }

})();
