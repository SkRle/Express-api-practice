var express = require('express');
var router = express.Router();
var productModel = require('../model/product')

//router.(method)('/path', function(req,res,next){ })
router.post('/', async function(req,res,next) {
    try{
        let body = req.body
        let product = new productModel({
            product_name: body.product_name,
            price: body.price,
            amount: body.amount,
            product_img : body.product_img,
            detail: body.detail
        })

        let new_product = await product.save()
        return res.status(200).send({
            product: new_product,
            message: "create success"
        })
    } catch(err){
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});

router.get('/', async(req,res) => {
    try{
        let products = await productModel.find()

        return res.send({
            data : products,
            message : 'get id success'
        })
    }catch{
        res.status(err.message || 500).send({
            message : err.message
        })
    }
})

router.get('/:id', async (req ,res)=> {
    try{
        let id = req.params.id

        let product = await productModel.findById(id)
        return res.send({
            data : product,
            message : 'get success'
        })
    }catch(err){
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});

router.put('/:id', async (req,res)=>{
    try {
        let id = req.params.id
        let body = req.body

        await productModel.updateOne(
            {_id: id},
            {
                $set: {
                    product_name : body.product_name,
                    price : body.price,
                    amount : body.amount,
                    product_img : body.product_img,
                    detail: body.detail
                }
            }
        )

        let product = await productModel.findById(id)
        return res.send({
            data : product,
            message : 'Update success'
        })

    } catch (error) {
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        let id = req.params.id

        await productModel.deleteOne({id_ : id})

        let product = await productModel.find()
        return res.send({
            data : product,
            message : 'delete success'
        })

    } catch (err) {
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});


module.exports = router;