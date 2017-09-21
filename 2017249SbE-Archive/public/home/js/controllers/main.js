/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MainCtrl', function ($scope,Portfolios,$timeout) {
      Portfolios.all().then(function(res) {
        if (res == null) {
            console.log(res);
        } else {
            $scope.portfolio={};
            $scope.portfolio=res;
           // console.log(res);                  
        }
    });
    
//    $scope.contactus=function(form){
//         console.log(form);
//   Portfolios.sendEmail(form).then(function(res) {
//                console.log(res);
//            });   
//    }

$timeout(function() {
    //       / setTimeout(tinymce.init({ selector:'#description' }), 3000); 
                    var slideIndex = 0;
                    showSlides();
                    function showSlides() {
                        var i;
                        var slides = document.getElementsByClassName("mySlides");
                        
                        var dots = document.getElementsByClassName("dot");
                        for (i = 0; i < slides.length; i++) {
                            slides[i].style.display = "none";
                        }
                        slideIndex++;
                        if (slideIndex > slides.length) {
                            slideIndex = 1
                        }
                        for (i = 0; i < dots.length; i++) {
                            dots[i].className = dots[i].className.replace(" active", "");
                        }
                            slides[slideIndex - 1].style.display = "block";
                            dots[slideIndex - 1].className += " active";
                        
                        setTimeout(showSlides, 3000);
    
                    }
    
                }, 0.500)

  })
    