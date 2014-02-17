angular.module('contacts.services', [])
/**
 * A simple example service that returns some data.
 */
.factory('PhoneContacts', function($rootScope, $q) {
  return {
		update: function() {
			var contact = navigator.contacts.create();
			contact.displayName = "Plumber";
			contact.nickname = "Plumber";            // specify both to support all devices
			
			// populate some fields
			var name = new ContactName();
			name.givenName = "Jane";
			name.familyName = "Doe";
			contact.name = name;
			
			// save to device
			contact.save(function(contacts) {
				$rootScope.$apply(function() {
					deferred.resolve(contacts);
				});
			}, function(error) {
				$rootScope.$apply(function() {
					deferred.reject(error);
				});
			});
			return deferred.promise;
		},
		find: function(filter) {
			var deferred = $q.defer();
			//var options = new ContactFindOptions();
			//options.filter = filter;
			//options.multiple = true;
			var fields = ['id', 'displayName', 'name', 'nickname', 'ims', 'birthday', 'note', 'photos', 'categories'];
			navigator.contacts.find(fields, function(contacts) {
				$rootScope.$apply(function() {
					deferred.resolve(contacts);
				});
			}, function(error) {
				$rootScope.$apply(function() {
					deferred.reject(error);
				});
			});
			return deferred.promise;
		}
  };
});
