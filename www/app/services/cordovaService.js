/**
 * Created by ejimenez on 6/18/2014.
 */
app.factory('cordovaService', function () {

    return {
        alert: function (message, title) {
            cordova.vibrate(1000);
            cordova.alert(message, title);
        },

        prompt: function (message) {

        },

        confirm: function (message) {

        },

        notify: function (message, duration, position) {
            cordova.vibrate(1000);
            cordova.notify(message, duration, position);
        },

        splashHide: function () {
            cordova.splashHide();
        },

        vibrate: function (time) {
            cordova.vibrate(time);
        }
    };
});
