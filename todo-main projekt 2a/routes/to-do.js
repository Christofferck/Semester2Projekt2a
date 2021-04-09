const express = require('express');
const router = express.Router();

const {ensureAuthenticated, authRole} = require('../config/auth')
const {ROLE} = require('../config/roles')
const {ToDo, ToDoArchive} = require("../models/to-do");



router.get('/', ensureAuthenticated, async function(req, res) {

  //query bliver user.id
  let query = {owner: req.user._id}

  //database collection todo søger vi så efter samme id.
  ToDo.find(query, function(err, obj) {

      var todoData = obj

       ToDoArchive.find(query, function(err, data) {
            res.render('to-do', {
                todoArchived: data,
                todos: todoData
            });
        });
   });

/*
  if (req.user.role == ROLE.ADMIN) {
    query = {}
  } else {
    query = {owner: req.user._id};
  }
*/

})


let toDoObj;

router.post('/', ensureAuthenticated, (req,res)=>{

  switch (req.body.formInstance) {
    case 'create':

    toDoObj = {
      title : req.body.title,
      text : req.body.text,
      startdate : req.body.startdate,
      deadline : req.body.deadline,
      priority : req.body.priority,
      owner : req.user._id
    }

    let toDo = new ToDo(toDoObj);

    toDo.save()
    .then((value)=>{
        console.log(value)
        req.flash('success_msg','Your to-do has been created');
        res.redirect('to-do');
    })
    .catch(value=> console.log(value));

    break;
    case 'archive':

      toDoObj = {
        title : req.body.title,
        text : req.body.text,
        startdate : req.body.startdate,
        deadline : req.body.deadline,
        priority : req.body.priority,
        owner : req.user._id
      }

      let toDoArcive = new ToDoArchive(toDoObj);

      ToDo.findOneAndDelete({_id: req.body.id}, async function(err,obj) { return obj })
      toDoArcive.save(function(error, savedDocument) {
          if (error) console.log(error)
          else {
            console.log(savedDocument + " has been saved");
          }
      })

    break;
    case "update":
    toDoObj = {
      title : req.body.title,
      text : req.body.text,
      startdate : req.body.startdate,
      deadline : req.body.deadline,
      priority : req.body.priority,
      owner : req.user._id
    }


    ToDo.findOneAndUpdate({_id: req.body.id}, toDoObj, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
  });
    break;
    default:
    console.log(req.body)
  }

})


module.exports  = router;
