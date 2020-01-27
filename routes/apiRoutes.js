// eslint-disable-next-line no-unused-vars
var db = require("../models");
var passport = require("..config/passport.js");

//Passport routes
app.get("/", function(req, res) {
  if(req.user) {
      res.send(
          "<p>You\'re logged in as <strong>" + req.user.username + "</strong>.</p>"
          + '<p><a href="/logout">Log out</a></p>'
      );
  }
  else {
      res.send('<p><a href="public/index.html">Login</a></p>');
  }
});

app.get("public/index.html", function(req, res) {
  res.send(
      '<form action="public/index.html" method="POST">'
      + '<h2>Login</h2>'
      + '<p><input name="username"></p>'
      + '<p><input name="password"></p>'
      + '<p><input type="submit" value="Login"></p>'
      + '<p style="color: red;">' + req.flash('error') + '</p>'
      + '</form>'
      
  );
});

app.get("public/index.html", function(req, res) {
  req.logout();
  res.redirect("/");
});

//Passport login
app.post(
  "public/index.html",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "public/index.html",
    failureFlash: true
  })
);
  //Passport registry

  // Get all examples - THIS IS BOILERPLATE CODE FOR IF WE END UP USING HANDLEBARS
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
