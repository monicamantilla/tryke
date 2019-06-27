var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Tryke.findAll({}).then(function(dbTryke) {
      res.json(dbTryke);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Tryke.create(req.body).then(function(dbTryke) {
      res.json(dbTryke);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Tryke.destroy({ where: { id: req.params.id } }).then(function(dbTryke) {
      res.json(dbTryke);
    });
  });
};
