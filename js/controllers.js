angular.module('AppControllers', [])
.controller('ContactListCtrl', function($scope, $ionicLoading, ContactsService) {
	$scope.loading = $ionicLoading.show({
		content: '<i class="icon ion-loading-a"></i> Loading Contacts...',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 220,
		showDelay: 500
	});
  ContactsService.load().then(function(msg) {
    $scope.contacts = ContactsService.getList();
		$scope.loading.hide();
  }, function(msg) {
    console.error(msg);
  });
})
.controller('ContactDetailCtrl', function($scope, $stateParams, ContactsService) {
  ContactsService.load().then(function(msg) {
    $scope.contact = ContactsService.getItem($stateParams.contactId);
  }, function(msg) {
    console.error(msg);
  });
});
