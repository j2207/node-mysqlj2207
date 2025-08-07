const express = require('express');
const router = express.Router();
const knex = require("../db/knex");
router.get('/', function (req, res, next) {
  res.render('signup', {
    title: 'Sign up',
  });
});

router.post('/', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const repassword = req.body.repassword;

  knex("users")
    .where({name: username})
    .select("*")
    .then(function (result) {
      if (result.length !== 0) {
        res.render("signup", {
          title: "Sign up",
          errorMessage: ["このユーザ名は既に使われています"],
        }) 
      } else if (password === repassword) {
        knex("users")
          .insert({name: username, password: password})
          .then(function () {
            res.redirect("/");
          })
          .catch(function (err) {
            console.error(err);
            res.render("signup", {
              title: "Sign up",
              errorMessage: [err.sqlMessage],
            });
          });
      } else {
        res.render("signup", {
          title: "Sign up",
          errorMessage: ["パスワードが一致しません"],
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      res.render("signup", {
        title: "Sign up",
        errorMessage: [err.sqlMessage],
      });
    });
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const knex = require('../db/knex');

// router.get('/', (req, res) => {
//   res.render('signup', { title: 'Sign up' });
// });

// router.post('/', async (req, res) => {
//   const { username, password, repassword } = req.body;
//   if (!username || !password || !repassword) {
//     return res.render('signup', { title: 'Sign up', error: '全て入力してください' });
//   }
//   if (password !== repassword) {
//     return res.render('signup', { title: 'Sign up', error: 'パスワードが一致しません' });
//   }
//   try {
//     // 既存ユーザー確認
//     const users = await knex('users').where({ username });
//     if (users.length > 0) {
//       return res.render('signup', { title: 'Sign up', error: 'そのユーザー名は既に使われています' });
//     }
//     // ユーザー登録
//     await knex('users').insert({ username, password });
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.render('signup', { title: 'Sign up', error: '登録に失敗しました' });
//   }
// });

// module.exports = router;