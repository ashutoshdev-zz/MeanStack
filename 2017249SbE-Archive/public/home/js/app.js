
var app = angular.module('fwrk.home', [
	'ui.router','btford.markdown','ngSanitize',
        'fwrk.posts',
        'fwrk.pages',
        'fwrk.portfolios',
		'fwrk.users',
		'fwrk.clients',
		'fwrk.testimonials'
])
.factory('Page', function() {//now this is not working 
   var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
})
.controller('TitleCtrl', function($scope, Page) {
    $scope.Page = Page;
})

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "/home/templates/index.html",
			controller: 'MainCtrl'
		})
		.state('blog',{
			url: "/blog",
			templateUrl: "/home/templates/blog.html",
			controller: 'BlogsCtrl'
		})
		.state('testimonials',{
			url: "/testimonials",
			templateUrl: "/home/templates/testimonials.html",
			controller: 'TestimonialsCtrl'
		})
                .state('post', {
			url: "/*",
			templateUrl: "/home/templates/post.html",
			controller: 'PostCtrl'
		})

		

	$urlRouterProvider.otherwise("/");
});