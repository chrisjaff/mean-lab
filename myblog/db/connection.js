var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  location: String
})

mongoose.model("Blog", BlogSchema);
mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/blog")

module.exports = mongoose;
