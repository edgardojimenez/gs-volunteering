/**
 * Created by ejimenez on 5/26/2014.
 */

app.controller('listController', ['$scope', 'volunteerService', '$location', function ($scope, service, $location) {
    $scope.pool.viewTitle = "GS Volunteer Events";
    $scope.events = service.getVolunteerEvents();
    $scope.removeEvent = function (event) {
        service.removeVolunteerEvents(event);
    };
    $scope.updateEvent = function (event) {
        console.log(event);
        $location.path("add/" + event.udi); // path not hash
    };
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