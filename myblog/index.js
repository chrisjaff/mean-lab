var http = require("http");
var express = require("express");
var ecstatic = require("ecstatic");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose= require("./db/connection");

var app     = express();
var Blog    = mongoose.model("Blog");

app.set("port", process.env.PORT || 4000);
app.set("view engine", "hbs");
app.engine(".hbs", hbs ({
  extname:     ".hbs",
      partialsDir: "views/",
      layoutsDir:   "views/",
      defaultLayout:"layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.render("blog-welcome");
});

app.get("/api/blogs", function(req, res){
  Blog.find({}).then(function(blogs){
    res.render("blogs-index", {
      blogs: blogs
    });
    res.json(blogs)
  });
});

app.get("/api/blogs/:title", function(req, res){
  Blog.findOne({title: req.params.title}).then(function(candidate){
    res.render("blogs-show", {
      Blog: Blog
    });
      res.json(blog)
  });
});

app.post("/api/blogs", function(req, res) {
  Blog.create(req.body.blog).then(function(blog){
    res.redirect("/blogs/" + blog.title);
      res.json(blog)
  });
});

app.delete("/api/blogs/:name/delete", function(req, res) {
  Blog.findOneAndRemove({title: req.params.name}).then(function(){
    res.redirect('/blogs')
    res.json({success: true})
  });
});

app.put("/api/blogs/:title", function(req,res){
  Blog.findOneAndUpdate({title: req.params.title}, req.body.blog, {new: true}).then(function(blog){
    res.redirect("/blogs/" + blog.title);
    res.json(blog)
  });
});

app.listen(app.get("port"), function(){
  console.log("Make it rain!");
});
