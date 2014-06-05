/**
 * Created by ejimenez on 5/26/2014.
 */

app.controller('addController', ['$scope', 'volunteerService', "$route", '$location', function ($scope, service, $route, $location) {
    $scope.route = $route;
    $scope.pool.viewTitle = "GS Volunteer Event";
    $scope.volunteerEvents = service.getVolunteerEventNames();
    var currentEvent = null;

    if ($scope.route.current.params.id) {
        var uid = $scope.route.current.params.id;
        currentEvent = service.getVolunteerEvent(uid);
        $scope.event = service.getNewVolunteerEvent({ date: currentEvent.get("date"), name: currentEvent.get("name"), hours: currentEvent.get("hours") });
    } else {
        $scope.event = service.getNewVolunteerEvent();
    }

    $scope.messageNotify = $("#notification").kendoNotification({
        position: {
            top: 20,
            right: 20
        }
    }).data("kendoNotification");

    $scope.addEvent = function (event) {
        try {
            if (!Validate(event)) {
                $scope.messageNotify.show("An event is required!", "error");
                return;
            }

            if (!currentEvent) {
                service.addVolunteerEvent(event);
                $scope.messageNotify.show("Event was added!", "success");
                $scope.event = service.getNewVolunteerEvent();
            } else {
                currentEvent.set("date", $scope.event.get("date"));
                currentEvent.set("name", $scope.event.get("name"));
                currentEvent.set("hours", $scope.event.get("hours"));
                $scope.messageNotify.show("Event was updated!", "success");
            }

            $scope.volunteerEvents = service.getVolunteerEventNames();
        } catch (ex) {
            $scope.messageNotify.show("ERROR - " + ex.message, "error");
            //Log
        }
    };

    $scope.removeEvent = function (event) {
        service.removeVolunteerEvents(event);
    };


    function Validate(event) {
        return event.name;
    }

    function onShow(e) {
        console.log(e.view.params);
    }

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
