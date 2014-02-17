angular.module('contacts.controllers', [])
// A simple controller that fetches a list of data from a service
.controller('ContactListCtrl', function($scope, PhoneContacts) {
	PhoneContacts.find().then(function(contacts) {
		$scope.contacts = contacts;
	}, function(error) {
		console.log(error);
	});
	//$scope.orderProp = 'age';
})
// A simple controller that shows a tapped item's data
.controller('ContactDetailCtrl', function($scope, $stateParams, PhoneContacts) {
	$scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
		$scope.mainImageUrl = phone.images[0];
	});
	$scope.setImage = function(imageUrl) {
		$scope.mainImageUrl = imageUrl;
	}
});
