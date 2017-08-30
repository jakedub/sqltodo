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

// router.post('/completed', function(req,res){
//   let completed = req.body.marked;
//   let id = req.body.id;
//   models.Todos.findbyId(id).then(function (){
//     return models.Todos.save(yetTodo = true);
//     res.redirect('/')
//   })
// })

//og code that works
// app.post("/completed", function(req,res){
//   console.log(req.body);
//   let completed =req.body.marked;
// function findItems(item){
//   return item.todo ===completed;}
//   list.find(findItems).yetTodo= false;
//   res.redirect("/");
// });
//
//doesn't work
// router.post('/completed', function (req,res){
//   let completed = req.body.marked;
//   let id = req.body.id;
//   models.Todos.findbyId(id).then(function someName(marked){
//     models.Todos.save(someName).yetTodo = false;
//   })
//   res.redirect('/');
//   });
//also didn't work
// router.post('/completed', function(req,res){
//   let completed = req.body.marked;
//   let id = req.body.todo;
//   models.Todos.findbyId(id)
//   .then(function(check){
//     if(completed){
//       yetTodo:true;
//     } else{
//       console.log("this is an error");
//     }
//     res.redirect("/");
//   })
// })

//marking for completed...doesn't work
router.post('/completed', function(req,res){
  req.checkBody('todo', 'You must include a todo.').notEmpty();
  let id = req.body.todo;
  let todoData = {yetTodo: false};
  let completed = req.body.marked;

  models.Todos.findById(todo).then(function (check){
    if (check === completed){
      req.getValidationResult().then(function (result){
        if (result.isEmpty()){
          check.update(todoData).then(function (newTodo){
            res.redirect('/');
          })
        } else {
          res.status(404).send("Not found.");
        }
      })
    }
  })
});

const getTodo = function (req, res, next) {
    models.Todos.findById(req.params.todo).then(function (check) {
        if (check) {
            req.todo = todo;
            next();
        } else {
            res.status(404).send('Not found.');
        }
    })
}

//editing...doesn't work
router.post("/todo", getTodo, function (req, res) {
    req.checkBody("todo").notEmpty();

    const todoData = {
        todo: req.body.todo,
        yetTodo: req.body.yetTodo
    };

    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            req.todo.update(todoData).then(function (newTodo) {
                res.redirect("/");
            });
        } else {
            const errors = result.mapped();
            res.render("todo", {
                todo: todoData,
                errors: errors,
                action: "/todo/" + req.todo.id,
                buttonText: "Update"
            });
        }
    });
});


// delete
router.post("/todos/:todosId/delete", getTodo, function (req, res) {
    req.Todos.destroy().then(function () {
        res.redirect("/");
    });
});

module.exports = router;
