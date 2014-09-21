/**
 * Created by ejimenez on 8/24/2014.
 */

(function () {
    'use strict';

    angular
        .module('GSVolunteeringEvents')
        .value('dataSource', {
            data: [],
            isLoaded: function () {
                data.length > 0;
            }
        });

})();