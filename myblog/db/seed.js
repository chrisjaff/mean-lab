var mongoose = require("./connection");
var seedData = require("./seeds");

var Blog = mongoose.model("Blog");

Blog.remove({}).then(function(){
  Blog.collection.insert(seedData).then(function(){
    process.exit();
  });
});
