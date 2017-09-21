var Contact = require('../models/contact');
// Pages API
module.exports = function(apiRouter) {
    apiRouter.get('/contact/all', function(req, res) {

        Contact.find({}, function(err, contact) {
            if (err)
                res.send(err);

            res.json(contact);
        });
    });
      apiRouter.post('/deletemsg', function(req, res) {
        Contact.remove({
            _id: req.body.id
        }, function(err, msg) {
            if (err)
                res.send(err);
            res.json({message: 'Contact deleted!'});
        })
    });

};