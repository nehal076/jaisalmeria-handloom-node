var express = require('express');
var router = express.Router();
var user = require('../controller/userController');
var category = require('../controller/categoryController');
var product = require('../controller/productController');
var userDetails = require('../controller/userDetailsController');
var cart = require('../controller/cartController');

router.get('/', (req,res)=> {
    res.send('<center><h1>Server is working! ✔️</h1></center>')
})

router.post('/registerUser', user.registerUser)
router.get('/loginUser', user.loginUser)

router.post('/addCategory', category.addCategory)
router.get('/getAllCategories', category.getAllCategories)

router.post('/addProduct', product.addProduct)
router.get('/getProducts', product.getProducts)
router.get('/getProductDetails', product.getProductDetails)
router.get('/getNewArrivals', product.getNewArrivals)
router.get('/getBestSelling', product.getBestSelling)
router.get('/getSimilarProducts', product.getSimilarProducts)


router.get('/getUserDetails', userDetails.getUserDetails)
router.post('/addNewAddress', userDetails.addNewAddress)

router.post('/addToCart',cart.addToCart)
router.get('/getCartItems',cart.getCartItems)

module.exports = router;
