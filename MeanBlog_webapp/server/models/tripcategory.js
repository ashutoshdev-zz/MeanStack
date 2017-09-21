var mongoose = require('mongoose');

var tripcategorySchema = new mongoose.Schema({
	name: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},       
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

tripcategorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Tripcategory', tripcategorySchema);