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

models.Todos.findById(id).then(function (check){
    check.update(todoData).then(function(){
      res.redirect('/todo')
    })
  })
});


//Editing...doesn't work

//Edit update
router.get('/todo/:id', function(req,res){
  res.render('edit', {id: req.params.id})
});

router.post('/todo/:id', function(req,res){
  models.Todos.findById(req.params.id).then(function(edit){
    edit.update({todos:req.body.todo}).then(function(){
      res.redirect("/todo");
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
