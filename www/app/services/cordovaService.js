/**
 * Created by ejimenez on 6/18/2014.
 */
app.factory('cordovaService', function () {

    return {
        alert: function (message, title) {
            phone.vibrate(1000);
            phone.alert(message, title);
        },

        prompt: function (message) {

        },

        confirm: function (message) {

        },

        notify: function (message, duration, position) {
            //phone.vibrate(1000);
            phone.notify(message, duration, position);
        },

        splashHide: function () {
            phone.splashHide();
        },

        vibrate: function (time) {
            phone.vibrate(time);
        }
    };
});
