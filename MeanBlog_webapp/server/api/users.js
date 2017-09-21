var User = require('../models/user');
// Users API
module.exports = function(apiRouter, passport, transporter,userupload) {

    // get all posts
    apiRouter.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
    // add a post
    apiRouter.post('/users', function(req, res) {

        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            status: req.body.status,
            role: req.body.role,
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err.message);
                res.send(err.message);
            } else {
                res.send("You have successfully added user");
            }

        });
    });
    apiRouter.post('/users/home', function(req, res) {

        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            status: 0,
            role: "user",
            email: req.body.email
        }), req.body.password, function(err, usr) {
            if (err) {
               // console.error(err.message);
                res.send(err.message);
            } else {
                //res.send("You have successfully registered");
               // console.error(user);
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/verify?id=" + usr._id;//create a url of the host server
                var mailOptions = {
                    from: 'ashutosh@avainfotech.com',
                    to: usr.email,
                    subject: 'Welcome To SLUGr',
                    html: "Hello " + usr.email + ",<br> Please Click on the link to verify.<br><a href=" + link + ">Click here to verify</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                   
                    if (error) {
                        res.send(error);
                    } else {
                        res.send("You have successfully registered.Please verify your email!");
                    }
                });
               
            }

        });
    });
    apiRouter.post('/users/forgetpass', function(req, res) {
        
        
        User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, usr) {
                if (usr) {
                host = req.get('host');//remember the server (i.e host) address
                link = "http://" + req.get('host') + "/forgotpassword?id=" + usr.salt;//create a url of the host server
                var mailOptions = {
                    from: 'ashutosh@avainfotech.com',
                    to: usr.email,
                    subject: 'Forgot Password',
                    html: "Hello " + usr.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        res.json("Email has not been sent!");
                    } else {
                        res.json("Email has been sent please check your email");
                    }
                });
            } else {
                res.json("Email has not been registered!");
            }

    });

    });
  apiRouter.post('/users/changepass', function(req, res) {
        
   User.findOne({'salt': req.body.salt}, function(err, sanitizedUser) {
        console.log(sanitizedUser);
        if (sanitizedUser) {
            sanitizedUser.setPassword(req.body.password, function() {
                sanitizedUser.save();
                res.send('password reset successful');
            });
        } else {
            res.send('user does not exist');
        }

 });

    });
    apiRouter.post('/users/login', function(req, res) {
        passport.authenticate('local')(req, res, function() {
            res.json(req.user);
            //console.log(req.user)
            // res.send("You have successfully login");
        });
    });
    // get a single post
    apiRouter.post('/edituser', function(req, res) {
        User.findById({'_id': req.body.path}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

    // update a post
    apiRouter.post('/editusrID', function(req, res) {
        //console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.gin = req.body.gin;
            user.pin = req.body.pin;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.country = req.body.country;
            user.dob = req.body.dob;
            user.role = req.body.role;
            user.status = req.body.status;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json('User updated!');
            })

        });
    });
        // update a post
    apiRouter.post('/editusrhome', function(req, res) {
        //console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.gin = req.body.gin;
            user.pin = req.body.pin;
            user.phone = req.body.phone;
            user.address = req.body.address;
            user.country = req.body.country;
            user.dob = req.body.dob;
            user.profilepic = req.body.profilepic;
            user.doca = req.body.doca;
            user.docb = req.body.docb;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json('User updated!');
            })

        });
    });
    apiRouter.post('/uploaduserimage',userupload.array('file',3), function(req, res, next) {
       // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });
    // delete a user
    apiRouter.post('/deleteuser', function(req, res) {
        User.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'User deleted!'});
        })
    });
};