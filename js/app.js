angular.module('contactsApp', [
  'ionic',
  'AppServices',
  'AppControllers'
])
.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|content):|data:image\//);
  $stateProvider
    .state('contacts', {
      url: '/contacts',
      abstract: true,
      templateUrl: 'templates/contacts.html'
    })
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
  $urlRouterProvider.otherwise('/contacts/list');
});
