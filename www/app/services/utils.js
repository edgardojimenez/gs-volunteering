/**
 * Created by ejimenez on 9/30/13.
 */


app.factory('utils', function () {
    return {
        trim: function (value) {
            return  value.replace(/^\s*/, '').replace(/\s*$/);
        },

        upperCase: function (values) {
            var words = values.split(' ');
            for (var i = 0; i < words.length; i++) {
                words[i] = words[i].substring(0,1).toUpperCase() + words[i].substring(1);
            }

            return words.join(' ');
        }
    };
});