var db = require("../models");

module.exports = function(app) {
  app.get("/api/titles", function(req, res) {
    db.Author.findAll({
      include: [db.Post]
    }).then(function(dbTitle) {
      res.json(dbTitle);
    });
  });

  app.get("/api/titles/:id", function(req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbTitle) {
      res.json(dbTitle);
    });
  });

  app.post("/api/titles", function(req, res) {
    db.Author.create(req.body).then(function(dbTitle) {
      res.json(dbTitle);
    });
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.userName,
      password: req.body.userPassword,
      email: req.body.userEmail,
      email:req.body.userZip
    })
      .then(function() {
        res.redirect(307, "/api/survey");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.delete("/api/titles/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTitle) {
      res.json(dbTitle);
    });
  });
};
