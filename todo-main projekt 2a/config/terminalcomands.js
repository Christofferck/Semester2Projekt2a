const {UserReq, User} = require("../models/user");


module.exports = {
  adminSetup : function(req,res,next) {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    console.log("Add an administrator")
    rl.question("Email:", function(email) {



      UserReq.findOne({email: email}, async function(err,obj) { return obj })
      .then(res =>{ //callback function
        console.log(res)
          user = new User(res)
          user.isNew = true;
          user.role = 'admin'
          console.log(user)

          user.save(function(error, savedDocument) {
              if (error) console.log(error)
              else {
                console.log(savedDocument + " has been saved");
                UserReq.findOneAndDelete({email: email}, function(err,obj) {})
              }

          })
      })
    });
  },
  done: function() {
    console.log('Server process ended');
    process.exit();
  }


}
