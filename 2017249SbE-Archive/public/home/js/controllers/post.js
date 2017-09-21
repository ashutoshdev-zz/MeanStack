/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('PostCtrl', function($scope, Posts, Pages,Portfolios, $location,PagerService) {
    $scope.url = {};
    $scope.url.path = $location.absUrl().split('/')[3];
    
    Posts.sigledata($scope.url).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.description = res.description;
            $scope.himage = res.himage;
            $scope.simage = res.simage;
            $scope.title = res.title;
        }
    });
    Pages.singlepost().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
           // console.log(res);
                    $scope.single_name=res.name;
                    $scope.single_desc=res.description;
                    $scope.single_image=res.image;
                    $scope.single_dest=res.designation;                      
        }
    });
     Portfolios.all().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
            $scope.portfolio={};
            $scope.portfolio=res;
           // console.log(res);
                     
        }
    });

    



});
app.controller('ClientsCtrl', function($scope,ClientsList,Clients) {
    
    $scope.posts = ClientsList;
    
});
app.controller('BlogsCtrl', function($scope,Posts,PagerService) {
    // blog pages starts here
    $scope.vm = {};
    Posts.all().then(function(data){
        //$("#mydiv").hide();
        $scope.total_records = data.total;
        $scope.blogs = data.posts;
        console.log(data); 
        // paging start
        $scope.vm.dummyItems = $scope.total_records; // dummy array of items to be paged
       $scope.vm.pager = {};
       $scope.vm.setPage = setPage;
       initController();
    
       function initController() {
           // initialize to page 1
           $scope.vm.setPage(1);
       }

    });
    $scope.pagination = function(start_from,per_page){
        var pagination_attr ={
            offset: start_from,
            limit: per_page
        }
        Posts.pagination(pagination_attr).then(function(data){
            console.log(data)
            $scope.total_records = data.total;
            $scope.blogs = data.posts;
        });
    }

    //set page items - PAGINATION
       function setPage(page) {
           if (page < 1 || page > $scope.vm.pager.totalPages) {
               return;
           }
    
            // get pager object from service
            $scope.vm.pager = PagerService.GetPager($scope.vm.dummyItems, page);
            console.log($scope.vm.pager)
           // get current page items
            $scope.pagination($scope.vm.pager.startIndex,$scope.vm.pager.endPage)
           // get current page of items
        //   $scope.vm.items = $scope.vm.dummyItems.slice($scope.vm.pager.startIndex, $scope.vm.pager.endIndex + 1);
       }
    
});
app.controller('TestimonialsCtrl', function($scope,Testimonial) {
    
    Testimonial.all().then(function(data){
        $scope.testimonials = data;
        console.log($scope.testimonials)
    });
})