var User = require('../model/userModel');

class Controller {
  registerUser(req,res) {
    if(!Object.keys(req.body).length){
      res.status(400).send({ message : "Content can not be empty!"});
      return;
    } 
    const user = new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password
    });

    user.save(user).then(data => {
      res.send({ 
        statusCode: 0, 
        message: "Success"
      });
    })
    .catch(err =>{
      res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
      });
    });
  }

  loginUser(req,res){
    if(!req.query.emailId && !req.query.password){
      res.status(400).send({ message : "Email Id or Password cannot be blank!"});
      return;
    } 
  
    User.find({ email: req.query.emailId, password: req.query.password }).then(data =>{
      if(!data.length){
        res.status(404).send({ message : "Not found user with id "+ req.query.emailId})
      } else {
        res.send({ 
          statusCode: 0, 
          message: "Success",
          data: data[0]
        })
      }
    })
    .catch(err =>{
      res.status(500).send({ message: "Error retrieving user with id " + req.query.emailId})
    })
  }

  
}

module.exports = new Controller();
