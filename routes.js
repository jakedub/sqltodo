const express = require('express');
const router = express.Router();
const models = require("./models");


router.get('/', function (req, res) {
  res.render("todo");
});
//todos is all that is returned. Index action
router.get('/todos', function(req,res){
  models.Todos.findAll().then(function(todos){
    res.render('todos', {todos: todos})
  });
});

// create action
router.post('/todos', function(req,res) {
  let todo = {
    todo: req.body.todo,
    yetTodo: true
  };
  models.Todos.create(todo).then(function(promise){
    res.redirect('/todos');
  });
});

module.exports = router;
