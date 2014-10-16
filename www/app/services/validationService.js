/**
 * Created by ejimenez on 6/18/2014.
 */

(function () {
    'use strict';
    console.log("APP - validationService");
    angular
        .module('GSVolunteeringEvents')
        .factory('validationService', validationService);

    function validationService() {
        var service;

        service = {
            validateName: validateName,
            validateHours: validateHours,
            validateDate: validateDate
        };

        function validateName(input) {
            if (!input)
                return 'Event name is required!';
        }

        function validateHours(input) {
            if (!input)
                return 'Event hours is required!';

            if (isNaN(input))
                return 'Event hours must be a number';

            if (!(input > 0 && input < 25))
                return 'Event hours must be a number from 1 - 24!';

            return '';
        }

        function validateDate(input) {
            if (!input)
                return 'Event date is required!';

            if (!checkDate(input))
                return 'Event date is invalid (format: MM/DD/YYYY )!';

            return '';
        }

        function checkDate(input){
            var month, day, year, date,
                validFormat = /^((\d{2})|(\d{1}))\/((\d{2})|(\d{1}))\/\d{4}$/;

            if (!validFormat.test(input))
                return false;


            month = input.split("/")[0];
            day = input.split("/")[1];
            year = input.split("/")[2];
            date = new Date(year, month-1, day);

            return !((date.getMonth() + 1 != month) || (date.getDate() != day) || (date.getFullYear() != year));
        }


        return service;
    }

})();
