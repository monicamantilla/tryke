var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      name: req.body.userName,
      password: req.body.userPassword,
      email: req.body.userEmail,
      zip: req.body.userZip
    })
      .then(function() {
        res.status(202).json("ok");
        // res.redirect(307, "/home");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
};
