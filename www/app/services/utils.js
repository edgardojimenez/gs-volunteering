/**
 * Created by ejimenez on 9/30/13.
 */

(function () {
    'use strict';
    console.log("APP - utils");

    angular
        .module('GSVolunteeringEvents')
        .factory('utils', utils);


        function utils() {

            function trim(value) {
                return  value.replace(/^\s*/, '').replace(/\s*$/);
            }

            function upperCase(values) {
                var words = values.split(' ');
                for (var i = 0; i < words.length; i++) {
                    words[i] = words[i].substring(0,1).toUpperCase() + words[i].substring(1);
                }

                return words.join(' ');
            }

            function sortByDate(array) {
                return array.sort(function(a, b){
                    var c = new Date(a.date);
                    var d = new Date(b.date);
                    if (c > d) return -1;
                    if (c < d) return 1;
                    return 0;
                });
            }

            function getId() {
                var date = new Date(),
                    components = [
                        date.getFullYear(),
                            ((date.getMonth() + 1) < 9 ? '0' : '') + (date.getMonth() + 1),
                            (date.getDate() < 9 ? '0' : '') + date.getDate(),
                            (date.getHours() < 9 ? '0' : '') + date.getHours(),
                            (date.getMinutes() < 9 ? '0' : '') + date.getMinutes(),
                            (date.getSeconds() < 9 ? '0' : '') + date.getSeconds(),
                        date.getMilliseconds()
                    ];

                return components.join("");
            }

            function padDate(date) {
                var patternMonth = /^\d{1}\/\d{2}\/\d{4}$/,
                    patternDay = /^\d{2}\/\d{1}\/\d{4}$/,
                    patternMonthDay = /^\d{1}\/\d{1}\/\d{4}$/;

                if (patternMonth.test(date)) {
                    return '0' + date;
                }

                if (patternDay.test(date)) {
                    return date.substr(0,3) + '0' + date.substr(3);
                }

                if (patternMonthDay.test(date)) {
                    return '0' + date.substr(0,2) + '0' + date.substr(2);
                }

                return date;
            }

            function round(value, decimals) {
                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
            }

            function formatDateStandard(date) {
                //2014-10-25   formatToPickDate
                return date.substr(6,4) + "-" + date.substr(0,2) + "-" + date.substr(3,2);
            }

            function formatDateNormal(date) {
                //10/25/2014
                return date.substr(5,2) + "/" + date.substr(8,2) + "/" + date.substr(0,4);
            }

            function getWeek(date){
                date.setHours(0,0,0);
                date.setDate(date.getDate()+4-(date.getDay()||7));
                return Math.ceil((((date-new Date(date.getFullYear(),0,1))/8.64e7)+1)/7);
            }

            function convertToDate(date){
                return new Date(date.substr(6,4), parseInt(date.substr(0,2))-1, date.substr(3,2));
            }

            return {
                trim: trim,
                upperCase: upperCase,
                sortByDate: sortByDate,
                getId: getId,
                padDate: padDate,
                round: round,
                formatDateStandard: formatDateStandard,
                formatDateNormal: formatDateNormal,
                getWeek: getWeek,
                convertToDate: convertToDate
            };
        }
})();