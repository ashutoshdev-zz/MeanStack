var Tripcategory = require('../models/tripcategory');

// Category API
module.exports = function(apiRouter) {

    // get all categories
    apiRouter.get('/trip/categories', function(req, res) {
        Tripcategory.find({}, function(err, tripcategories) {
            if (err)
                res.send(err);

            res.json(tripcategories);
        });
    });
    // add a post
    apiRouter.post('/trip/categories', function(req, res) {
        // console.log(req.body);
        var category = new Tripcategory();
        category.name = req.body.name;
        category.description = req.body.description;       
        Tripcategory.findOne({'name': req.body.name}, function(err, pst) {
           // console.log(pst)
            if (pst) {
                if (!err && pst.name === req.body.name) {
                    res.send("Please make unique name of category! Its already exist!");
                } else {
                    category.save(function(err, category) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added post");
                        }
                    })
                }
            } else {
                category.save(function(err, category) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added category");
                    }
                })
            }
        });
    });

    
    // get a single post
    apiRouter.post('/trip/catparmal', function(req, res) {
           console.log(req.body.path);
        Tripcategory.findOne({'_id': req.body.path}, function(err, cat) {
            if (err)
                res.send(err);
            
            res.json(cat);
    
        });
    });
    // update a post
    apiRouter.post('/trip/cateditbyID', function(req, res) {
        //console.log(req.body);
        Tripcategory.findById({'_id': req.body.id}, function(err, category) {
            if (err)
                res.send(err);            
            category.name = req.body.name;
            category.description = req.body.description;           
            category.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Category updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/trip/deletecategory', function(req, res) {
        Tripcategory.remove({
            _id: req.body.id
        }, function(err, category) {
            if (err)
                res.send(err);
            res.json({message: 'Category deleted!'});
        })
    });
};