angular.module('AppServices', [])
.factory('ContactsService', function($rootScope, $q, $cacheFactory) {
	var isPhone = navigator.contacts;
	var cache = $cacheFactory('appContacts');
	// fake data for test
	var fakeContacts = [
		{'id':0,'photoImage':'http://tp2.sinaimg.cn/1739928273/50/5660563216/0','displayName':'苍井空','phoneNumbers':['202-623-0499'],'emails':['LindaALister@dayrep.com'],'addresses':['2033 Goldcliff Circle, Washington, DC 20005'],'birthday':'March 17, 1990','organizations':[{'name':'Foot Quarters','title':'Human resources administrative assistant'}]},
		{'id':1,'photoImage':'http://tp1.sinaimg.cn/2360092592/50/5687141933/0','displayName':'吉泽明步','phoneNumbers':['301-551-3865'],'emails':['QiaoK@rhyta.com'],'addresses':['615 Doe Meadow Drive, Laurel, MD 20707'],'birthday':'February 22, 1986','organizations':[{'name':'Platinum Interior Design','title':'Operating room technician'}]},
		{'id':2,'photoImage':'http://tp1.sinaimg.cn/2730413600/50/5625588778/0','displayName':'波多野结衣','phoneNumbers':['972-654-1665'],'emails':['ChowPan@jourrapide.com'],'addresses':['4859 Worthington Drive, Plano, TX 75024'],'birthday':'February 14, 1988','organizations':[{'name':'Whitlocks Auto Supply','title':'Dairy farmer'}]},
		{'id':3,'photoImage':'http://tp3.sinaimg.cn/2817102414/50/5684135635/0','displayName':'麻生希AsoNozomi','phoneNumbers':['561-625-6402'],'emails':['LiQinChien@teleworm.us'],'addresses':['1494 Powder House Road, West Palm Beach, FL 33410'],'birthday':'November 15, 1992','organizations':[{'name':'Rogersound Labs','title':'Manufacturing optician'}]},
		{'id':4,'photoImage':'http://tp2.sinaimg.cn/2122775725/50/5677756923/0','displayName':'Rio-Carnival','phoneNumbers':['678-346-7387'],'emails':['DeTeng@jourrapide.com'],'addresses':['2437 Layman Court, Atlanta, GA 30346'],'birthday':'February 23, 1992','organizations':[{'name':'Personal & Corporate Design','title':'Surveyor'}]},
		{'id':5,'photoImage':'http://tp1.sinaimg.cn/1788168684/50/1283205817/0','displayName':'周防雪子Suouyukiko','phoneNumbers':['617-850-0692'],'emails':['ChungYuan@rhyta.com'],'addresses':['313 Gerald L. Bates Drive, Boston, MA 02110'],'birthday':'July 12, 1985','organizations':[{'name':'KB Toys','title':'Clinical laboratory technician'}]},
		{'id':6,'photoImage':'http://tp1.sinaimg.cn/3005997320/50/5669778784/0','displayName':'水咲萝拉Rola','phoneNumbers':['906-776-9496'],'emails':['SunTai@rhyta.com'],'addresses':['2037 Pinewood Avenue, Iron Mountain, MI 49801'],'birthday':'April 29, 1978','organizations':[{'name':'Jack Lang','title':'Residential electrician'}]},
		{'id':7,'photoImage':'http://tp2.sinaimg.cn/1751002661/50/5682505570/0','displayName':'觀月雛乃','phoneNumbers':['409-783-5260'],'emails':['YueYanL@jourrapide.com'],'addresses':['2299 Lynn Ogden Lane, Vidor, TX 77662'],'birthday':'November 25, 1993','organizations':[{'name':'The Polka Dot Bear Tavern','title':'Property custodian'}]},
		{'id':8,'photoImage':'http://tp4.sinaimg.cn/3682262627/50/5671604324/0','displayName':'神咲诗织kamisakishiori','phoneNumbers':['303-595-4608'],'emails':['LiHuaChia@armyspy.com'],'addresses':['894 Sampson Street, Denver, CO 80202'],'birthday':'October 30, 1988','organizations':[{'name':'Payless Cashways','title':'Production assistant'}]},
		{'id':9,'photoImage':'http://tp3.sinaimg.cn/5032694046/50/5687008233/0','displayName':'JULIA_CLAP','phoneNumbers':['301-975-8557'],'emails':['LiQinHung@jourrapide.com'],'addresses':['1002 Lake Floyd Circle, Gaithersburg, MD 20877'],'birthday':'April 22, 1990','organizations':[{'name':'Wheels Discount Auto','title':'Payroll clerk'}]}
  ];
  return {
		load: function() {
			var deferred = $q.defer();
			var cacheResult = cache.get('contactsData');
			if(cacheResult) {
				deferred.resolve(cacheResult);
			}
	  	else if(isPhone) {
				var fields = ['displayName', 'name', 'photos'];
				var options = new ContactFindOptions();
				options.filter = '';
				options.multiple = true;
		  	navigator.contacts.find(fields, function(results) {
		  		var i, contact, contacts = new Object();
					for(i = 0; i < results.length; i++) {
						contact = results[i];
						if(contact.photos != null) {
							contact.photoImage = contact.photos[0].value;
						}
						else {
							contact.photoImage = 'img/default-photo.png';
						}
						if(contact.displayName == null) {
							if(contact.name != null) {
								contact.displayName = contact.name.familyName + contact.name.givenName;
							}
							else {
								contact.displayName = '- No Name -';
							}
						}
						contacts[contact.id] = contact;
					}
					console.log(contacts);
					cache.put('contactsData', contacts);
					$rootScope.$apply(function () {
						deferred.resolve(contacts);
					});
				},
				function(err) {
					$rootScope.$apply(function () {
						deferred.reject(error);
					});
				}, options);
	  	}
	  	else {
				cache.put('contactsData', fakeContacts);
				deferred.resolve(fakeContacts);
	  	}
	  	return deferred.promise;
		},
		getList: function() {
			return cache.get('contactsData');
		},
		getItem: function(contactId) {
			var contacts = cache.get('contactsData');
			return contacts[contactId];
		}
  };
});

function photoNotFound(img) {
	img.src = 'img/default-photo.png';
	img.onerror = null;
}