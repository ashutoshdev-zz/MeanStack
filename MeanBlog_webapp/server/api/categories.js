var Category = require('../models/category');

// Category API
module.exports = function(apiRouter) {

    // get all categories
    apiRouter.get('/categories', function(req, res) {
        Category.find({}, function(err, categories) {
            if (err)
                res.send(err);

            res.json(categories);
        });
    });
    // add a post
    apiRouter.post('/categories', function(req, res) {
        // console.log(req.body);
        var category = new Category();
        category.name = req.body.name;
        category.description = req.body.description;       
        Category.findOne({'name': req.body.name}, function(err, pst) {
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
    apiRouter.post('/catparmal', function(req, res) {
           console.log(req.body.path);
        Category.findOne({'_id': req.body.path}, function(err, cat) {
            if (err)
                res.send(err);
            
            res.json(cat);
    
        });
    });
    // update a post
    apiRouter.post('/cateditbyID', function(req, res) {
        //console.log(req.body);
        Category.findById({'_id': req.body.id}, function(err, category) {
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
    apiRouter.post('/deletecategory', function(req, res) {
        Category.remove({
            _id: req.body.id
        }, function(err, category) {
            if (err)
                res.send(err);
            res.json({message: 'Category deleted!'});
        })
    });
};