 var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

 var ShowSchema = new Schema({
   title: String,
   cast: String,
   creators: String,
   description: String,
   seasons: Number,
 });

 var Show = mongoose.model('Show', ShowSchema);

module.exports = Show;
