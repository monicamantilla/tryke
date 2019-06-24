var path = require("path");

module.exports = function(app) {
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "./signup.html"));
  });
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "./survey.html"));
  });
  app.use("/makepost", function(req, res) {
    res.sendFile(path.join(__dirname, "./makepost.html"));
  });
};
