/*global angular */
angular.module("LunchCheck", [])
    .controller("LunchCheckController", ['$scope', function($scope){
        $scope.itemsStr = ''
        
        $scope.checkTooMuch = function(){
            
            if ($scope.itemsStr == "") {
                $scope.message = "Please enter data first"
                return
            }
            
            var items = $scope.itemsStr.split(",")
            
            if ( items.length > 3) {
                $scope.message = "Too much!"
            } 
            else {
                $scope.message = "Enjoy!"
            }
        }
    }])