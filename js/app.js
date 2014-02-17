var onDeviceReady = function() {
	if(!navigator.contacts) {
		alert('Contacts API not supported', 'Error');
		return false;
	}
	angular.bootstrap(document, ['contactsApp']);
}
document.addEventListener('deviceready', onDeviceReady);

angular.module('contactsApp', [
  'ionic',
  'contacts.services',
  'contacts.controllers'
])
.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('contacts', {
      url: '/contacts',
      abstract: true,
      templateUrl: 'templates/contacts.html'
    })
    // the pet tab has its own child nav-view and history
    .state('contacts.list', {
      url: '/list',
      views: {
        'contacts-tab': {
          templateUrl: 'templates/contact-list.html',
          controller: 'ContactListCtrl'
        }
      }
    })
    .state('contacts.view', {
      url: '/view/:contactId',
      views: {
        'contacts-tab': {
          templateUrl: 'templates/contact-detail.html',
          controller: 'ContactDetailCtrl'
        }
      }
    })
    .state('tab.adopt', {
      url: '/adopt',
      views: {
        'adopt-tab': {
          templateUrl: 'templates/adopt.html'
        }
      }
    })
    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/contacts/list');
});
