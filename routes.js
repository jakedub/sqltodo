const express = require('express');
const router = express.Router();
const models = require("./models");

//To Do List
// const list = [
//   {
//     todo: "Wash the dishes",
//     yetTodo: true
//   }, {
//     todo: "Cut grass",
//     yetTodo: false
//   }, {
//     todo: "Get dog food",
//     yetTodo:true
//   }, {
//     todo: "Pick up",
//     yetTodo:false
//   }
// ];
//
// const data = {
//   todos:list
// };

router.get('/', function (req, res) {
  res.render("todo", data);
});


router.post("/", function(req,res){
  list.push({todo: req.body.todo, yetTodo:true});
  res.redirect("/")
});

router.post("/todos", function (req, res) {
    req.checkBody("title", "You must include a title.").notEmpty();
    req.checkBody("yetTodo", "Your URL is invalid.").notEmpty();

    const linkData = {
        title: req.body.title,
        yetTodo: req.body.yetTodo,
    };

    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            models.Todo.create(linkData).then(function (link) {
                res.redirect("/");
            });
        } else {
            const todo = models.Todo.build(linkData);
            const errors = result.mapped();
            res.render("form", {
                errors: errors,
                link: link
            })
        }
    })
});


router.post("/completed", function(req,res){
  console.log(req.body);
  let completed =req.body.marked;
function findItems(item){
  return item.todo ===completed;}
  list.find(findItems).yetTodo= false;
  res.redirect("/");
});

module.exports = router;
