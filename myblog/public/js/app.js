angular
.module("myBlog", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  Router
])
.factory("Blog", [
  "$resource",
  Blog
])
.controller("indexCtrl", [
  "Blog",
  indexController
])
function Router ($stateProvider){
  $stateProvider
  .state("welcome", {
    url: "/",
    templateUrl: "/assets/js/ng-views/welcome.html"
  })

  .state("index", {
    url: "/blogs",
    templateUrl: "assets/js/ng-views/index.html",
    controller: "indexCtrl",
    controllerAs: "vm"
  })
}
function Blog($resource) {
  return $resource("api/blogs/:title", {}, {
    update: { method: "PUT" }
  });
}
function indexController (Blog) {
  this.blogs = Blog.query()
}
