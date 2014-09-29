/**
 * Created by ejimenez on 9/30/13.
 */

(function () {
    'use strict';
    console.log("APP - utils");

    angular
        .module('GSVolunteeringEvents')
        .factory('utils', function () {

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
                },

                sortByDate: function (array) {
                    return array.sort(function(a, b){
                        var c = new Date(a.date);
                        var d = new Date(b.date);
                        if (c > d) return -1;
                        if (c < d) return 1;
                        return 0;
                    });
                },

                test: function () {
                    alert("hello world");
                }
            };
        });
})();