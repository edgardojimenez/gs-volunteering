/**
 * Created by ejimenez on 5/26/2014.
 */

app.controller('listController', ['$scope','$rootScope', 'volunteerService', '$location', 'cordovaService', function ($scope, $rootScope, service, $location, cordovaService) {
    $rootScope.$on("$routeChangeStart", function(){
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.loading = false;
    });

    service.getVolunteerEvents().then(function (data) {
        $scope.events = data;
    });

    $scope.removeEvent = function (event, evt) {
        evt.preventDefault();
        cordovaService.confirm("Do you want to remove event?", "Remove Event", function() {
            service.removeVolunteerEvents(event);
        })
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