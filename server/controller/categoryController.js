var Category = require('../model/categoryModel');

class Controller {

  addCategory(req,res) {
    if(!Object.keys(req.body).length){
      res.status(400).send({ message : "Content can not be empty!"});
      return;
    } 
    const category = new Category({
      name : req.body.name,
      imageUrl : req.body.imageUrl,
      items : req.body.items
    })
  
    category.save(category).then(data => {
      res.send({ statusCode: 0, message: "Success"})
    })
    .catch(err =>{
      res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
      });
    });
  }

  getAllCategories(req,res) {
    Category.find({}).then(data =>{
      res.send({data: data})
    })
    .catch(err =>{
      res.status(500).send({message : err.message});
    });
  }
}

module.exports = new Controller();
