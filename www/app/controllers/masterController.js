/**
 * Created with JetBrains WebStorm.
 * User: ejimenez
 * Date: 8/7/13
 * Time: 6:12 PM

 */

app.controller('masterController', ['$scope', "$route", '$location', function ($scope, $route, $location) {
    $scope.pool = {};
    $scope.route = $route;

    var templateCache = {};

    $scope.template = function(id) {
        if (templateCache[id])
            return templateCache[id];
        var html = $("#" + id).html();
        var tmpl = function() {
            return html;
        };
        templateCache[id] = tmpl;
        return tmpl;
    };

//    $scope.$on("$routeChangeSuccess", function(ev){
//        var path = $location.path();
//        (function crap(){
//            if (!$scope.tabStrip)
//                return setTimeout(crap, 100);
//            $scope.tabStrip.switchByFullUrl(path.replace(/^\//, "#"));
//        })();
//    });

    // adjust the main view vertical padding to account for header and footer
    function adjustView() {
        $("#mainView").css({
            paddingTop: $("header").height(),
            paddingBottom: $("footer").height()
        });
    }
    $scope.$on("kendoRendered", adjustView);
    $(window).resize(adjustView);
    //$scope.menu = ['list', 'products', 'add'];
    //$scope.message = "";

//    $rootScope.$on('message', function (e, message) {
//        $scope.message = message;
//    });
//
//    $scope.isActive = function (path) {
//        return path === $location.path();
//    };
//
//    $scope.showAlert = function () {
//        return !Boolean($scope.message);
//    };
//
//    $scope.showAlertInfo = function () {
//        return $scope.message.indexOf('info') === 0;
//    };
//
//    $scope.showAlertSuccess = function () {
//        return $scope.message.indexOf('success') === 0;
//    };
//
//    $scope.showAlertError = function () {
//        return $scope.message.indexOf('error') === 0;
//    };
//
//    $scope.showAlertWarning = function () {
//        return $scope.message.indexOf('warning') === 0;
//    };
}]);
