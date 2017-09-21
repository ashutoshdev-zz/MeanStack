
var categoriesModule = angular.module('fwrk.categories', []);
//categories
//Categories
//Category
categoriesModule.service('Categories', function($http) {

    return {
        all: function() {
            return $http.get('/api/categories').then(function(categoryList) {
                return categoryList.data;
            });
        },
        add: function(newCategory) {
            return $http({
                method: 'post',
                url: '/api/categories',
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
                url: '/api/deletecategory',
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
                url: '/api/cateditbyID',
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
                url: '/api/catparmal',
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