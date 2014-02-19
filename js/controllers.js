angular.module('AppControllers', [])
.controller('ContactListCtrl', function($scope, ContactsService) {
	if(navigator.contacts != undefined) {
		var fields = ['displayName', 'name', 'photos'];
		var options = new ContactFindOptions();
		options.filter = '';
		options.multiple = true;
		navigator.contacts.find(fields, function(contacts) {
			$scope.$apply(function() {
				$scope.contacts = ContactsService.slice(contacts, 0, contacts.length);
			});
		}, function(error) {
			$scope.$apply(function() {
				$scope.error = error;
			});
		}, options);
	}
	else {
		$scope.contacts = ContactsService.getFakeList();
	}
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
	else {
		$scope.contact = ContactsService.getFakeRecord($stateParams.contactId);
	}
});
