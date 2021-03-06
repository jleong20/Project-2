db = require('../models');
var passport = require('passport');
require('../config/passport.js')

module.exports = function (app) {
  app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
  }));
  app.post('/api/signup', function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, '/api/login');
      })
      // .catch(function (err) {
      //   res.status(401).json(err);
      // });
  });

  app.get('/logout', function (req, res) {
    req.logout();

    res.redirect('/');
  });
  app.get('/api/userData', function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
