app.controller('PagesCtrl', function($scope,Pages) {

    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "355px";
        document.getElementById("overlay1").style.display = "block";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("overlay1").style.display = "none";
    }
    
    $scope.dropNav = function() {

        // document.getElementById("editprofile1").style.display = "block";
        var x = document.getElementById('editprofile1');
        if (x.style.height === '0px') {
            x.style.height = '136px';
        } else {
            x.style.height = '0px';
        }
    }

    $scope.Contact = function(contact) {        
     Pages.contact(contact).then(function(res) {
        if (res == null) {
            $scope.message = res;
        } else {
           $scope.message = res;
        }
    });
    }

});