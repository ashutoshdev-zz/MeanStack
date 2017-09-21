
var contactsModule = angular.module('fwrk.contacts', []);

contactsModule.service('Contacts', function($http) {
    
    return {
                all: function(){
		return $http.get('/api/contact/all').then(function(all){
				return all.data;
			});
		},
                remove: function(msg) {
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/deletemsg',
                data: msg
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
	};

});