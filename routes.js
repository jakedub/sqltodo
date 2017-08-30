const express = require('express');
const router = express.Router();
const models = require("./models");


router.get('/', function (req, res) {
  res.render("todo");
});
//todos is all that is returned. Index action
router.get('/todos', function(req,res){
  models.Todos.findAll().then(function(todos){
    res.render('todo', {todos: todos})
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

// router.post('/completed', function (req, res){
//   let completed = req.body.marked;
//   models.Todos.create(todo).then(function(marked){
//     models.Todos.find(marked).yetTodo = false;
//     res.redirect('/todos');
//   });
// });


router.post('/completed', function (req,res){
  let completed = req.body.marked;
  let id = req.body.id;
  models.Todos.findbyId(id).then(function someName(marked){
    models.Todos.save(someName).yetTodo = false;
  })
  res.redirect('/');
  });


module.exports = router;
