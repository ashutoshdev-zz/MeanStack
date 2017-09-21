var Trip = require('../models/trip');
// Posts API
module.exports = function(apiRouter,upload) {

    // get all posts
    apiRouter.get('/trips', function(req, res) {
        Trip.find({}, function(err, trips) {
            if (err)
                res.send(err);

            res.json(trips);
        });
    });
    // add a post
    apiRouter.post('/trips', function(req, res) {
       // console.log(req.body);
        var trip = new Trip();
        trip.title = req.body.title;
        trip.description = req.body.description;
        trip.category = req.body.category;
        trip.accommodation = req.body.accommodation;
        trip.accommodation_info = req.body.accommodation_info;
        trip.date = req.body.date;
        trip.date_end = req.body.date_end;
        trip.gender = req.body.gender;
        trip.locationfrom = req.body.locationfrom;
        trip.locationto = req.body.locationto;
        trip.nooftravellers = req.body.nooftravellers;
        trip.price_person = req.body.price_person;
        trip.rental_car = req.body.rental_car;
        trip.tripimg = req.body.tripimg;
        trip.paramal = req.body.paramal;
        trip.user_id = req.body.user_id;
        trip.user_role = req.body.user_role;
        trip.status = req.body.status;
        Trip.findOne({'paramal': req.body.paramal}, function(err, pst) {
           // console.log(pst)
            if (pst) {
                   trip.paramal =trip.paramal+'-'+Math.random().toString(16).substr(2);
                                   
            }else {
               
            } 
           // console.log("here");
            // console.log(trip);
            trip.save(function(err, dta) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added Trip");
                        }
                    })
        });
    });

    // get a single post
    apiRouter.get('/trips/:id', function(req, res) {
        Trip.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
      // get a single post
    apiRouter.post('/trips/uploadimage',upload.array('file',3), function(req, res, next) {
       // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });
    // get a single post
    apiRouter.post('/trips/parmal', function(req, res) {

        Trip.findOne({'paramal': req.body.path}, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
//        

    // update a post
    apiRouter.post('/trips/editparmal', function(req, res) {
        //console.log(req.body);
        Trip.findById({'_id': req.body.id}, function(err, trip) {
            if (err)
                res.send(err);            
            trip.title = req.body.title;
            trip.description = req.body.description;
            trip.tripimg = req.body.tripimg;
            trip.gender = req.body.gender;
            trip.locationfrom = req.body.locationfrom;
            trip.locationto = req.body.locationto;    
            trip.category = req.body.category;  
            trip.date = req.body.date;
            trip.price_person = req.body.price_person;
            trip.nooftravellers = req.body.nooftravellers;
            trip.accommodation = req.body.accommodation;
            trip.accommodation_info = req.body.accommodation_info;
            trip.rental_car = req.body.rental_car;
            trip.status = req.body.status;            
            trip.save(function(err) {
                if (err)
                    res.send(err);
                res.json('trip updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/trips/delete', function(req, res) {
        Trip.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Trip deleted!'});
        })
    });
};