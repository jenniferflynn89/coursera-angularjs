(function(){
    
   angular.module("ShoppingListCheckOff", [])
       .controller("ToBuyController", ToBuyController)
       .controller("AlreadyBoughtController", AlreadyBoughtController)
       .service("ShoppingListCheckOffService", ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  
    
function ToBuyController(ShoppingListCheckOffService){
    var tobuy = this
    
    tobuy.items = ShoppingListCheckOffService.getToBuyItems();
   
    tobuy.buyItem = function(item, index){
        ShoppingListCheckOffService.addBoughtItem(item, index);
    }
}

function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadybought = this
    
    alreadybought.items = ShoppingListCheckOffService.getBoughtItems();
   
}
    
function ShoppingListCheckOffService(){
    var service = this;

    var boughtItems = []
    var toBuyItems = [{ name: "cookies", quantity: 10 },{ name: "cakes", quantity: 5 },{ name: "sweets", quantity: 100 },{ name: "fruit", quantity: 1 },{ name: "tea", quantity: 55 }]
    
    service.addBoughtItem = function(boughtItem, index){
        
        boughtItems.push(boughtItem);
        
        toBuyItems.splice(index, 1)
    }
    
    service.getToBuyItems = function(){
        return toBuyItems;
    }
    
    service.getBoughtItems = function(){
        return boughtItems;
    }
}
})();




