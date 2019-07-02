
var db = require("../models");

module.exports = function(app) {
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.Post.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/posts", function(req, res) {
    db.User.findOne({
      where: {
        password: req.body.confirm
      }
    }).then(function(data) {
      if (!data) {
        res.json("password");
      } else {
        console.log(data.id);
        db.Post.create({
          title: req.body.title,
          address: req.body.address,
          zip: req.body.zip,
          party: req.body.party,
          body: req.body.body,
          UserId: data.id
        }).then(function(dbPost) {
          res.json(dbPost);
        });
      }
    });
  });

  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/home", function(req, res) {
    axios
      .get(
        "http://api.eventful.com/json/events/search?location=Orlando&app_key=jMgXTBXqCM9tPCNb"
      )
      .then(function(response) {
        console.log(response.data.events.event[0].description);
      });

    var response = response.data.events.event;

    for (var i = 0; i < 10; i++) {
      var title = document.createElement("h1").text(response[i].title);
      var description = document
        .createElement("h1")
        .text(response[i].description);
      var image = document.createElement("IMG").attr("src", response.image);
    }
    document.getElementById("events").appendChild(title, description, image);
  });
};