const express = require('express');
const router = express.Router();
const models = require("./models");


router.get('/', function (req, res) {
  res.render("todo");
});
//todos is all that is returned. Index action
router.get('/todo', function(req,res){
  models.Todos.findAll().then(function(todos){
    res.render('todo', {todos: todos})
  });
});

// create action
router.post('/todo', function(req,res) {
  let todo = {
    todo: req.body.todo,
    yetTodo: true
  };
  models.Todos.create(todo).then(function(promise){
    res.redirect('/todo');
  });
});

// const getTodo = function (req, res, next) {
//     models.Todos.findById(req.body.todo).then(function (check) {
//         if (check) {
//             req.todo = todo;
//             next();
//         } else {
//             res.status(404).send('Not found.');
//         }
//     })
// }


//marking for completed
router.post('/complete', function(req,res){
  let id = req.body.marked;
  let todoData = {yetTodo: false};
  let completed = req.body.marked;

models.Todos.findById(id).then(function (check){
    check.update(todoData).then(function(){
      res.redirect('/todo')
    })
  })
});


//editing...doesn't work
router.post("/todo/:id/edit", function(req,res){
  console.log("Do you see me?");
  let input = req.body.newTodo;
  models.Todos.findById(req.params.id).then(function(edit){
    edit.update(input).then(function(){
      res.redirect('/todo');
    })
  })
})


// delete
router.post("/todo/:id/delete", function (req, res) {
  models.Todos.findById(req.params.id).then(function(todo){
    todo.destroy().then(function () {
        res.redirect("/todo");
      })
    });
});

module.exports = router;
