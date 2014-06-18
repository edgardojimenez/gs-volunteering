/**
 * Created by ejimenez on 5/26/2014.
 */

app.controller('addController', ['$scope', '$rootScope', 'volunteerService', "$route", function ($scope, $rootScope, service, $route) {
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
        try {
            if (!Validate(event)) {
                //$scope.messageNotify.show("An event is required!", "error");
                return;
            }

            if (!currentEvent) {
                service.addVolunteerEvent(event).then(function () {
                    //$scope.messageNotify.show("Event was added!", "success");
                    $scope.event = service.getNewVolunteerEvent();
                });
            } else {
                currentEvent.date = $scope.event.date;
                currentEvent.name = $scope.event.name;
                currentEvent.hours = $scope.event.hours;
                //$scope.messageNotify.show("Event was updated!", "success");
            }

            //$scope.volunteerEvents = service.getVolunteerEventNames();
        } catch (ex) {
            //$scope.messageNotify.show("ERROR - " + ex.message, "error");
            //Log
        }
    };

    $scope.clearEvent = function () {
        currentEvent = null;
        $scope.event = service.getNewVolunteerEvent();
    };
//
//    $scope.removeEvent = function (event) {
//        service.removeVolunteerEvents(event);
//    };
//
//
    function Validate(event) {
        return event.name;
    }
//
//    function onShow(e) {
//        console.log(e.view.params);
//    }

    //$("#autocomplete").value(event.name);
//    $scope.groceries = [];
//    $scope.$emit('message', '');
//
//    service.getGroceries().success(function (data) {
//        if (data) {
//            for (var i = 0; i < data.length; i++)
//                $scope.groceries.push({ product: data[i].productName, id: data[i].productId});
//
//        }
//    }).error(function(err) {
//        $scope.$emit('message', 'error: ' + err.message);
//    });
//
//    $scope.removeGrocery = function(id, index) {
//        service.removeGrocery(id).success(function (data) {
//            $scope.groceries.splice(index,1);
//        }).error(function(err) {
//            $scope.$emit('message', 'error: ' + err.message);
//        });
//    };

}]);
