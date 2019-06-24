var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.redirect("/index");
  });
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/signup.html"));
  });
  app.use("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/index.html"));
  });
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/survey.html"));
  });
  app.use("/makepost", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/makepost.html"));
  });
};
