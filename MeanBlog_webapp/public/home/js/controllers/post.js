/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('PostCtrl', function($scope, Posts, Pages, $location, $timeout) {
    $scope.url = {};
    $scope.url.path = $location.absUrl().split('/')[3];
    Posts.sigledata($scope.url).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.description = res.description;
            $scope.postimg = res.postimg;
            $scope.created_at = res.created_at;
            $scope.title = res.title;
        }
    });
//    Pages.singlepost().then(function(res) {
//        if (res == null) {
//            console.log(res);
//        } else {
//           // console.log(res);
//                    $scope.single_name=res.name;
//                    $scope.single_desc=res.description;
//                    $scope.single_image=res.image;
//                    $scope.single_dest=res.designation;                      
//        }
//    });
//     Portfolios.all().then(function(res) {
//        if (res == null) {
//            console.log(res);
//        } else {
//            $scope.portfolio={};
//            $scope.portfolio=res;
//           // console.log(res);
//                     
//        }
//    });
});
app.controller('PosttripCtrl', function($scope, Trips, $http, Tripcategories, $timeout, $rootScope) {
    if (localStorage.getItem('TraTour_global') == null) {
        $scope.TraTour_HS = true;
    } else {
        $scope.TraTour_HS = false;
        $rootScope.user_role = localStorage.getItem('TraTour_global');
    }
    $scope.cat = {};
    Tripcategories.all().then(function(data) {
        $scope.cat = data;
    });
    $scope.uploadFile = function(input) {
        $scope.loading = true;
        Trips.uploadimage(input.files[0]).then(function(res) {
            //console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $scope.imgshow = res[0].location;
            }
        });
    };
    $scope.addTrip = function(trip) {
        trip.tripimg = $scope.imgshow;
        trip.status = 0;
        trip.user_id = $rootScope.currentUser._id;
        if ($rootScope.user_role) {
            trip.user_role = $rootScope.user_role;
        } else {
            trip.user_role = trip.user_role;
        }
        trip.date = $('#datepicker').val();
        trip.date_end = $('#datepicker2').val();
        // console.log(trip); 
        trip.paramal = trip.title.replace(/ /gi, '-');
        Trips.add(trip).then(function(res) {
            console.log(res);
            if (res) {
                $scope.message = res;
            } else {
                $scope.message = res;
            }
        });
    };
    $timeout(function() {
        $("#datepicker").datepicker();
        $("#datepicker2").datepicker();
        // $("#createtrip").modal("show");
    }, 0.500);
});
/**
 *TourtripCtrl 
 */
app.controller('TourtripCtrl', function($scope, Trips, $http, Tripcategories, $timeout, $rootScope) {
    if (localStorage.getItem('TraTour_global') == null) {
        $scope.TraTour_HS = true;
    } else {
        $scope.TraTour_HS = false;
        $rootScope.user_role = localStorage.getItem('TraTour_global');
    }
    $scope.cat = {};
    Tripcategories.all().then(function(data) {
        $scope.cat = data;
    });
    $scope.uploadFile = function(input) {
        $scope.loading = true;
        Trips.uploadimage(input.files[0]).then(function(res) {
            //console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $scope.imgshow = res[0].location;
            }
        });
    };
    $scope.addTrip = function(trip) {
        trip.tripimg = $scope.imgshow;
        trip.status = 0;
        trip.user_id = $rootScope.currentUser._id;
        if ($rootScope.user_role) {
            trip.user_role = $rootScope.user_role;
        } else {
            trip.user_role = trip.user_role;
        }
        trip.date = $('#datepicker').val();
        trip.date_end = $('#datepicker2').val();
        // console.log(trip); 
        trip.paramal = trip.title.replace(/ /gi, '-');
        Trips.add(trip).then(function(res) {
            console.log(res);
            if (res) {
                $scope.message = res;
            } else {
                $scope.message = res;
            }
        });
    };
    $timeout(function() {
        $("#datepicker").datepicker();
        $("#datepicker2").datepicker();
        // $("#createtrip").modal("show");
    }, 0.500);
});
/**
 * TriplistCtrl
 */
app.controller('TripdetailCtrl', function($scope, Trips, $location, $timeout, $timeout, Tripcategories) {
    $scope.url = {};
    $scope.url.path = $location.absUrl().split('/')[3];
    Trips.sigledata($scope.url).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.description = res.description;
           // $scope.postimg = res.postimg;
            $scope.created_at = res.created_at;
            $scope.title = res.title;
        }
    });  
});
app.controller('TriplistCtrl', function($scope, Trips, $location, $timeout, $timeout, Tripcategories) {
    //category list// post list
    $scope.catlist = {};
    Tripcategories.all().then(function(data) {
        $scope.catlist = data;
        //console.log(data);
    });
    $scope.postlist = {};
    Trips.all().then(function(data) {
        $scope.postlist = data;
        //console.log(data);
    });
    //console.log($scope.catlist);
    $timeout(function() {
        $(".filter-button").click(function() {
            var value = $(this).attr('data-filter');

            if (value == "all")
            {
                $('.filter').show('1000');
            }
            else
            {
                $(".filter").not('.' + value).hide('3000');
                $('.filter').filter('.' + value).show('3000');

            }
        });

        if ($(".filter-button").removeClass("active")) {
            $(this).removeClass("active");
        }
        $(this).addClass("active");

    }, 1000);
});

