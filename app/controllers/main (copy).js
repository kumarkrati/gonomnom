ng.module('app').controller('main', [
  '$scope',
  function ($scope) {
	 $scope.list = [
	 	{
		 name: "Spanish",
 		 type:"Cuisine"
 		},
 		{
		 name: "Spicy",
 		 type:"Food Type",
 		 options:["Med Spicy","High Spicy"]
 		},
 		{
		 name: "Chicken",
 		 type:"Dish",
 		 options:["Oily","Less Oily","Med Oily"]
 		}
	 ];
  }
   
]);

