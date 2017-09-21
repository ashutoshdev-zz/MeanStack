/**
 * @author ashu
 * @param {type} param1
 * @param {type} param2
 */
adminApp.controller('AllPostsCtrl', function($scope, postList, $interval, Posts, $timeout) { 
    $scope.posts = postList;
    $scope.activePost = false;
    $scope.setActive = function(post) {
        $scope.activePost = post;
    }
    $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    }, 0.500);

    $scope.deletepost = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Posts.remove($scope.data).then(function(res) {
            // console.log(res);
            if (res) {
                $scope.del = res.message;
                // alert(res.message);
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
/**
 *@author sdf 
 */
adminApp.controller('AddUserCtrl', function($scope, Users) {
    $scope.message = false;
    $scope.addUser = function() {
        if (this.user.password != this.user.cpassword) {
            $scope.message = "Incorrect confirm password";
            return;
        }
        Users.add(this.user).then(function(res) {
            if (res) {
                $scope.message = res;
                console.log(res);
            } else {
                $scope.message = res;
                console.log(res);
            }
        });

    }

});
adminApp.controller('dashboardCtrl', function($scope) {
    

});
adminApp.controller('profileCtrl', function($scope) {

});
adminApp.controller('userListCtrl', function($scope, $interval, Users, userList, $timeout) {


    $scope.users = userList;
    $scope.activeUser = false;
    $scope.setActive = function(user) {
        $scope.activeUser = user;
    }
    $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    }, 0.500);

    $scope.deleteUser = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Users.remove($scope.data).then(function(res) {
            console.log(res);
            if (res) {
                $scope.del = res.message;
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});

adminApp.controller('AddPostCtrl', function($scope,categoryList, Posts,$http) {     
    $scope.cat=categoryList;
    // console.log($scope.cat);
     $scope.uploadFile = function(input) {
          $scope.loading = true;
     // console.log(input.files[0]);
        Posts.uploadimage(input.files[0]).then(function(res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {                
                $scope.imgshow = res[0].location;
            } 
        });
    };
    $scope.addPost = function() {
     // console.log(this.post);
      this.post.postimg=$scope.imgshow;
      $scope.paramal=this.post.paramal;    
      this.post.paramal = $scope.paramal.replace(/ /gi,'-');      
        Posts.add(this.post).then(function(res) {
            //console.log(res);
            if (res) {
                $scope.message = res;
            } else {
                $scope.message = res;
            }
        });
    };
});
/**
 * EditPostsCtrl
 */
adminApp.controller('EditPostsCtrl', function($scope, Posts, $stateParams,categoryList) {
     $scope.cat=categoryList;
    $scope.post = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Posts.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            //console.log(res);
            $scope.post.description = res.description;
            $scope.post.postimg = res.postimg;
            $scope.post.title = res.title;
            $scope.post.paramal = res.paramal;
            $scope.post.metadescription = res.metadescription;
            $scope.post.metakeywords = res.metakeywords;
            $scope.post.category = res.category;
            $scope.post.id = res._id;
            $scope.imgshow=$scope.post.postimg;
        }
    });
    
      $scope.uploadFile = function(input) {
          $scope.loading = true;
     // console.log(input.files[0]);
        Posts.uploadimage(input.files[0]).then(function(res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {                
                $scope.imgshow = res[0].location;
            } 
        });
    }
    $scope.editPost = function() {
        $scope.update = false;
        $scope.newPost = {};
        $scope.newPost.postimg = $scope.imgshow;
        $scope.newPost.title = this.post.title;
        $scope.newPost.description = this.post.description;
        $scope.newPost.metadescription = this.post.metadescription;
        $scope.newPost.metakeywords = this.post.metakeywords;
        $scope.newPost.paramal = this.post.paramal;
        $scope.newPost.category = this.post.category;
        $scope.newPost.id = this.post.id;
        Posts.update($scope.newPost).then(function(res) {
          //  console.log(res);
            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
    
});
adminApp.controller('EditUsersCtrl', function($scope, Users, $stateParams) {
    $scope.user = {};
    $scope.params = {};
    $scope.params.path = $stateParams.id;
    // console.log( $scope.params.path);
    Users.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);
            $scope.user.firstname = res.firstname;
            $scope.user.lastname = res.lastname;
            $scope.user.gin = res.gin;
            $scope.user.pin = res.pin;
            $scope.user.address = res.address;
            $scope.user.phone = res.phone;
            $scope.user.role = res.role;
            $scope.user.status = res.status;
            $scope.user.email = res.email;
            $scope.user.dob = new Date(res.dob);
            $scope.user.id = res._id;
        }
    });
    $scope.editUser = function(usr) {
       //console.log(usr);
        $scope.update = false;
        $scope.newUser = {};

        $scope.newUser.firstname =usr.firstname;
        $scope.newUser.lastname = usr.lastname;
        $scope.newUser.status = usr.status;
        $scope.newUser.role = usr.role;
        $scope.newUser.dob = usr.dob;
        $scope.newUser.gin = usr.gin;
        $scope.newUser.pin = usr.pin;
        $scope.newUser.address = usr.address;
           if(usr.country){
        $scope.newUser.country = usr.country.name;
      }else {
          $scope.newUser.country = usr.country;
      }
        $scope.newUser.phone = usr.phone;
        $scope.newUser.id = usr.id;
       // console.log($scope.newUser);
        Users.update($scope.newUser).then(function(res) {
           // console.log(res);
            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
    $scope.countries = [ 
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'Andorra', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote D\'Ivoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: 'Lao People\'s Democratic Republic', code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russian Federation', code: 'RU'},
    {name: 'Rwanda', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Vietnam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'}
  ];
});
adminApp.controller('categoryListCtrl', function($scope, categoryList, $interval, Categories, $timeout) {
    $scope.categories = categoryList;
    $scope.activeCategory = false;
    $scope.setActive = function(category) {
        $scope.activeCategory = category;
    }
    $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    }, 0.500);

    $scope.deletecategory = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Categories.remove($scope.data).then(function(res) {
            // console.log(res);
            if (res) {
                $scope.del = res.message;
                // alert(res.message);
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
adminApp.controller('AddCategoryCtrl', function($scope, Categories) {
    $scope.addCategory = function() {
        //console.log(this.category);
        Categories.add(this.category).then(function(res) {
           // console.log(res);
            if (res) {
                $scope.message = res;
            } else {
                $scope.message = res;
            }
        });
    };
});
adminApp.controller('editCategoryCtrl', function($scope, Categories, $stateParams) {
    $scope.category = {};
    $scope.params = {};
    $scope.params.path = $stateParams.id;
  // console.log( $scope.params.path);
    Categories.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);
            $scope.category.name = res.name;
            $scope.category.description = res.description;
            $scope.category.id = res._id;
        }
    });
    $scope.editCategory = function() {
        $scope.update = false;
        $scope.newcat = {};
        $scope.newcat.name = this.category.name;
        $scope.newcat.description = this.category.description;
        $scope.newcat.id = this.category.id;
        Categories.update($scope.newcat).then(function(res) {
           // console.log(res);
            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
});
adminApp.controller('AddPageCtrl', function($scope,Pages,$http) {     
    $scope.role={0:'WHO WE ARE',1:'FAQ',2:'POST',3:'PLAN',4:'DRIVE',5:'ENJOY',6:'Get in Touch',7:'Our Location',8:'24x7 Support',
    9:'FooterText',10:'PrivacyPolicy',11:'HOMEPAGECONTENT'};
    $scope.addPage = function(page) {
        //console.log(page)
        Pages.add(page).then(function(res) {
            console.log(res);
            if (res) {
                $scope.message = res;
            } else {
                $scope.message = res;
            }
        });
    };
});
adminApp.controller('pageListCtrl', function($scope, pageList, $interval, Pages, $timeout) { 
    $scope.pages = pageList;
    $scope.activePage = false;
    $scope.setActive = function(page) {
        $scope.activePage = page;
    }
    $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    }, 0.500);

    $scope.deletepage = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Pages.remove($scope.data).then(function(res) {
            // console.log(res);
            if (res) {
                $scope.del = res.message;
                // alert(res.message);
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
/**
 * EditPostsCtrl
 */
adminApp.controller('EditPagesCtrl', function($scope, Pages, $stateParams) {
      $scope.role={0:'WHO WE ARE',1:'FAQ',2:'POST',3:'PLAN',4:'DRIVE',5:'ENJOY',6:'Get in Touch',7:'Our Location',8:'24x7 Support',
    9:'FooterText',10:'PrivacyPolicy',11:'HOMEPAGECONTENT'};
    $scope.page = {};
    $scope.params = {};
    $scope.params.path = $stateParams.id;
    //console.log($scope.params);
    Pages.sigledata($scope.params).then(function(res) {
      //  console.log(res);
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);
            $scope.page.description = res.description;
            $scope.page.role = res.role;
            $scope.page.title = res.title;
            $scope.page.id = res._id;
        }
    });
    
    $scope.editPage = function() {
        $scope.update = false;
        $scope.newpage = {};
        $scope.newpage.role = this.page.role;
        $scope.newpage.title = this.page.title;
        $scope.newpage.description = this.page.description;
        $scope.newpage.id = this.page.id;
        console.log($scope.newpage);
        Pages.update($scope.newpage).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
    
});
adminApp.controller('messageListCtrl', function($scope, Contacts, $stateParams) {
      Contacts.all().then(function(res) {
        if (res == null) {
            // console.log(res);
        } else {
            $scope.messages = {};
            $scope.messages = res;
            $scope.msg = res;
            $scope.activemsg = false;
            $scope.setActive = function(message) {
                $scope.activemsg = message;
            }
           //console.log(res);                  
        }
    });
         $scope.deletemessage = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Contacts.remove($scope.data).then(function(res) {
            // console.log(res);
            if (res) {
                $scope.del = res.message;
                // alert(res.message);
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
adminApp.controller('AddTripCtrl', function($scope,Trips,$http,tripcategoryList,$timeout,$rootScope) {     
    //console.log($rootScope.currentUser._id);
    $scope.cat = tripcategoryList;
     
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
         trip.tripimg=$scope.imgshow;
         trip.user_id= $rootScope.currentUser._id;
         trip.user_role= "admin";
         trip.date=$('#datepicker').val();
         trip.date_end=$('#datepicker2').val();
        // console.log(trip); 
         trip.paramal = trip.title.replace(/ /gi,'-');      
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
     $( "#datepicker" ).datepicker();  
     $( "#datepicker2" ).datepicker();  
 }, 0.500);
});
adminApp.controller('tripListCtrl', function($scope, tripList, $interval, Trips, $timeout) {   
    $scope.trips = tripList;
    $scope.activeTrip = false;
    $scope.setActive = function(trip) {
        $scope.activeTrip = trip;
    }
    $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    }, 0.500);

    $scope.deletetrip = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Trips.remove($scope.data).then(function(res) {
            // console.log(res);
            if (res) {
                $scope.del = res.message;
                // alert(res.message);
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
/**
 * EditPostsCtrl
 */
adminApp.controller('EditTripsCtrl', function($scope, Trips, $stateParams,tripcategoryList,$timeout) {
   $scope.cat = tripcategoryList;
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    $scope.trip = {};
    Trips.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);                        
            $scope.trip.description = res.description;
            $scope.trip.tripimg = res.tripimg;
            $scope.trip.title = res.title;
            $scope.trip.paramal = res.paramal;
            $scope.trip.gender = res.gender;
            $scope.trip.locationfrom = res.locationfrom;
            $scope.trip.category = res.category;
            $scope.trip.locationto = res.locationto;
            $scope.trip.date = res.date;
            $scope.trip.price_person = res.price_person;
            $scope.trip.nooftravellers = res.nooftravellers;
            $scope.trip.accommodation = res.accommodation;
            $scope.trip.accommodation_info = res.accommodation_info;
            $scope.trip.rental_car = res.rental_car;
            $scope.trip.status = res.status;
            $scope.trip.id = res._id;
            $scope.imgshow=$scope.trip.tripimg;
        }
    });
    
     $scope.uploadFile = function(input) {
          $scope.loading = true;
        Trips.uploadimage(input.files[0]).then(function(res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {                
                $scope.imgshow = res[0].location;
            } 
        });
    };
    
    $scope.editTrip = function() {
        $scope.update = false;
        $scope.newTrip = {};
        $scope.newTrip.tripimg = $scope.imgshow;
        $scope.newTrip.title = this.trip.title;
        $scope.newTrip.description = this.trip.description;
        $scope.newTrip.gender = this.trip.gender;
        $scope.newTrip.locationfrom = this.trip.locationfrom;
        $scope.newTrip.locationto = this.trip.locationto;
        $scope.newTrip.category = this.trip.category;
        $scope.newTrip.date =$('#datepicker').val();
        $scope.newTrip.price_person = this.trip.price_person;
        $scope.newTrip.nooftravellers = this.trip.nooftravellers;
        $scope.newTrip.accommodation = this.trip.accommodation;
        $scope.newTrip.accommodation_info = this.trip.accommodation_info;
        $scope.newTrip.rental_car = this.trip.rental_car;
        $scope.newTrip.status = this.trip.status;
        $scope.newTrip.id = this.trip.id;
        Trips.update($scope.newTrip).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
    $timeout(function() {
     $( "#datepicker" ).datepicker();  
 }, 0.500);
    
});
adminApp.controller('tripcategoryList', function($scope, tripcategoryList, $interval, Tripcategories, $timeout) {
    $scope.categories = tripcategoryList;
    $scope.activeCategory = false;
    $scope.setActive = function(category) {
        $scope.activeCategory = category;
    }
    $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': false,
            'ordering': true,
            'info': true,
            'autoWidth': false
        })
    }, 0.500);

    $scope.deletecategory = function(id) {
        $scope.data = {};
        $scope.data.id = id;
        $('.' + id).css('display', 'none');
        // console.log($scope.data);
        Tripcategories.remove($scope.data).then(function(res) {
            // console.log(res);
            if (res) {
                $scope.del = res.message;
                // alert(res.message);
                //window.location.reload();
            } else {
                $scope.del = "error";
            }
        });
    }
});
adminApp.controller('addTripCategory', function($scope, Tripcategories) {
    $scope.addCategory = function() {
        console.log(this.category);
        Tripcategories.add(this.category).then(function(res) {
            console.log(res);
            if (res) {
                $scope.message = res;
            } else {
                $scope.message = res;
            }
        });
    };
});
adminApp.controller('editTripCategory', function($scope, Tripcategories, $stateParams) {
    $scope.category = {};
    $scope.params = {};
    $scope.params.path = $stateParams.id;
   console.log( $scope.params.path);
    Tripcategories.sigledata($scope.params).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);
            $scope.category.name = res.name;
            $scope.category.description = res.description;
            $scope.category.id = res._id;
        }
    });
    $scope.editCategory = function() {
        $scope.update = false;
        $scope.newcat = {};
        $scope.newcat.name = this.category.name;
        $scope.newcat.description = this.category.description;
        $scope.newcat.id = this.category.id;
        Tripcategories.update($scope.newcat).then(function(res) {
            console.log(res);
            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }
});