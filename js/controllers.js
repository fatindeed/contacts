angular.module('AppControllers', [])
.controller('ContactListCtrl', function($scope, ContactsService) {
	$scope.offset = 0;
	$scope.loadMore = function() {
		console.log('offset: ' + $scope.offset);
		if($scope.offset < 0) return false;
		if(navigator.contacts != undefined) {
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
		else {
			// fake data here
			$scope.contacts = [
				{'id':1,'photoImage':'img/default-photo.png','displayName':'Test User 1'},
				{'id':2,'photoImage':'img/default-photo.png','displayName':'Test User 2'},
				{'id':3,'photoImage':'img/default-photo.png','displayName':'Test User 3'}
			];
		}
  };
	ionic.Platform.ready(function() {
		$scope.loadMore();
	});
})
.controller('ContactDetailCtrl', function($scope, $stateParams, ContactsService) {
	if(navigator.contacts != undefined) {
		var fields = ['*'];
		var options = new ContactFindOptions();
		options.filter = $stateParams.contactId;
		options.multiple = true;
		navigator.contacts.find(fields, function(contacts) {
			$scope.$apply(function() {
				$scope.contact = ContactsService.getById(contacts, $stateParams.contactId);
			});
		}, function(error) {
			$scope.$apply(function() {
				$scope.error = error;
			});
		}, options);
	}
	// fake data here
	else {
		$scope.contact = {
			'id':1,
			'photoImage':'img/default-photo.png',
			'displayName':'Test User 1'
		};
	}
});
