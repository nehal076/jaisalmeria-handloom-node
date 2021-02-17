var express = require('express');
var router = express.Router();
var user = require('../controller/userController');
var category = require('../controller/categoryController');
var product = require('../controller/productController');

router.post('/registerUser', user.registerUser)
router.get('/loginUser', user.loginUser)

router.post('/addCategory', category.addCategory)
router.get('/getAllCategories', category.getAllCategories)

router.post('/addProduct', product.addProduct)
router.get('/getProducts', product.getProducts)
router.get('/getProductDetails', product.getProductDetails)
router.get('/getNewArrivals', product.getNewArrivals)
router.get('/getBestSelling', product.getBestSelling)


module.exports = router;
