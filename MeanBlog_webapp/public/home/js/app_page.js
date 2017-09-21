var app = angular.module('fwrk.home', [
    'ui.router',
    'fwrk.pages',
    'fwrk.posts' ,
    'fwrk.categories',
]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider          
            .state('post', {
                url: "/*",
                templateUrl: "/home/templates/post.html",
                controller: 'PostCtrl'
            })
            .state('edit', {
                url: "/edit",
                templateUrl: "/home/templates/edit.html",
                controller: 'ProfileCtrl'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/home/templates/blog.html',
                controller: 'BlogCtrl'
            })
            .state('triplist', {
                url: '/triplist',
                templateUrl: '/home/templates/blog.html',
                controller: 'PostCtrl'
            })
            .state('whoweare', {
                url: '/whoweare',
                templateUrl: '/home/templates/whoweare.html',
                controller: 'PostCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/home/templates/about.html',
                controller: 'PostCtrl'
            }) 
            .state('contact', {
                url: '/contact',
                templateUrl: '/home/templates/contact.html',
                controller: 'PostCtrl'
            })                       
           .state('home', {
                url: "/",
                templateUrl: "/home/templates/myprofile.html",
                controller: 'PagesCtrl'
            })
            .state('posttrip', {
             url: "/posttrip",
             templateUrl: "/home/templates/trips/addposttrip.html",
             controller: 'PosttripCtrl'
            })
            .state('forgotpassword', {
                url: "/forgotpassword",
                templateUrl: "/home/templates/forgetpassword.html",
                controller: 'ForgetCtrl'
            });            
})