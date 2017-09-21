var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        tripimg: { type: String, required: '{PATH} is required!'},       
        paramal: { type: String},
        gender: { type: String},
        locationfrom: { type: String},
        locationto: { type: String},
        date: { type: String},
        date_end: { type: String},
        price_person: { type: String},
        nooftravellers: { type: String},
        accommodation: { type: String},
        accommodation_info: { type: String},
        rental_car: { type: String},
        user_id: { type: String},
        status: { type: String},
        user_role: { type: String},
        category: { type: String}, 
        tripimage: { type: String},   
        notes: { type: String},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

tripSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Trip', tripSchema);