var express = require('express');
var router = express.Router();

//read data
router.get('/', function(req, res) {
    let headers = req.header
    res.send(headers);
});

//insert data
router.post('/', function(req, res) {
    try{
        let body = req.body //recive JSON body
        if(body.name === '') {
            throw { message: 'error' , status : 400}
        }
        res.status(200).send({
        data : body,
        message : "success"
    });
    }   catch(err){
        res.status(err.status || 500).send({
            message : err.message
        })
    }
});

//update data
router.put('/', function(req, res) {
    let query = req.query //recive qurery
    res.send(query);
});

//delete data
router.delete('/:name/:age', function(req, res) {
    let params = req.params //recive parameter
    res.send(params);
});

// router.get('/', function(req, res) {
//     res.send('hi');
// });

module.exports = router;