const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '[事前準備で設定したrootユーザのパスワード]',
  database: 'todo_app'
});

// サーバ起動時に一度だけ接続
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('MySQL connected as id ' + connection.threadId);
});

router.get('/', function (req, res, next) {
  connection.query(
    `select * from tasks;`,
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('DB error');
      }
      res.render('index', {
        title: 'ToDo App',
        todos: results,
      });
    }
  );
});

router.post('/', function (req, res, next) {
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, ?)`,
    [todo],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('DB error');
      }
      res.redirect('/');
    }
  );
});

module.exports = router;