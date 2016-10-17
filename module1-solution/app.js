/*global angular */
angular.module("LunchCheck", [])
    .controller("LunchCheckController", ['$scope', function($scope){
        $scope.itemsStr = ''
        
        $scope.checkTooMuch = function(){
            
            var items = $scope.itemsStr.split(",")
            
            if ( items.length > 3) {
                $scope.message = "Too much!"
            } 
            else {
                $scope.message = "Enjoy!"
            }
        }
    }])