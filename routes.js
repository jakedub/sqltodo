const express = require('express');
const router = express.Router();
const models = require("./models");


router.get('/', function (req, res) {
  res.render("todo");
});


router.post("/todo", function (req, res) {
    req.checkBody("title", "You must include a title.").notEmpty();

    const todoData = {title: req.body.title, yetTodo: true};

    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            models.Todo.create(todoData).then(function (todo) {
                res.redirect("/");
            });
        } else {
            const todo = models.Todo.build(todoData);
            const errors = result.mapped();
            res.render("todo", {
                errors: errors,
                todo: todo
            })
        }
    })
});

const getData = function (req, res, next) {
    models.Todo.findById(req.params.todoId).then(function (link) {
        if (todos) {
            req.body.todo = todos;
            next();
        } else {
            res.status(200).send('Not found.');
        }
    })
}

// router.post("/completed", function(req,res){
//   console.log(req.body);
//   let completed =req.body.marked;
// function findItems(item){
//   return item.todo ===completed;}
//   list.find(findItems).yetTodo= false;
//   res.redirect("/");
// });

router.post('/completed', function (req,res){
  let completed = models.Todo.build({title: req.body.title, yetTodo: true});
  todo.save().then(function(newTodo){
    res.render('todo', newTodo);
  });
});


module.exports = router;
