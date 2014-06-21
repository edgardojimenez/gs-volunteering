/**
 * Created by ejimenez on 6/18/2014.
 */
var phone = (function (win) {
    return {
        alert: function (message, title) {
            console.log("in alert");
            if (win.navigator.notification) {
                console.log("in win.navigator.notification");
                win.navigator.notification.alert(message, function(){}, title, "OK");
            } else {
                alert(message);
            }
        },

        prompt: function (message) {

        },

        confirm: function (message) {

        },

        notify: function (message, duration, position) {
            console.log("in notify");
            if (win.plugins && win.plugins.toast) {
                console.log("in win.plugins && win.plugins.toast");
                win.plugins.toast.show(message, duration, position, function () {}, function () {});
            }
        },

        splashHide: function () {
            console.log("in splashHide");
            if (win.navigator.splashscreen) {
                console.log("in win.navigator.splashscreen");
                win.navigator.splashscreen.hide();
            }
        },

        vibrate: function (time) {
            console.log("in vibrate");
            if (win.navigator.notification) {
                console.log("in win.navigator.notification");
                win.navigator.notification.vibrate(time);
            }
        }
    };
})(window);
