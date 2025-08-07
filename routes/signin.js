const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  console.log(`isAuth: ${isAuth}`);
  knex("tasks")
    .select("*")
    .then(function (results) {
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
      });
    });
});

router.post('/', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  knex("users")
    .where({
      name: username,
      password: password,
    })
    .select("*")
    .then((results) => {
      if (results.length === 0) {
        res.render("signin", {
          title: "Sign in",
          errorMessage: ["ユーザが見つかりません"],
        });
      } else {
        req.session.userid = results[0].id; // ここでセット
        res.redirect('/');
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signin", {
        title: "Sign in",
        errorMessage: [err.sqlMessage],
        isAuth: false,
      });
    });
});

module.exports = router;