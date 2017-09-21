var express = require('express'),
        path = require('path'),
        User = require('./models/user'),
        Post = require('./models/post'),
        Page = require('./models/page'),
        Portfolio = require('./models/portfolio'),
        Category = require('./models/categories'),
        Client = require('./models/clients'),
        Testimonial = require('./models/testimonials'),
    // nodemailer modules
     nodemailer = require('nodemailer');
    //transporter = nodemailer.createTransport();
    // ends here

        rootPath = path.normalize(__dirname + '/../'),
        apiRouter = express.Router(),
        sm = require('sitemap'),
        router = express.Router();
module.exports = function(app, passport) {
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/posts')(apiRouter);
    require('./api/pages')(apiRouter);
    require('./api/portfolios')(apiRouter);
    require('./api/users')(apiRouter);
    require('./api/categories')(apiRouter);
    require('./api/clients')(apiRouter);
    require('./api/testimonials')(apiRouter);
    // home route
    router.get('/', function(req, res) {
        res.render('index');
    });
    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });
    // router.get('/admin/register', function(req, res) {
    //     res.render('admin/register');
    // });
    router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });
    router.post('/register', function(req, res) {
        // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
        User.register(new User({
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err);
                return;
            }
            // log the user in after it is created
            passport.authenticate('local')(req, res, function() {
                console.log('authenticated by passport');
                res.redirect('/admin/dashboard');
            });
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
            var pageUrls=[];
            if (mongourls) {
                for (var i = 0; i < 2; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};
                    
                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
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
            var pageUrls=[];
            if (mongourls) {
                for (var i = 0; i < mongourls.length; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};
                    
                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
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
    
      router.get('/about',function(req, res) {
        res.render('home/about');
    });
    
     router.get('/contact',function(req, res) {


        // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
//nodemailer.createTestAccount((err, account) => {
    
        // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: account.user, // generated ethereal user
        //         pass: account.pass  // generated ethereal password
        //     }
        // });
        let transporter = nodemailer.createTransport({
            host: 'email-smtp.eu-west-1.amazonaws.com',
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: 'AKIAJRZZS6WH7BZOBIMA',
                pass: 'AqACIIcfGwHLQr+fzT2kbayinQdjmQgZgoWtMdvOkE5t'
            }
        });
        
        // let smtpConfig = {
        //     host: 'email-smtp.eu-west-1.amazonaws.com',
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: 'AKIAJRZZS6WH7BZOBIMA',
        //         pass: 'AqACIIcfGwHLQr+fzT2kbayinQdjmQgZgoWtMdvOkE5t'
        //     }
        // };
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"simerjit@avainfotech.com', // sender address
            to: 'anurag@avainfotech.com, ashutosh@avainfotech.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    //});



        // let smtpConfig = {
        //     host: 'email-smtp.eu-west-1.amazonaws.com',
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: 'AKIAJRZZS6WH7BZOBIMA',
        //         pass: 'AqACIIcfGwHLQr+fzT2kbayinQdjmQgZgoWtMdvOkE5t'
        //     }
        // };
        transporter.verify(function(error, success) {
            if (error) {
                 console.log(error);
            } else {
                 console.log('Server is ready to take our messages');
            }
         });

        var output = transporter.sendMail({
            from: 'anurag@avainfotech.com',
            to: 'simerjit@avainfotech.com',
            subject: 'Message from Anurag',
            text: 'Test mail from nodejs'
        });
        console.log(output)
        console.log('simer')
        res.render('home/contact');
    });
    
      router.get('/blog',function(req, res) {
        res.render('home/blog')
     });
     router.get('/clients',function(req, res) {
         Client.find({},function(err,posts){
             if(err) { return res.send(err)}
             console.log('fghhgffgh')
            // console.log(posts)
             res.render('home/clients',{clients:posts});
         })
        // res.render('home/clients');
    });
    
     router.get('/careers',function(req, res) {
        res.render('home/careers');
    });
    
    router.get('/howwework',function(req, res) {
        res.render('home/howwework');
    });
    
     router.get('/clients',function(req, res) {
        res.render('home/clients');
    });
    
    router.get('/testimonials',function(req, res) {
        res.render('home/testimonials');
    });
    
     router.get('/visionandmission',function(req, res) {
        res.render('home/visionandmission');
    });
    
      router.get('/whyfutureworktechnologies',function(req, res) {
        res.render('home/whyfutureworktechnologies');
    });
    
    router.get('/privacypolicy',function(req, res) {
        res.render('home/privacypolicy');
    });
    router.get('/termandconditions',function(req, res) {
        res.render('home/termandconditions');
    });
    router.get('/faq',function(req, res) {
        res.render('home/faq');
    });
        
      router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });
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
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
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
    if (req.isAuthenticated() && req.user.email === 'ashutosh@avainfotech.com') {
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}