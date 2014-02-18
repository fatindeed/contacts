angular.module('AppControllers', [])
.controller('ContactListCtrl', function($scope) {
	$scope.isLoading = true;
	ionic.Platform.ready(function() {
		var options = new ContactFindOptions();
		options.filter = '';
		options.multiple = true;
		var fields = ['*']
		navigator.contacts.find(fields, function(contacts) {
			$scope.$apply(function() {
				for(var i = 0; i < contacts.length; i++) {
					if(contacts[i].displayName != null) {
						contacts[i].photoImage = contacts[i].photos[0].value;
					}
					else {
						contacts[i].photoImage = 'img/default-photo.png';
					}
					if(contacts[i].displayName == null) {
						if(contacts[i].name != null) {
							contacts[i].displayName = contacts[i].name.familyName + contacts[i].name.givenName;
						}
						else {
							contacts[i].displayName = '- No Name -';
						}
					}
				}
				$scope.contacts = contacts;
			});
		}, function(error) {
			$scope.$apply(function() {
				$scope.error = error;
			});
		}, options);
		$scope.isLoading = false;
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
