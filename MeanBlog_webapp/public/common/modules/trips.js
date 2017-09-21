
var tripsModule = angular.module('fwrk.trips', []);

tripsModule.service('Trips', function($http) {

    return {
        all: function() {
            return $http.get('/api/trips').then(function(tripList) {
                return tripList.data;
            });
        },
        add: function(newPost) {
            console.log(newPost);
            return $http({
                method: 'post',
                url: '/api/trips',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the trips!');
                console.error(err);
                return err;
            });
        },
        remove: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/trips/delete',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the trip!');
                console.error(err);
                return err;
            });
        },
        update: function(newPost) {
            return $http({
                method: 'post',
                url: '/api/trips/editparmal',
                data: newPost
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the trip!');
                console.error(err);
                return err;
            });

        },
        sigledata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/trips/parmal',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the trip!');
                console.error(err);
                return err;
            });
        },
        uploadimage: function(image) {
            //console.log("dd");
            //console.log(image);
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            return $http({
                method: 'post',
                url: '/api/trips/uploadimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the trips!');
                console.error(err);
                return err;
            });
        }
    };
});