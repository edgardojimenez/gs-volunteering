/**
 * Created by ejimenez on 6/18/2014.
 */
var cordova = (function (win) {
    return {
        alert: function (message, title, callback) {
            if (win.navigator.notification) {
                win.navigator.notification.alert(message, callback, title, "Ok");
            } else {
                alert(message);
            }
        },

        prompt: function (message) {

        },

        confirm: function (message) {

        },

        notify: function (message, duration, position) {
            if (win.plugins && win.plugins.toast)
                win.plugins.toast.show(message, duration, position);
        },

        splashHide: function () {
            if (win.navigator.splashscreen)
                win.navigator.splashscreen.hide();
        },

        vibrate: function (time) {
            if (win.navigator.notification)
                win.navigator.notification.vibrate(time);
        }
    };
})(window);
