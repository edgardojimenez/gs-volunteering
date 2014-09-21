/**
 * User: ejimenez
 * Date: 3/20/13
 * Time: 11:44 PM
 */

(function () {
    angular
        .module('GSVolunteeringEvents')
        .factory('config', function() {

            return (function (win) {
                'use strict';

                var selected, environment,
                    localHost = 'localhost';

                environment = {
                    production: {
                        serverUrl: 'http://mobws.azurewebsites.net',
                        apiKey: '49492ABA-1F13-4E02-8ADC-1206FA203858',
                        ttlMinutes: 1
                    },
                    development: {
                        serverUrl: 'http://localhost:56665',
                        apiKey: '23B5D06B-DC43-42A4-84E2-61A531736155',
                        ttlMinutes: 1
                    },
                    stage: {
                        serverUrl: ''
                    }
                };

                function setEnvInternal(env) {
                    return selected = environment[env];
                }

                if (win.location.hostname === localHost) {
                    selected = environment.development;
                } else {
                    selected = environment.production;
                }

                return {
                    setEnvironment: setEnvInternal,
                    environment: selected
                };

            })(window);

    });
})();