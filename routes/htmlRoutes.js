var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.redirect("/home");
  });
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/signup.html"));
  });
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/home.html"));
  });
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/survey.html"));
  });
  app.get("/makepost", function(req, res) {
    console.log("hello");
    res.sendFile(path.join(__dirname, "../public/HTML/makepost.html"));
  });
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/user-management.html"));
  });
};
