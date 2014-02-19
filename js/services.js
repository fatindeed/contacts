angular.module('AppServices', [])
.factory('ContactsService', function($rootScope, $q) {
  return {
		slice: function(contacts, offset, size) {
			var endOffset = offset + size > contacts.length ? offset + size : contacts.length;
			var i = offset, j = 0, results = new Array();
			while(i < endOffset) {
				if(contacts[i].photos != null) {
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
				results[j] = contacts[i];
				i++;
				j++;
			}
			return results;
		}
  };
});

function photoNotFound(img) {
	img.src = 'img/default-photo.png';
	img.onerror = null;
}