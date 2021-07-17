var Cart = require('../model/cartModel');

class Controller {

    addToCart(req, res) {
        if (!(req.body.userId && req.body.productId && req.body.qty)) {
            res.status(400).send({ message: "No UserId or ProductId found" });
            return;
        }

        const cart = new Cart({
            userId: req.body.userId,
            productList: [{ productId: req.body.productId, qty: req.body.qty }]
        })

        Cart.findOne({ userId: req.body.userId }).then(data => {
            if (data) {
                Cart.findOne({ userId: req.body.userId, 'productList.productId': req.body.productId }).then(data => {
                    if (data) {
                        Cart.findOneAndUpdate({ userId: req.body.userId, 'productList.productId': req.body.productId }, { productList: { productId: req.body.productId, qty: req.body.qty } }).then(data => {
                            res.send({ statusCode: 0, message: "Success", data: req.body.productId + "'s quantity updated to " + req.body.qty })
                        })
                    } else {
                        Cart.findOneAndUpdate({ userId: req.body.userId }, { $push: { productList: { productId: req.body.productId, qty: req.body.qty } } }).then(data => {
                            res.send({ statusCode: 0, message: "Success", data: req.body.productId + " added to the database" })
                        })
                    }
                })

                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
            } else {
                cart.save(cart).then(data => {
                    res.send({ statusCode: 0, message: "Success", data: req.body.productId + " added to the database" })
                })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message
                        });
                    });
            }
        })
    }

    getCartItems(req, res) {
        if (!req.query.userId) {
            res.status(200).send({ message: "No UserId found", statusCode: 400 });
            return;
        }

        Cart.findOne({ userId: req.query.userId }, (err, data) => {
            if (err) { return next(err); }
            if (!data) {
                res.send({ productList: [] })
            }
        })
            .populate('productList.productId')
            .then((products) => {
                res.send({ productList: products.productList });
            }, (err) => next(err));
    }
}

module.exports = new Controller();