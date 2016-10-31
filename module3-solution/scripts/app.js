(function () {
    'use strict';
    angular.module("NarrowItDownApp", [])
        .service("MenuSearchService", MenuSearchService)
        .controller("NarrowItDownController", NarrowItDownController)
        .directive("foundItems", FoundItems);
    
    
    MenuSearchService.$inject = ["$http"]
    NarrowItDownController.$inject = ["MenuSearchService"]

    function FoundItemsDirController() {
        var dirCtrl = this
        dirCtrl.isEmpty = function () {
            return dirCtrl.items.length == 0;
        }
    }

    function FoundItems() {
        var ddo = {
            scope: {
                onRemove: '&removeItem', 
                items: '<'
            }, 
            controller: FoundItemsDirController, 
            controllerAs: 'list', 
            bindToController: true,
            templateUrl: 'foundItems.html'
        }
     
        return ddo
    }

    function NarrowItDownController(MenuSearchService) {
        var narrowDownCtrl = this
      
        narrowDownCtrl.found = []
        narrowDownCtrl.searchTerm = ""
        narrowDownCtrl.findMatches = function (searchWord) {
            var promise = MenuSearchService.getMatchedMenuItems(searchWord);
            promise.then(function (response) {
                narrowDownCtrl.found = response;
                console.log("narrowDownCtrl",narrowDownCtrl.found)
            })
        }
        narrowDownCtrl.removeItem = function (index) {
            narrowDownCtrl.found.splice(index, 1)
        }
    }

    function MenuSearchService($http) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            if (!searchTerm) {
                var foundItems = []
                return foundItems
            }
            return $http({
                method: "GET"
                , url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function success(result) {
                // process result and only keep items that match
                var searchTermLower = searchTerm.toLowerCase();
                var foundItems = []
                var resultItems = result.data.menu_items
                for (var i = 0; i < resultItems.length; i++) {
                    if (resultItems[i].description.toLowerCase().indexOf(searchTermLower) >= 0) {
                        foundItems.push(resultItems[i])
                    }
                }
                // return processed items
                return foundItems;
            });
        }
    }
})()