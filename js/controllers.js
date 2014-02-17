angular.module('AppControllers', [])
.controller('ContactListCtrl', function($scope) {
	ionic.Platform.ready(function(){
		var options = new ContactFindOptions();
		options.filter = '';
		options.multiple = true;
		var fields = ['*']
		navigator.contacts.find(fields, function(contacts) {
			$scope.$apply(function() {
				$scope.contacts = contacts;
			});
		}, function(error) {
			$scope.$apply(function() {
				$scope.error = error;
			});
		}, options);
	});
})
.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
	$scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
		$scope.mainImageUrl = phone.images[0];
	});
	$scope.setImage = function(imageUrl) {
		$scope.mainImageUrl = imageUrl;
	}
});
