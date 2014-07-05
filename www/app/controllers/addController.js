/**
 * Created by ejimenez on 5/26/2014.
 */

app.controller('addController', ['$scope', '$rootScope', 'volunteerService', "$route", 'cordovaService', '$document', function ($scope, $rootScope, service, $route, cordovaService, $document) {
    var currentEvent = null;

    $rootScope.$on("$routeChangeStart", function(){
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.loading = false;
    });

    if ($route.current.params.id) {
        $scope.state = "Update";
        var id = parseInt($route.current.params.id);
        service.getVolunteerEvent(id).then(function (data) {

            currentEvent = data;
            $scope.event = service.getNewVolunteerEvent({
                date: currentEvent.date,
                name: currentEvent.name,
                hours: currentEvent.hours
            });
        });

    } else {
        $scope.state = "Add";
        $scope.event = service.getNewVolunteerEvent();
    }

    $scope.addEvent = function (event) {
        mytestscroll();
        try {
            var errors = Validate(event);
            if (errors.length > 0) {
                cordovaService.alert(errors.join('\r\n'), 'Validation');
                return;
            }

            if (!currentEvent) {
                service.addVolunteerEvent(event).then(function () {
                    cordovaService.notify("Event was added!", 'short', 'top');
                    $scope.event = service.getNewVolunteerEvent();
                });
            } else {
                currentEvent.date = $scope.event.date;
                currentEvent.name = $scope.event.name;
                currentEvent.hours = $scope.event.hours;
                cordovaService.notify("Event was updated!", 'short', 'top');
            }

        } catch (ex) {
            cordovaService.notify("ERROR - " + ex.message, 'long', 'center');
        }
    };

    $scope.clearEvent = function () {
        currentEvent = null;
        $scope.event = service.getNewVolunteerEvent();
        cordovaService.notify(cordovaService.connectionType(), "short", "top")
    };

    function mytestscroll() {
        var frame = document.getElementById("scroll-pane");
        var scrollTo = document.getElementById("hours");
        frame.scrollTop = scrollTo.offsetTop;
    }

    function Validate(event) {
        var error = [];
        if (!event.name)
            error.push("Event name is required!");

        if (event.hours === null)
            error.push("Event hours is required!");

        if (event.hours !== null && isNaN(event.hours))
            error.push("Event hours must be a number");

        if (event.hours !== null && !isNaN(event.hours) && !(event.hours > 0 && event.hours < 25))
            error.push("Event hours must be a number from 1 - 24!");

        return error;
    }

}]);
