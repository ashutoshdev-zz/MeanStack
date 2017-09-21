var express = require('express'),
        path = require('path'),
        User = require('./models/user'),
        Post = require('./models/post'),
        Trip = require('./models/trip'),
        Page = require('./models/page'),
        Contact = require('./models/contact'),
        Portfolio = require('./models/portfolio'),
        Trip = require('./models/trip'),
        Category = require('./models/category'),
        Tripcategory = require('./models/tripcategory'),
        rootPath = path.normalize(__dirname + '/../'),
        apiRouter = express.Router(),
        sm = require('sitemap'),
        nodemailer = require('nodemailer'),
        //smtpTransport = require('nodemailer-smtp-transport'),
        aws = require('aws-sdk'),
        multer = require('multer'),
        multerS3 = require('multer-s3'),
        dateNow = Date.now(),
        router = express.Router();
var transporter = nodemailer.createTransport({
    host: 'email-smtp.us-west-2.amazonaws.com',
    port: 587,
    auth: {
        user: "AKIAJM5AVNfbdB4IHHHUZCQ",
        pass: "At7QdmRYHSZeghg0YQGFcMi/PghgfhBpzkjehGfshPmW/kncioGB"
    }
});

var mailOptions = {
    from: 'ashutosh@avainfotech.com',
    to: 'ramit@avainfotech.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
aws.config.update({
    secretAccessKey: 'X56Bws/kR3DieAlQlR5d3rGkghgh5kIal7QDRNQGQi1h',
    accessKeyId: 'AKIAI7LSghgYS5YVXUBOBPA'
});

var s3 = new aws.S3({endpoint: 'https://s3.eu-central-1.amazonaws.com',
    region: 'eu-central-1',
    signatureVersion: 'v4',
    ACL: 'public-read'
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'slugimage',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'blogimage/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});
var userupload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'slugimage',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'profilepic/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});
var tripupload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'slugimage',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null, 'trips/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});
module.exports = function(app, passport) {
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/posts')(apiRouter, upload);
    require('./api/pages')(apiRouter,transporter);
    require('./api/users')(apiRouter, passport, transporter, userupload);
    require('./api/portfolios')(apiRouter);
    require('./api/categories')(apiRouter);
    require('./api/contacts')(apiRouter);
    require('./api/tripcategories')(apiRouter);
    require('./api/trips')(apiRouter,tripupload);
    // home route
    router.get('/', function(req, res) {
        if (req.isAuthenticated() && req.user.status === '1') {
            res.render('home/index', {user: req.user});
        } else {
            console.log('You are not an admin');
            res.render('home/index', {user: ''});
        }

    });
    router.get('/home', function(req, res) {
        if (req.isAuthenticated() && req.user.status === '1') {
            res.render('home/home', {user: req.user});
        } else {
            console.log('You are not an admin');
            res.redirect('/');
        }
    });

    router.post('/upload', upload.array('photos', 3), function(req, res, next) {
        res.send('Successfully uploaded ' + req.files.length + ' files!')
    });

    router.get('/sendemail', function(req, res) {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });
//    router.get('/admin/register', function(req, res) {
//        res.render('admin/register');
//    });
    router.get('/admin/dashboard', isAdmin, function(req, res) {
        //  console.log(req.user);
        res.render('admin/dashboard', {user: req.user});
    });

    router.get('/response', function(req, res) {
        //console.log(req.query);
        User.findOne({'email': req.query.email}, function(err, usr) {
            //console.log(usr);
            if (usr) {
                if (!err && usr.email === req.query.email) {
                    res.send({valid: false});
                } else {
                    res.send({valid: true});
                }
            } else {
                res.send({valid: true});
            }
        });
    });
    router.get('/forgotpassword', function(req, res) {
        //console.log(req.query.id);
        User.findOne({'salt': req.query.id}, function(err, user) {
            //console.log(user);
            if (user==null) {
                res.render('404');
            } else {
                res.render('home/forgetpassword',{salt: req.query.id});
            }
        });
    });
    router.get('/verify', function(req, res) {//url for password verification    
        // console.log(req.query.id);
        User.findOne({'_id': req.query.id}, function(err, user) {
            if (err) {
                res.json('Hmm! Your account is not associated with us!');
            } else {
                user.status = "1";
                user.save(function(err) {
                    if (err) {
                        res.json('Hmm! Your account is not associated with us!');
                    } else {
                        res.json('Your account has been activated');
                    }
                })
            }
        });
    });
    router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    router.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/home/#/',
                failureRedirect: '/'
            }));

    router.get('/auth/google', passport.authenticate('google', {scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
    router.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/home/#/',
                failureRedirect: '/'
            }));

    router.get('/admin/users', isAdmin, function(req, res) {
        res.render('admin/users', {user: req.user});
    });
    router.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/admin');
    });
    router.get('/home/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });
    router.get('/admin/register', function(req, res) {
        res.render('admin/register');
    });

    router.post('/register', function(req, res) { 
        console.log(req.body);
    var userid = req.body.id;
    var username = req.body.username;
    var newPass = req.body.password;
   // console.log(username, userid)
   User.findOne({'salt': req.body.id}, function(err, sanitizedUser) {
        console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(newPass, function() {
                sanitizedUser.save();
                res.send('password reset successful');
            });
        } else {
            res.send('user does not exist');
        }

 });

    });
    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/admin/dashboard');
    });
    ///sitemap
    router.get('/sitemap.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls = [];
            if (mongourls) {
                for (var i = 0; i < 2; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};

                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://test.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });

    router.get('/sitemap1.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls = [];
            if (mongourls) {
                for (var i = 0; i < mongourls.length; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};

                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://test.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });

    router.get('/about', function(req, res) {
        res.render('home/about');
    });

    router.get('/whoweare', function(req, res) {
        res.render('home/whoweare');
    });
    router.get('/triplist', function(req, res) {
        res.render('home/trip');
    });
    router.get('/contact', function(req, res) {
        res.render('home/contact');
    });

    router.get('/blog', function(req, res) {
        res.render('home/blog');
    });
     router.get('/triplist', function(req, res) {
        res.render('home/trip');
    });


    router.get('/faq', function(req, res) {
       res.render('home/faq');
    });


    router.get('/testimonials', function(req, res) {
        res.render('home/testimonials');
    });

  

    router.get('/privacypolicy', function(req, res) {
        res.render('home/privacypolicy');
    });
    router.get('/termandconditions', function(req, res) {
        res.render('home/termandconditions');
    });
    router.get('/trip/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Trip.findOne({'paramal': main_url[1]}, function(err, post) {
                if (post) {
                    // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl = 'https://test.com/' + post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home/tripdetail', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
//    router.get('/pages/*', function(req, res) {
//        res.render('home/pages');
//    });

//    router.get('/admin/dashboard', isAdmin, function(req, res) {
//        res.render('admin/dashboard', {user: req.user});
//    });
    router.get('/404', function(req, res) {
        res.render('404');
    });
    router.get('/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[1]}, function(err, post) {
                if (post) {
                    // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl = 'https://test.com/' + post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404');
        return;
    });
};
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        console.log('admin here');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}
function isLogin(req, res, next) {
    if (req.isAuthenticated() && req.user.status === '1') {
        console.log('user here');
        next();
    } else {
        console.log('You are not an admin');
        res.render('/');
    }
}