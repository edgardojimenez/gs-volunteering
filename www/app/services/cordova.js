/**
 * Created by ejimenez on 6/18/2014.
 */
var cordovaInterface = (function (win) {
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
            } else {
                if (confirm(message)) {
                    onConfirm(1);
                }
            }
        },

        notify: function (message, duration, position) {
            if (win.plugins && win.plugins.toast) {
                win.plugins.toast.show(message, duration, position, function () {}, function () {});
            } else {
                alert(message);
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
        },

        onPause: function () {
            var me = this;
            me.notify("pause", "short", "bottom");
        },

        onResume: function (time) {
            var me = this;
            me.notify("resume", "short", "bottom");
        },

        onOnline: function (time) {
            var me = this;
            me.notify("online", "short", "bottom");
        },

        onOffline: function (time) {
            var me = this;
            me.notify("No Internet Connection", "short", "bottom");
        },

        backButton: function (time) {
            var me = this;
            me.notify("backButton", "short", "bottom");
        },

        isConnected: function () {
            if (win.navigator.connection) {
                return win.navigator.connection.type !== Connection.NONE;
            }

            throw new Error("Can not find connections");
        },

        connectionType: function () {
            var networkState;

            if (win.navigator.connection) {
                networkState = win.navigator.connection.type;

                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';

                return states[networkState];
            }

            return null;
        }
    };
})(window);
