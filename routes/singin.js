const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
router.get('/', function (req, res, next) {
  res.render('signin', {
    title: 'Sign in',
  });
});

module.exports = router;