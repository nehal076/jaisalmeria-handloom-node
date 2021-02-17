var Product = require('../model/productModel');

class Controller {

  addProduct(req,res) {
    if(!Object.keys(req.body).length){
      res.status(400).send({ message : "Content can not be empty!"});
      return;
    } 
    const product = new Product({
        categoryId: req.body.categoryId,
        name : req.body.name,
        imageUrl : req.body.imageUrl,
        price: req.body.price,
        rating: req.body.rating,
        discount: req.body.discount,
        size: req.body.size,
        details: req.body.details,
        material:req.body.material,
        bestSelling: req.body.bestSelling
    })
  
    product.save(product).then(data => {
      res.send({ statusCode: 0, message: "Success", data: data.name+ " added to database" })
    })
    .catch(err =>{
      res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
      });
    });
  }

  getProducts(req,res) {
    if(!req.query.categoryId){
        res.status(400).send({ message : "Please provide categoryId"});
        return;
    } 
    Product.find({categoryId: req.query.categoryId}).then(data =>{
      let response = {data: []};
      for(let i in data) {
        response.data.push({
          rating: data[i].rating,
          _id: data[i]._id,
          categoryId: data[i].categoryId,
          name: data[i].name,
          imageUrl: data[i].imageUrl,
          price: data[i].price,
          discount: data[i].discount
        })
      }
      res.send(response)
    })
    .catch(err =>{
      res.status(500).send({message : err.message});
    });
  }

  getNewArrivals(req,res) {
    Product.find({}).sort({_id:-1}).limit(20).then(data =>{
      let response = {data: []};
      for(let i in data) {
        response.data.push({
          rating: data[i].rating,
          _id: data[i]._id,
          categoryId: data[i].categoryId,
          name: data[i].name,
          imageUrl: data[i].imageUrl,
          price: data[i].price,
          discount: data[i].discount
        })
      }
      res.send(response)
    })
    .catch(err =>{
      res.status(500).send({message : err.message});
    });
  }

  getProductDetails(req,res) {
    if(!req.query.productId){
        res.status(400).send({ message : "Please provide productId"});
        return;
    } 
    Product.find({_id: req.query.productId}).then(data =>{

      res.send(data[0])
    })
    .catch(err =>{
      res.status(500).send({message : err.message});
    });
  }

  getBestSelling(req,res) {
    Product.find({bestSelling: true}).limit(20).then(data =>{
      let response = {data: []};
      for(let i in data) {
        response.data.push({
          rating: data[i].rating,
          _id: data[i]._id,
          categoryId: data[i].categoryId,
          name: data[i].name,
          imageUrl: data[i].imageUrl,
          price: data[i].price,
          discount: data[i].discount
        })
      }
      res.send(response)
    })
    .catch(err =>{
      res.status(500).send({message : err.message});
    });
  }
}

module.exports = new Controller();
