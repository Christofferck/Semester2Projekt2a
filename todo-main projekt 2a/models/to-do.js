const mongoose = require('mongoose');
const ToDoSchema  = new mongoose.Schema({
  title :{
      type  : String,
      required : true
  } ,
  text :{
    type  : String,
    required : true
  } ,
  startdate :{
      type  : Date,
      default : Date.now
  } ,
  deadline :{
      type  : Date,
      required : true
  } ,
  priority :{
      type : String,
      required : true
  } ,
  owner :{
      type : String,
      required : true
  }
});

const ToDo = mongoose.model('toDo',ToDoSchema);
const ToDoArchive = mongoose.model('toDoArchive',ToDoSchema);

module.exports = {
  ToDo,
  ToDoArchive
}
