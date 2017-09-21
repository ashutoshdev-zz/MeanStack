
var pagesModule = angular.module('fwrk.pages', []);

pagesModule.service('Pages', function($http) {

    return {
        all: function() {
            return $http.get('/api/pages').then(function(pageList) {
                return pageList.data;
            });
        },
        add: function(newPage) {
            return $http({
                method: 'post',
                url: '/api/pages',
                data: newPage
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(newPage) {
            return $http({
                method: 'post',
                url: '/api/page/delete',
                data: newPage
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        update: function(newPage) {
                 return $http({
                method: 'post',
                url: '/api/editpages',
                data: newPage
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                //console.error(err);
                return err;
            });

        },
          sigledata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/singlepage',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                console.error(err);
                return err;
            });
        },
            contact: function(data) {

            return $http({
                method: 'post',
                url: '/api/contact',
                data: data
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                console.error(err);
                return err;
            });
        }
    };
});