
var tripcategoriesModule = angular.module('fwrk.tripcategories', []);
//categories
//Categories
//Category
tripcategoriesModule.service('Tripcategories', function($http) {

    return {
        all: function() {
            return $http.get('/api/trip/categories').then(function(tripcategoryList) {
                return tripcategoryList.data;
            });
        },
        add: function(newCategory) {
            return $http({
                method: 'post',
                url: '/api/trip/categories',
                data: newCategory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the newCategory!');
                console.error(err);
                return err;
            });
        },  
        remove: function(usr) {
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/trip/deletecategory',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the cat!');
                console.error(err);
                return err;
            });

        },
        update: function(usr) {

            return $http({
                method: 'post',
                url: '/api/trip/cateditbyID',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Category!');
                console.error(err);
                return err;
            });

        },
        sigledata: function(id) {
            return $http({
                method: 'post',
                url: '/api/trip/catparmal',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Category!');
                console.error(err);
                return err;
            });
        }
    };
});