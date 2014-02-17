/*
{
    'id': '1',
    'rawId': '17',
    'name': {
        'familyName': '加',
        'formatted': '加菲 ',
        'givenName': '菲',
        'middleName': '',
        'honorificPrefix': '',
        'honorificSuffix': ''
    },
    'displayName': 'Gafish',
    'nickname': '加菲',
    'birthday': '1999/01/01',
    'note': 'xx是个好东西',
    'phoneNumbers': [{
        'id': '1',
        'type': 'mobile',
        'value': '13888888888',
        'pref': false
    }],
    'emails': [{
        'id': '1',
        'type': 'home',
        'value': 'gafish@xx.com',
        'pref': false
    }],
    'addresses': [{
        'id': '1',
        'type': 'home',
        'pref': false,
        'postalCode': '310000',
        'formatted': 'xx路xx号xx大厦',
        'locality': '杭州',
        'region': '浙江',
        'country': '中国'
    }],
    'ims': [{
        'id': '1',
        'type': 'qq',
        'value': '88888888',
        'pref': false
    }],
    'organizations': [{
        'id': '1',
        'type': 'work',
        'title': 'xx工程师',
        'department': 'xx部',
        'name': 'xx公司'
        'pref': false,
    }],
    'photos': [{
        'type': 'url',
        'id': '1',
        'value': 'photo8.jpg',
        'pref': false
    }],
    'categories': [{
        'id': '1',
        'type': '',
        'value': 'Business',
        'pref': false
    }],
    'urls': [{
        'id': '1',
        'type': 'work',
        'value': 'www.gafish.net',
        'pref': false
    }]
}
*/

angular.module('contacts.services', [])
/**
 * A simple example service that returns some data.
 */
.factory('PhoneContacts', function($rootScope, $q) {
  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];
  return {
    all: function() {
      return pets;
    },
		create: function() {
			return navigator.contacts.create();
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
