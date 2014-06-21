/**
 * Created by ejimenez on 6/18/2014.
 */
var phone = (function (win) {
    return {
        alert: function (message, title) {
            if (win.navigator.notification) {
                win.navigator.notification.alert(message, function(){}, title, "OK");
            } else {
                alert(message);
            }
        },

        prompt: function (message) {

        },

        confirm: function (message, title, onConfirm) {
            if (win.navigator.notification) {
                win.navigator.notification.confirm(message, onConfirm, title);
            }
        },

        notify: function (message, duration, position) {
            if (win.plugins && win.plugins.toast) {
                win.plugins.toast.show(message, duration, position, function () {}, function () {});
            }
        },

        splashHide: function () {
            if (win.navigator.splashscreen) {
                win.navigator.splashscreen.hide();
            }
        },

        vibrate: function (time) {
            if (win.navigator.notification) {
                win.navigator.notification.vibrate(time);
            }
        }
    };
})(window);
