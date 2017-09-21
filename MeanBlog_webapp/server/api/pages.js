var Page = require('../models/page');
var Contact = require('../models/contact');

// Pages API
module.exports = function(apiRouter,transporter) {
    // get all pages
    apiRouter.get('/pages', function(req, res) {
        Page.find({}, function(err, pages) {
            if (err)
                res.send(err);

            res.json(pages);
        });
    });
    apiRouter.post('/pages', function(req, res) {
        var pages = new Page();
        pages.title = req.body.title;
        pages.description = req.body.description;
        pages.role = req.body.role;
        pages.save(function(err, page) {
            if (err)
                res.send(err);

            res.json("Page has been created");
        })
    });
    apiRouter.post('/page/delete', function(req, res) {
        Page.remove({
            _id: req.body.id
        }, function(err, page) {
            if (err)
                res.send(err);
            res.json({message: 'Page deleted!'});
        })
    });
    apiRouter.post('/singlepage', function(req, res) {
        //console.log(req.body.path);
        Page.findOne({'_id': req.body.path}, function(err, page) {
            if (err)
                res.send(err);

            res.json(page);
        });
    });
     apiRouter.post('/contact', function(req, res) {
       var contacts = new Contact();
        contacts.name = req.body.name;
        contacts.email = req.body.email;
        contacts.message = req.body.message;
        contacts.save(function(err, contact) {
            if (err){
                res.send(err);
            }else {
                 var mailOptions = {
                    from: 'ashutosh@avainfotech.com',
                    to: 'ashutosh@avainfotech.com',
                    subject: 'Contact Us',
                    html: "Name:- " + req.body.name + "<br/> Email:- " + req.body.name + "<br/>Message:- " + req.body.message + "<br/>"
                };
                transporter.sendMail(mailOptions, function(error, info) {                   
                    if (error) {
                        res.send(error);
                    } else {
                        res.send("Your message has been sent");
                    }
                });
        }
        });    
    });
    apiRouter.post('/editpages', function(req, res) {
        //console.log(req.body);
        Page.findById({'_id': req.body.id}, function(err, page) {
            if (err)
                res.send(err);
            page.title = req.body.title;
            page.description = req.body.description;
            page.role = req.body.role;
            page.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Page updated!');
            })

        });
    });
};