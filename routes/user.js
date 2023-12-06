const bcrypt = require('bcrypt')
var express = require('express');
var router = express.Router();
var userModel = require('../model/users')

//create User
router.post('/', async function(req,res,next) {
    try{
        let body = req.body
        let password = req.body.password
        let hashPass = await bcrypt.hash(password,10)

        let user = new userModel({
            use_id: body.use_id,
            username: body.username,
            password: hashPass,
            user_detail: body.user_detail
        })

        let new_user = await user.save()
        return res.status(200).send({
            product: new_user,
            message: "create user success"
        })
    } catch(err){
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});

//update User
router.put('/:id', async (req,res)=>{
    try {
        let id = req.params.id
        let body = req.body
        let password = req.body.password
        let hashPass = await bcrypt.hash(password,10)

        await userModel.updateOne(
            {_id: id},
            {
                $set: {
                    use_id: body.use_id,
                    username: body.username,
                    password: hashPass,
                    user_detail: body.user_detail
                }
            }
        )
        return res.send({
            message : 'Update success'
        })

    } catch (error) {
        res.status(error.message || 500).send({
            message : error.message
        })
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        let id = req.params.id
        await userModel.deleteOne({_id : id})
        return res.send({
            message : 'Delete success'
        })

    } catch (err) {
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});

router.get('/', async(req,res) => {
    try{
        let users = await userModel.find()

        return res.send({
            data : users,
            message : 'get all success'
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

        let users = await userModel.findById(id)
        return res.send({
            data : users,
            message : 'get user by id success'
        })
    }catch(err){
        res.status(err.message || 500).send({
            message : err.message
        })
    }
});

module.exports = router;