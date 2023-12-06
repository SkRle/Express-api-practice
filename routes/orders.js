var express = require('express');
var router = express.Router();
var orderModel = require('../model/orders')
var productModel = require('../model/product')

//create User
router.post('/', async function (req, res, next) {
    try {
        const { order_detail , user_id } = req.body
        // let buyer = body.user_id
        const summary_price = order_detail.reduce((value,product) => {
            let summary = (product.amount * product.price) + value
            return summary
        },0)

        const newOrder = new orderModel({
            buyer: user_id,
            products_buy: order_detail,
            summary_price: summary_price,
        })
        const saveProduct = await newOrder.save()

        if(saveProduct){
            order_detail.forEach( async (product, index ) => {
                const productFound = await productModel.findById(`${product._id}`);
                if (productFound) {
                    productFound.amount -= product.amount
                    await productFound.save()
                }
            })
        }
        
        // let new_user = await user.save()
        return res.status(200).send({
            order : {saveProduct},
            message: "create order success"
        })
    } catch (err) {
        res.status(err.message || 500).send({
            message: err.message
        })
    }
});

router.get('/', async (req, res) => {
    try {
        // let orders = await orderModel.find().populate('order_name', 'username');
        let orders = await orderModel.find()

        return res.send({
            data: orders,  // Corrected variable name from order to orders
            message: 'get success'
        });
    } catch (error) {
        return res.status(error.status || 500).send({
            message: error.message
        });
    }
});

module.exports = router;