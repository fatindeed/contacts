angular.module('AppControllers', [])
.controller('ContactListCtrl', function($scope, ContactsService) {
	$scope.isLoading = true;
	$scope.offset = 0;
	ionic.Platform.ready(function() {
		$scope.$apply(function() {
			$scope.isLoading = false;
		});
		console.log('start call load more first time.');
		$scope.loadMore();
		console.log('finish call load more first time.');
	});
	$scope.loadMore = function() {
		if($scope.offset < 0) return false;
		var fields = ['displayName', 'name', 'photos'];
		var options = new ContactFindOptions();
		options.filter = '';
		options.multiple = true;
		navigator.contacts.find(fields, function(contacts) {
			$scope.$apply(function() {
				results = ContactsService.slice(contacts, $scope.offset, 20);
				for(var i = 0; i < results.length; i++) {
					$scope.contacts.push(results[i]);
					$scope.offset++;
				}
				if($scope.offset >= contacts.length) {
					$scope.offset = -1;
				}
			});
		}, function(error) {
			$scope.$apply(function() {
				$scope.error = error;
			});
		}, options);
  }
})
.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
	$scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
		$scope.mainImageUrl = phone.images[0];
	});
	$scope.setImage = function(imageUrl) {
		$scope.mainImageUrl = imageUrl;
	}
});
