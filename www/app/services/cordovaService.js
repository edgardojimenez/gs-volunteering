/**
 * Created by ejimenez on 6/18/2014.
 */
app.factory('cordovaService', function () {
    var vibrationMiliseconds = 180;
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

        splashHide: function () {
            phone.splashHide();
        },

        vibrate: function (time) {
            phone.vibrate(time);
        }
    };
});
