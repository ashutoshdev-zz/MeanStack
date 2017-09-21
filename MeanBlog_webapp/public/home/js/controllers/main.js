/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MainCtrl', function($scope, Portfolios, $timeout, $interval, $window, Users, $location) {
  
    $timeout(function() {
        $(".regular").slick({
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4
        });
        $("#datepicker").datepicker({
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100y:c+nn',
            maxDate: '-1d'
        });
        $('#logmchk').on("click", function() {
            $('#myModalsigup').modal('hide');
            $('#myModal').modal('show');
        })
        $('#signmchk').on("click", function() {
            $('#myModal').modal('hide');
            $('#myModalsigup').modal('show');
        });
        $('#forgetchk').on("click", function() {
            $('#myModal').modal('hide');
            $('#frget').modal('show');
        });
        $('#login').formValidation({//this uses the formvalidation.io jquery plugin to ensure things like , email and password is provided.
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh',
            },
            // live:"enabled",
            fields: {
                email: {
                    message: "Email is required",
                    validators: {
                        notEmpty: {
                            message: "Please provide an email"
                        },
                        emailAddress: {
                            message: "Invalid Email"
                        },
                    }
                },
                password: {
                    message: "Password required",
                    validators: {
                        notEmpty: {
                            message: "Please provide password"
                        }
                    }
                }
            }
        });
        FormValidation.Validator.securepassword = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                if (value === '') {
                    return true;
                }
                // Check the password strength
                if (value.length < 8) {
                    return {
                        valid: false,
                        message: 'The password must be more than 8 characters long'
                    };
                }
                // The password doesn't contain any uppercase character
                if (value === value.toLowerCase()) {
                    return {
                        valid: false,
                        message: 'The password must contain at least one upper case character'
                    }
                }
                // The password doesn't contain any uppercase character
                if (value === value.toUpperCase()) {
                    return {
                        valid: false,
                        message: 'The password must contain at least one lower case character'
                    }
                }
                // The password doesn't contain any digit
                if (value.search(/[0-9]/) < 0) {
                    return {
                        valid: false,
                        message: 'The password must contain at least one digit'
                    }
                }
                return true;
            }
        };
        $('#signup').formValidation({//this uses the formvalidation.io jquery plugin to ensure things like , email and password is provided.
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh',
                excluded: [':disabled', ':hidden', ':not(:visible)'],
            },
            live: "enabled",
            fields: {
                email: {
                    message: "Email is required",
                    validators: {
                        notEmpty: {
                            message: "Please provide your Email"
                        },
                        emailAddress: {
                            message: "Invalid Email"
                        },
                        remote: {
                            message: 'The E-mail is already registered',
                            url: 'http://localhost:8080/response'
                        }
                    }
                },
                password: {
                    message: "Password required",
                    validators: {
                        notEmpty: {
                            message: "Please provide password"
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: 'The password and its confirm are not the same'
                        },
                        securepassword: true
                    }
                },
                ConfirmPassword: {
                    message: "Confirm Password required",
                    validators: {
                        notEmpty: {
                            message: "Please provide confirm password"
                        },
                        identical: {
                            field: 'password',
                            message: 'The password and its confirm are not the same'
                        },
                        securepassword: true
                    }
                },
                dob: {
                    validators: {
                        callback: {
                            message: 'The birthday is not valid',
                            callback: function(value, validator, $field) {
                                if (value === '') {
                                    return true;
                                }

                                // Check if the value has format of DD.MM.YYYY or DD.MM.YY
                                return moment(value, 'DD.MM.YYYY', true).isValid()
                                        || moment(value, 'DD.MM.YY', true).isValid();
                            }
                        }
                    }
                }


            }
        });
        $('#forget').formValidation({//this uses the formvalidation.io jquery plugin to ensure things like , email and password is provided.
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh',
            },
            // live:"enabled",
            fields: {
                email: {
                    message: "Email is required",
                    validators: {
                        notEmpty: {
                            message: "Please provide your Email"
                        },
                        emailAddress: {
                            message: "Invalid Email"
                        }
                    }
                }
            }
        });
      
    }, 1000);
    $scope.user = {};
    $scope.login = function() {
        //console.log(Object.keys(this.user).length);
        //return false;
        if (Object.keys(this.user).length == 0) {
            return false;
        } else {
            //console.log(this.user);
            Users.login(this.user).then(function(res) {
                console.log(res);
                if (res.data == "Unauthorized") {
                    $scope.message = "Wrong email and password!";
                } else if (res.status == 0) {
                    $scope.message = "Please verify your email address!";
                } else {
                    $scope.message = "You have successfully logedIn";
                    $window.localStorage['email'] = JSON.stringify(res.email);
                    $window.localStorage['firstname'] = JSON.stringify(res.firstname);
                    $window.localStorage['lastname'] = JSON.stringify(res.lastname);
                    var myprofile = function() {
                        $window.location.reload();
                    };
                    $timeout(myprofile, 1000);
                    //console.log("here1");
                }
            });
        }
    }
    $scope.message = false;
    $scope.signup = function() {
       // console.log(this.user);
        if(Object.keys(this.user).length < 4){
            $scope.message = "Please enter empty fields!";
            return false;
        }
        Users.homeadd(this.user).then(function(res) {
            if (res) {
                $scope.message = res;
                // console.log(res);
            } else {
                $scope.message = res;
                //console.log(res);
            }
        });
    }
    $scope.forgetpass = function() {
        //console.log(this.user);
        if (Object.keys(this.user).length == 0) {
            $scope.message = "Please enter your email!";
            return false;
        }
        Users.forgetpass(this.user).then(function(res) {
            if (res) {
                $scope.message = res;
                // console.log(res);
            } else {
                $scope.message = res;
                //console.log(res);
            }
        });
    }
     
});
app.controller('ProfileCtrl', function($scope, Users,$rootScope) {

   
     $scope.uploadFile = function(input) {
          $scope.loading = true;
     // console.log(input.files[0]);
        Users.uploadimage(input.files[0]).then(function(res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {                
                $rootScope.imgshow = res[0].location;
            } 
        });
    }
    $scope.user = {};
            $scope.user.firstname = $rootScope.currentUser.firstname;
            $scope.user.lastname = $rootScope.currentUser.lastname;
            $scope.user.gin = $rootScope.currentUser.gin;
            $scope.user.pin = $rootScope.currentUser.pin;
            $scope.user.email = $rootScope.currentUser.email;
            $scope.user.dob = $rootScope.currentUser.dob;
            $scope.user.address = $rootScope.currentUser.address;
            $scope.user.phone = $rootScope.currentUser.phone;
            $scope.user.country = $rootScope.currentUser.country;
            $scope.user.profilepic = $rootScope.currentUser.profilepic;
            

 
    $scope.editUser = function(usr) {
        //console.log(usr);
        $scope.update = false;
        $scope.newUser = {};

        $scope.newUser.firstname = usr.firstname;
        $scope.newUser.lastname = usr.lastname;
        if($rootScope.imgshow){
        $scope.newUser.profilepic = $rootScope.imgshow;
     }else {
         $scope.newUser.profilepic = $scope.user.profilepic;
     }
       
        $scope.newUser.gin = usr.gin;
        $scope.newUser.pin = usr.pin;
        $scope.newUser.phone = usr.phone;
        if(usr.country){
        $scope.newUser.country = usr.country.name;
      }else {
          $scope.newUser.country = usr.country;
      }
        $scope.newUser.address = usr.address;
        $scope.newUser.doca = usr.doca;
        $scope.newUser.docb = usr.docb;
        $scope.newUser.dob = usr.dob;
        $scope.newUser.id = $rootScope.currentUser._id;
        Users.homeupdate($scope.newUser).then(function(res) {
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
app.controller('BlogCtrl', function($scope, $timeout, Categories,Posts) {
    $scope.catlist={};
    Categories.all().then(function(data) {
        $scope.catlist=data;
        //console.log(data);
    });
   $scope.postlist={};
    Posts.all().then(function(data) {
        $scope.postlist=data;
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

app.controller('PagesCtrl', function($scope) {

    

});
app.controller('ForgetCtrl', function($scope, $timeout, Users,$rootScope) {
    
  //  console.log($rootScope.salt);

       $scope.forgotpassword = function(user) {
       // console.log(user);
        if (!user) {
            $scope.message = "Please enter password && confirm password";
            return false;
        }else if(!user.password){
             $scope.message = "Please enter password!";
            return false;
        }else if(!user.confirmpassword){
             $scope.message = "Please enter confirm password!";
            return false;
        }
        else if(user.password!=user.confirmpassword) {
            $scope.message = "The password and its confirm are not the same";
             return false;
        }
        user.salt=$rootScope.salt;
        console.log(user);
        Users.chnagepass(user).then(function(res) {
            
            if (res) {
                $scope.message = res;
                // console.log(res);
            } else {
                $scope.message = res;
                //console.log(res);
            }
        });
    }
});

    